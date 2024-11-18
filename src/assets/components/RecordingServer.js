import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaServer,
  FaClock,
  FaGlobe,
  FaLink,
  FaNetworkWired,
  FaPowerOff,
  FaShieldAlt,
  FaDatabase,
  FaSatelliteDish,
  FaCloud,
} from 'react-icons/fa';

function RecordingServerInfo() {
  const [recordingServerData, setRecordingServerData] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token'); // Adjust as needed to get your token

  useEffect(() => {
    const fetchRecordingServer = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recordingServers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecordingServerData(response.data.array); // Set the array of recording servers
      } catch (error) {
        console.error('Error fetching recording server data:', error);
        setError('Failed to load recording server data. Please check your authentication.');
      }
    };

    fetchRecordingServer();
  }, [token]);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md w-full">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center">
        <FaSatelliteDish className="mr-2 text-4xl" /> Recording Server Information
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {recordingServerData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recordingServerData.map((server, index) => (
            <div
              key={index}
              className="bg-gray-800 p-5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <FaServer className="text-purple-400 text-3xl mr-3" />
                <h3 className="text-xl font-semibold truncate">{server.displayName}</h3>
              </div>
              <div className="text-sm space-y-3">
                <p className="flex items-center">
                  <FaDatabase className="text-yellow-400 mr-2" />
                  <span><strong>ID:</strong> {server.id}</span>
                </p>
                <p className="flex items-center">
                  <FaPowerOff className={`mr-2 ${server.enabled ? 'text-green-400' : 'text-red-500'}`} />
                  <span><strong>Enabled:</strong> {server.enabled ? 'Yes' : 'No'}</span>
                </p>
                <p className="flex items-center">
                  <FaClock className="text-teal-400 mr-2" />
                  <span><strong>Last Modified:</strong> {new Date(server.lastModified).toLocaleString()}</span>
                </p>
                <p className="flex items-center">
                  <FaGlobe className="text-blue-400 mr-2" />
                  <span><strong>Time Zone:</strong> {server.timeZoneName}</span>
                </p>
                <p className="flex items-center">
                  <FaLink className="text-green-400 mr-2" />
                  <span>
                    <strong>Web Server:</strong>{' '}
                    <a
                      href={server.webServerUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Link
                    </a>
                  </span>
                </p>
                <p className="flex items-center">
                  <FaNetworkWired className="text-pink-400 mr-2" />
                  <span><strong>Host:</strong> {server.hostName}</span>
                </p>
                <p className="flex items-center">
                  <FaCloud className="text-indigo-400 mr-2" />
                  <span><strong>Public Access:</strong> {server.publicAccessEnabled ? 'Yes' : 'No'}</span>
                </p>
                <p className="flex items-center">
                  <FaShieldAlt className="text-red-400 mr-2" />
                  <span><strong>Shutdown on Failure:</strong> {server.shutdownOnStorageFailure ? 'Yes' : 'No'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No recording server data available.</p>
      )}
    </div>
  );
}

export default RecordingServerInfo;
