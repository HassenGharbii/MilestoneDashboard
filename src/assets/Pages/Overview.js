import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
  const [hardware, setHardware] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hardwareResponse = await axios.get('http://localhost:5000/api/hardware');
        console.log("Hardware Response:", hardwareResponse.data);
        
        // Access the array property within the response data
        setHardware(hardwareResponse.data.array);
  
        const cameraResponse = await axios.get('http://localhost:5000/api/cameras');
        console.log("Camera Response:", cameraResponse.data);
  
        // Access the array property within the response data for cameras if similar
        setCameras(cameraResponse.data.array);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Hardware List</h2>
      <ul>
        {hardware.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h2>Camera List</h2>
      <ul>
        {cameras.map((camera) => (
          <li key={camera.id}>
            <p>Name: {camera.name}</p>
            <p>Status: {camera.status}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overview;
