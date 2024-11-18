// src/components/HardwareDetails.js
import React from 'react';
import { FaCogs, FaLink, FaDatabase, FaNetworkWired } from 'react-icons/fa';

function HardwareDetails({ hardwareDetails }) {
  if (!hardwareDetails) {
    return <p className="text-gray-300 mt-6">Click on a device to view details.</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl mt-6">
      <h3 className="text-lg font-semibold text-white mb-6">Hardware Driver Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Firmware Version */}
        <div className="flex items-center bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <FaCogs className="text-yellow-400 text-3xl mr-6 transform transition-all duration-300 hover:rotate-12" />
          <div>
            <h4 className="text-sm font-medium text-gray-300">Firmware Version</h4>
            <p className="text-xl font-semibold text-white">{hardwareDetails.hardwareDriverSettings?.firmwareVersion || 'N/A'}</p>
          </div>
        </div>

        {/* HTTPS Enabled */}
        <div className="flex items-center bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <FaLink className="text-blue-300 text-3xl mr-6 transform transition-all duration-300 hover:rotate-12" />
          <div>
            <h4 className="text-sm font-medium text-gray-300">HTTPS Enabled</h4>
            <p className="text-xl font-semibold text-white">{hardwareDetails.hardwareDriverSettings?.httpSEnabled || 'N/A'}</p>
          </div>
        </div>

        {/* HTTPS Port */}
        <div className="flex items-center bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <FaLink className="text-teal-400 text-3xl mr-6 transform transition-all duration-300 hover:rotate-12" />
          <div>
            <h4 className="text-sm font-medium text-gray-300">HTTPS Port</h4>
            <p className="text-xl font-semibold text-white">{hardwareDetails.hardwareDriverSettings?.httpSPort || 'N/A'}</p>
          </div>
        </div>

        {/* MAC Address */}
        <div className="flex items-center bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <FaDatabase className="text-orange-400 text-3xl mr-6 transform transition-all duration-300 hover:rotate-12" />
          <div>
            <h4 className="text-sm font-medium text-gray-300">MAC Address</h4>
            <p className="text-xl font-semibold text-white">{hardwareDetails.hardwareDriverSettings?.macAddress || 'N/A'}</p>
          </div>
        </div>

        {/* Product ID */}
        <div className="flex items-center bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <FaCogs className="text-purple-400 text-3xl mr-6 transform transition-all duration-300 hover:rotate-12" />
          <div>
            <h4 className="text-sm font-medium text-gray-300">Product ID</h4>
            <p className="text-xl font-semibold text-white">{hardwareDetails.hardwareDriverSettings?.productID || 'N/A'}</p>
          </div>
        </div>

        {/* Serial Number */}
        <div className="flex items-center bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <FaNetworkWired className="text-yellow-300 text-3xl mr-6 transform transition-all duration-300 hover:rotate-12" />
          <div>
            <h4 className="text-sm font-medium text-gray-300">Serial Number</h4>
            <p className="text-xl font-semibold text-white">{hardwareDetails.hardwareDriverSettings?.serialNumber || 'N/A'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HardwareDetails;
