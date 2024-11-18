const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/milestone_config', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Define Mongoose Schemas
const ConfigSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serverUrl: String,
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const Config = mongoose.model('Config', ConfigSchema);
const User = mongoose.model('User', UserSchema);

// Middleware to authenticate requests with JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ error: 'Unauthorized access' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Helper function to get access token for a specific user
async function getAccessToken(userId) {
  const userConfig = await Config.findOne({ userId });
  if (!userConfig) {
    console.error("No Milestone configuration found for user");
    return null;
  }

  const TOKEN_ENDPOINT = `${userConfig.serverUrl}/IDP/connect/token`;
  try {
    const response = await axios.post(TOKEN_ENDPOINT, {
      grant_type: 'password',
      username: userConfig.username,
      password: userConfig.password,
      client_id: 'GrantValidatorClient',
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
}

// Sign-Up and Configuration Route
app.post('/api/set-config', async (req, res) => {
  const { username, password, MILESTONE_SERVER_URL, MILESTONE_USERNAME, MILESTONE_PASSWORD } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    const user = new User({ username, password: hashedPassword });
    await user.save();

    const config = new Config({
      userId: user._id,
      serverUrl: MILESTONE_SERVER_URL,
      username: MILESTONE_USERNAME,
      password: MILESTONE_PASSWORD,
    });
    await config.save();

    res.json({ message: 'Sign-up and configuration saved successfully' });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: 'Error during sign-up' });
  }
});

// Login Route
app.post('/api/user-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'User authenticated successfully', token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Error during login' });
  }
});

// Route to get hardware list for the authenticated user
app.get('/api/hardware', authenticate, async (req, res) => {
  const userConfig = await Config.findOne({ userId: req.userId });
  if (!userConfig) return res.status(500).json({ error: 'Milestone configuration not found' });

  const token = await getAccessToken(req.userId);
  if (!token) return res.status(500).json({ error: 'Could not retrieve access token' });

  try {
    const response = await axios.get(`${userConfig.serverUrl}/api/rest/v1/hardware`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching hardware list:", error);
    res.status(500).json({ error: 'Error fetching hardware list' });
  }
});
app.get('/api/recordingServers', authenticate, async (req, res) => {
  const userConfig = await Config.findOne({ userId: req.userId });
  if (!userConfig) return res.status(500).json({ error: 'Milestone configuration not found' });

  const token = await getAccessToken(req.userId);
  if (!token) return res.status(500).json({ error: 'Could not retrieve access token' });

  try {
    // Fetch data from the Milestone API for recording servers
    const response = await axios.get(`${userConfig.serverUrl}/api/rest/v1/recordingServers`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data); // Send the data back to the client
  } catch (error) {
    console.error("Error fetching recording server list:", error);
    res.status(500).json({ error: 'Error fetching recording server list' });
  }
});
// Route to get hardware driver settings for a specific hardware ID
app.get('/api/hardware/:id/hardwaredriversettings', authenticate, async (req, res) => {
  const { id } = req.params;
  const userConfig = await Config.findOne({ userId: req.userId });
  if (!userConfig) return res.status(500).json({ error: 'Milestone configuration not found' });

  const token = await getAccessToken(req.userId);
  if (!token) return res.status(500).json({ error: 'Could not retrieve access token' });

  try {
    const response = await axios.get(`${userConfig.serverUrl}/api/rest/v1/hardware/${id}/hardwaredriversettings`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching hardware driver settings:", error);
    res.status(500).json({ error: 'Error fetching hardware driver settings' });
  }
});


// Route to get events for the authenticated user
app.get('/api/events', authenticate, async (req, res) => {
  // Retrieve user configuration from the database
  const userConfig = await Config.findOne({ userId: req.userId });
  if (!userConfig) {
    return res.status(500).json({ error: 'Milestone configuration not found' });
  }

  // Retrieve the access token for the Milestone API
  const token = await getAccessToken(req.userId);
  if (!token) {
    return res.status(500).json({ error: 'Could not retrieve access token' });
  }

  try {
    // Make the GET request to Milestone API to fetch events data
    const response = await axios.get(`${userConfig.serverUrl}/api/rest/v1/events`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Send the events data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching events data:", error);
    res.status(500).json({ error: 'Error fetching events data' });
  }
});

// Route to get event types for the authenticated user
app.get('/api/eventTypes', authenticate, async (req, res) => {
  // Retrieve user configuration from the database
  const userConfig = await Config.findOne({ userId: req.userId });
  if (!userConfig) {
    return res.status(500).json({ error: 'Milestone configuration not found' });
  }

  // Retrieve the access token for the Milestone API
  const token = await getAccessToken(req.userId);
  if (!token) {
    return res.status(500).json({ error: 'Could not retrieve access token' });
  }

  try {
    // Make the GET request to Milestone API to fetch event types data
    const response = await axios.get(`${userConfig.serverUrl}/api/rest/v1/eventTypes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Send the event types data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching event types data:", error);
    res.status(500).json({ error: 'Error fetching event types data' });
  }
});
app.get('/api/cameras', authenticate, async (req, res) => {
  // Retrieve user configuration from the database
  const userConfig = await Config.findOne({ userId: req.userId });
  if (!userConfig) {
    return res.status(500).json({ error: 'Milestone configuration not found' });
  }

  // Retrieve the access token for the Milestone API
  const token = await getAccessToken(req.userId);
  if (!token) {
    return res.status(500).json({ error: 'Could not retrieve access token' });
  }

  try {
    // Make the GET request to Milestone API to fetch camera data
    const response = await axios.get(`${userConfig.serverUrl}/api/rest/v1/cameras`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const cameras = response.data.array; // Assuming camera data is in 'array' field
    
    // Loop through each camera and retrieve the IP address from the related hardware
    const camerasWithIp = await Promise.all(cameras.map(async (camera) => {
      const cameraId = camera.id;

      // Fetch camera details to get its relations (parent hardware)
      const cameraUrl = `${userConfig.serverUrl}/api/rest/v1/cameras/${cameraId}`;
      const cameraDetailsResponse = await axios.get(cameraUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const cameraData = cameraDetailsResponse.data;

      // Check if the camera has a 'parent' relation (indicating hardware)
      if (cameraData.data.relations && cameraData.data.relations.parent) {
        const hardwareId = cameraData.data.relations.parent.id;

        // Fetch hardware details to get the IP address
        const hardwareUrl = `${userConfig.serverUrl}/api/rest/v1/hardware/${hardwareId}`;
        const hardwareResponse = await axios.get(hardwareUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const hardwareData = hardwareResponse.data;

        // Extract IP address from hardware data
        const ipAddress = hardwareData.data.address || 'N/A'; // If no address is found, set 'N/A'

        // Return camera data with added IP address
        return {
          ...camera,
          ipAddress,
        };
      } else {
        // No hardware parent relation found, return camera data without IP address
        return {
          ...camera,
          ipAddress: 'N/A', // Default value if no related hardware found
        };
      }
    }));

    // Send back the camera data with IP addresses included
    res.json({ array: camerasWithIp });
  } catch (error) {
    console.error("Error fetching camera data:", error);
    res.status(500).json({ error: 'Error fetching camera data' });
  }
});





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
