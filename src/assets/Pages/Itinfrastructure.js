import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaServer, FaCogs, FaLink, FaUser, FaCalendarAlt, FaClock, FaDatabase, FaNetworkWired } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import HardwareDetails from '../components/HardwareDetails';

function Itinfrastructure() {
  const [hardwareData, setHardwareData] = useState([]);
  
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHardwareDetails, setSelectedHardwareDetails] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'lastModified', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hardware', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data.array)) {
          setHardwareData(response.data.array);
        } else {
          console.error("Unexpected response format:", response.data);
          setHardwareData([]);
        }
      } catch (error) {
        console.error('Error fetching hardware data:', error);
        setError('Failed to load hardware data. Please check your authentication.');
      }
    };

    fetchHardware();
  }, [token]);

  const handleHardwareClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hardware/${id}/hardwaredriversettings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Assuming the array has at least one item, set the first item as the selected details
      const data = response.data.array[0];
      console.log('Extracted Data:', data); // Check the extracted data in the console
      setSelectedHardwareDetails(data);
    } catch (error) {
      console.error('Error fetching hardware details:', error);
      setError('Failed to load hardware details.');
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (date.toString() === 'Invalid Date') return 'N/A';
    return date.toLocaleString();
  };

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const handlePageChange = (page) => setCurrentPage(page);

  const filteredData = hardwareData.filter(device =>
    device.displayName.toLowerCase().includes(searchQuery) ||
    device.model.toLowerCase().includes(searchQuery)
  );

  const totalDevices = filteredData.length;
  const activeDevices = filteredData.filter((device) => device.enabled).length;
  const inactiveDevices = totalDevices - activeDevices;
  const uniqueModels = [...new Set(filteredData.map((device) => device.model))].length;

  const totalPages = Math.ceil(totalDevices / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900">
      
      <Navbar />

    

      <div className="p-6 text-white">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Hardware Overview</h2>
          <input
            type="text"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg w-1/4"
          />
        </header>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
            
            <div className="flex items-center">
              <FaCogs className="text-blue-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Total Devices</h3>
                <p className="text-xl font-bold">{totalDevices}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Active Devices</h3>
                <p className="text-xl font-bold">{activeDevices}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaTimesCircle className="text-red-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Inactive Devices</h3>
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

    

        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th onClick={() => handleSort('displayName')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Device</th>
                <th onClick={() => handleSort('enabled')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Status</th>
                <th onClick={() => handleSort('model')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Model</th>
                <th onClick={() => handleSort('hardwareDriverPath')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Driver</th>
                <th onClick={() => handleSort('relations.parent.type')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Parent</th>
                <th onClick={() => handleSort('address')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Address</th>
                <th onClick={() => handleSort('userName')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Username</th>
                <th onClick={() => handleSort('passwordLastModified')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Last Password Modified</th>
                <th onClick={() => handleSort('lastModified')} className="cursor-pointer px-6 py-3 text-left text-gray-300">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((hardware) => (
                  <tr
                    key={hardware.id}
                    className="border-b border-gray-600 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleHardwareClick(hardware.id)}
                  >
                    <td className="px-6 py-4">{hardware.displayName}</td>
                    <td className="px-6 py-4">
                      {hardware.enabled ? (
                        <span className="text-green-500 flex items-center">
                          <FaCheckCircle className="mr-2" /> Active
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <FaTimesCircle className="mr-2" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{hardware.model}</td>
                    <td className="px-6 py-4">{hardware.hardwareDriverPath?.id}</td>
                    <td className="px-6 py-4">{hardware.relations?.parent?.type}</td>
                    <td className="px-6 py-4">{hardware.address}</td>
                    <td className="px-6 py-4">{hardware.userName}</td>
                    <td className="px-6 py-4">{formatDate(hardware.passwordLastModified)}</td>
                    <td className="px-6 py-4">{formatDate(hardware.lastModified)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-300">No devices found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Hardware Details Section */}
        <div className="p-6 text-white">
        {/* Existing code for the table and stats */}

        {/* Hardware Details Section */}
        <HardwareDetails hardwareDetails={selectedHardwareDetails} />
      </div>


        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-l-lg"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-gray-300">{currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-r-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Itinfrastructure;
