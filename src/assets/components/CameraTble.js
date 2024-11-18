import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CameraTable = ({ token, searchQuery }) => {
  const [cameras, setCameras] = useState([]);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'displayName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch cameras when the component mounts
  useEffect(() => {
    const fetchCameras = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/cameras', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Log the response to verify the structure
        
        if (Array.isArray(response.data.array)) {
          setCameras(response.data.array);
        } else {
          setError('Unexpected response format.');
        }
      } catch (error) {
        console.error('Error fetching camera data:', error);
        setError('Failed to load camera data. Please try again later.');
      }
    };

    fetchCameras();
  }, [token]);

  // Handle sort functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const handlePageChange = (page) => setCurrentPage(page);

  // Filter and paginate cameras based on search and pagination
  const filteredCameras = cameras.filter(camera =>
    camera.displayName.toLowerCase().includes(searchQuery)
  );

  const totalCameras = filteredCameras.length;
  const totalPages = Math.ceil(totalCameras / itemsPerPage);
  const paginatedCameras = filteredCameras.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg mb-6">
        <table className="table-auto w-full text-sm text-left text-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Camera Name</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">IP Address</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Status</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Recording Enabled</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Framerate</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Description</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Edge Storage</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Prebuffer Enabled</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Prebuffer Seconds</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">Manual Recording Timeout</th>
              <th className="px-6 py-3 bg-gray-800 border-b border-gray-700 text-blue-400">GIS Point</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCameras.map((camera) => (
              <tr key={camera.id} className="hover:bg-gray-800 cursor-pointer">
                <td className="px-6 py-4 border-b border-gray-700">{camera.displayName}</td>
                <td className="px-6 py-4 border-b border-gray-700">{camera.ipAddress || 'N/A'}</td>
                <td className="px-6 py-4 border-b border-gray-700">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${camera.enabled ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {camera.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${camera.recordingEnabled ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {camera.recordingEnabled ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-gray-700">{camera.recordingFramerate} FPS</td>
                <td className="px-6 py-4 border-b border-gray-700">{camera.description || 'No Description'}</td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {camera.edgeStorageEnabled ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {camera.prebufferEnabled ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">{camera.prebufferSeconds} sec</td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {camera.manualRecordingTimeoutEnabled ? 'Yes' : 'No'} ({camera.manualRecordingTimeoutMinutes} min)
                </td>
                <td className="px-6 py-4 border-b border-gray-700">{camera.gisPoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-l-lg"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-300">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-r-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CameraTable;
