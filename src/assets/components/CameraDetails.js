import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaVideo, FaLink, FaCog, FaUserAlt } from 'react-icons/fa';

const CameraDetails = ({ cameraDetails }) => {
  const [error, setError] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [loadingStream, setLoadingStream] = useState(true);

  useEffect(() => {
    if (!cameraDetails) return;

    const fetchStreamUrl = async () => {
      try {
        setLoadingStream(true);
        // Make an API call to get the stream URL for this camera (assuming a WebRTC or RTSP stream)
        const response = await axios.get(`http://localhost:5000/api/cameras/${cameraDetails.id}/stream`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStreamUrl(response.data.streamUrl); // Assuming the API returns the stream URL
        setLoadingStream(false);
      } catch (error) {
        console.error('Error fetching stream URL:', error);
        setError('Failed to load the camera stream. Please try again later.');
        setLoadingStream(false);
      }
    };

    fetchStreamUrl();
  }, [cameraDetails]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Camera Header */}
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-semibold text-white">{cameraDetails?.displayName}</h3>
        <span className={`ml-4 px-3 py-1 rounded-full text-xs ${cameraDetails?.enabled ? 'bg-green-500' : 'bg-red-500'}`}>
          {cameraDetails?.enabled ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Live Stream */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-white">Live Stream</h4>
        {loadingStream ? (
          <div className="flex items-center justify-center py-4">
            <span className="text-white">Loading stream...</span>
          </div>
        ) : streamUrl ? (
          <div className="relative w-full h-72">
            <video controls autoPlay muted className="w-full h-full bg-black">
              <source src={streamUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p className="text-gray-400">No stream URL available.</p>
        )}
      </div>

      {/* Camera Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center">
          <FaLink className="text-blue-500 text-3xl mr-4" />
          <div>
            <h5 className="text-lg font-semibold text-white">Stream URL</h5>
            <p className="text-gray-300">{streamUrl || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCog className="text-yellow-400 text-3xl mr-4" />
          <div>
            <h5 className="text-lg font-semibold text-white">Recording</h5>
            <p className="text-gray-300">{cameraDetails?.recordingEnabled ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaVideo className="text-green-500 text-3xl mr-4" />
          <div>
            <h5 className="text-lg font-semibold text-white">Framerate</h5>
            <p className="text-gray-300">{cameraDetails?.framerate || 'N/A'} FPS</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaUserAlt className="text-purple-500 text-3xl mr-4" />
          <div>
            <h5 className="text-lg font-semibold text-white">Username</h5>
            <p className="text-gray-300">{cameraDetails?.userName || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Camera Description */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-white">Description</h4>
        <p className="text-gray-300">{cameraDetails?.description || 'No Description available'}</p>
      </div>

      {/* Camera Settings */}
      <div>
        <h4 className="text-xl font-semibold text-white">Camera Settings</h4>
        {/* You can add additional settings here such as motion detection, resolution, etc. */}
      </div>
    </div>
  );
};

export default CameraDetails;
