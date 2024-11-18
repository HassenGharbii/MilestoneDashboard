import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MdCameraAlt,
  MdSettings,
  MdSecurity,
  MdStorage,
  MdComputer,
  MdAccessAlarm
} from 'react-icons/md';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const dashboards = [
    { name: 'Camera Monitoring', icon: MdCameraAlt, path: '/cameras' },
    { name: 'IT Infrastructure', icon: MdComputer, path: '/itinfrastructure' },
    { name: 'Incident & Alarm', icon: MdSecurity, path: '/incidentalarm' },
    { name: 'Access Control', icon: MdAccessAlarm, path: '/accesscontrol' },
    { name: 'System Health', icon: MdSettings, path: '/systemhealth' },
    { name: 'Video Storage', icon: MdStorage, path: '/videostorage' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-black p-5 rounded-lg shadow-xl flex justify-between items-center text-white">
      {/* Left: Dashboard Links */}
      <div className="flex space-x-10">
        {dashboards.map((dashboard) => (
          <Link
            key={dashboard.name}
            to={dashboard.path}
            className={`flex flex-col items-center p-3 transition-all duration-300 ease-in-out transform hover:scale-110 rounded-lg
              ${location.pathname === dashboard.path
                ? 'text-yellow-500 border-b-2 border-yellow-500'
                : 'text-gray-300 hover:text-white'}`}
          >
            <dashboard.icon className="text-3xl mb-2 transition-all duration-300 ease-in-out" />
            <span className="text-sm font-semibold tracking-wider">{dashboard.name}</span>
          </Link>
        ))}
      </div>

      {/* Right: User Info and Logout */}
      <div className="flex items-center space-x-6">
        <span className="text-sm font-medium">{userName}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-sm px-6 py-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
