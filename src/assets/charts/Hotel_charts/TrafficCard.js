import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TrafficSpendCard = ({ darkMode }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex items-center mb-4">
        <i className={`fas fa-traffic-light mr-2 text-lg ${darkMode ? 'text-white' : 'text-black'}`}></i>
        <span className="text-lg font-bold">Traffic & Spend</span>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
            <i className="fas fa-walking text-white text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-600 dark:text-gray-300">Visitors Count</span>
            <span className="text-xl font-bold">{darkMode ? '332,213' : '332,213'}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
            <i className="fas fa-hotel text-white text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-600 dark:text-gray-300">Occupancy Rate</span>
            <span className="text-xl font-bold">{darkMode ? '30%' : '30%'}</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
            <i className="fas fa-dollar-sign text-white text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-600 dark:text-gray-300">Visitors Spend</span>
            <span className="text-xl font-bold">{darkMode ? '$12.4B' : '$12.4B'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSpendCard;
