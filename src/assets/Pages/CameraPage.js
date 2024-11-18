import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CameraDetails from '../components/CameraDetails';
import { FaCogs, FaCheckCircle, FaTimesCircle, FaServer } from 'react-icons/fa';
import axios from 'axios'; // Import axios to fetch data
import CameraTable from '../components/CameraTble';

function CameraPage() {
  const [selectedCameraDetails, setSelectedCameraDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState('');

  // Fetch camera data
  const fetchCameras = async () => {
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:5000/api/cameras', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data.array)) {
        setCameras(response.data.array);
      } else {
        setError('Unexpected response format.');
      }
    } catch (error) {
      console.error('Error fetching camera data:', error);
      setError('Failed to load camera data.');
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchCameras();
  }, [token]);

  // Handle camera selection
  const handleCameraSelect = (camera) => {
    setSelectedCameraDetails(camera);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter cameras based on search query
  const filteredCameras = cameras.filter(camera => 
    camera.displayName.toLowerCase().includes(searchQuery) ||
    camera.ipAddress.toLowerCase().includes(searchQuery) ||
    camera.description.toLowerCase().includes(searchQuery)
  );

  // Debugging: log the filtered cameras to see if the filtering is working
  console.log('Filtered Cameras:', filteredCameras);

  const totalDevices = filteredCameras.length;
  const activeDevices = filteredCameras.filter(device => device.enabled).length;
  const inactiveDevices = totalDevices - activeDevices;
  const uniqueModels = [...new Set(filteredCameras.map(device => device.model))].length;

  // Debugging: log the stats to check if calculations are correct
  console.log('Stats:', { totalDevices, activeDevices, inactiveDevices, uniqueModels });

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="p-6 text-white">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Cameras Overview</h2>
          <input
            type="text"
            placeholder="Search cameras..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg w-1/4"
          />
        </header>

        {/* Stats Section - Displaying Camera Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaCogs className="text-blue-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Total Cameras</h3>
                <p className="text-xl font-bold">{totalDevices}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Active Cameras</h3>
                <p className="text-xl font-bold">{activeDevices}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaTimesCircle className="text-red-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Inactive Cameras</h3>
                <p className="text-xl font-bold">{inactiveDevices}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaServer className="text-yellow-400 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Unique Models</h3>
                <p className="text-xl font-bold">{uniqueModels}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pass token, searchQuery, and camera select handler to CameraTable */}
        <CameraTable 
          token={token} 
          onCameraSelect={handleCameraSelect} 
          searchQuery={searchQuery} // Pass search query as prop
          cameras={filteredCameras} // Pass filtered cameras
        />

        {/* Display camera details if available */}
        {selectedCameraDetails && (
          <div className="mt-6">
            <CameraDetails cameraDetails={selectedCameraDetails} />
          </div>
        )}

        {/* Embedding the iframe at the end */}
        <div className="mt-6 rounded-lg">
          <iframe
            src="http://127.0.0.1:8083/pages/multiview/full?controls#" // Replace with the URL you want to embed
            width="100%"
            height="600"
            className="border-0"
            title="Embedded content"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default CameraPage;
