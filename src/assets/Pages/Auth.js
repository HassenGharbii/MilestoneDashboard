// AuthPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [milestoneUrl, setMilestoneUrl] = useState('');
  const [milestoneUsername, setMilestoneUsername] = useState('');
  const [milestonePassword, setMilestonePassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Handle login
        const response = await axios.post('http://localhost:5000/api/user-login', {
          username,
          password,
        });
        
        // Store the token and username, then redirect
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', username); // Store username for displaying in navbar
          console.log("Username stored in localStorage:", username); // Debugging line
          setMessage(response.data.message);
          navigate('/Itinfrastructure'); // Redirect to dashboard on successful login
        } else {
          setMessage('Failed to login, please try again.');
        }
      } else {
        // Handle sign-up and configuration save
        const response = await axios.post('http://localhost:5000/api/set-config', {
          username,
          password,
          MILESTONE_SERVER_URL: milestoneUrl,
          MILESTONE_USERNAME: milestoneUsername,
          MILESTONE_PASSWORD: milestonePassword,
        });
        setMessage(response.data.message || 'Sign-up and configuration saved successfully');
        setIsLogin(true); // Switch to login after sign-up
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Action failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded focus:outline-none text-white"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded focus:outline-none text-white"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <h3 className="text-xl font-semibold text-gray-300 mt-4">Milestone Configuration</h3>
              <div>
                <label className="block text-gray-300">Server URL</label>
                <input
                  type="text"
                  value={milestoneUrl}
                  onChange={(e) => setMilestoneUrl(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded focus:outline-none text-white"
                  placeholder="Enter Milestone server URL"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Milestone Username</label>
                <input
                  type="text"
                  value={milestoneUsername}
                  onChange={(e) => setMilestoneUsername(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded focus:outline-none text-white"
                  placeholder="Enter Milestone username"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Milestone Password</label>
                <input
                  type="password"
                  value={milestonePassword}
                  onChange={(e) => setMilestonePassword(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded focus:outline-none text-white"
                  placeholder="Enter Milestone password"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
          {message && (
            <p className="text-center text-white mt-4">{message}</p>
          )}
        </form>
        <div className="text-center mt-4">
          <button
            className="text-blue-500 hover:text-blue-700 font-semibold"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(''); // Clear message when switching forms
              localStorage.removeItem('token'); // Clear token on switching mode
              localStorage.removeItem('username'); // Clear username on switching mode
            }}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
