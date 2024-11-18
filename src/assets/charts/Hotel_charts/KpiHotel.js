import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faSignOutAlt, 
  faBed, 
  faHotel, 
  faCalendarCheck, 
  faUsers, 
  faBan, 
  faDollarSign 
} from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const KPI = ({ title, value, darkMode, icon }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [20, 30, 40, 30, 50],
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={`relative p-4 rounded-lg flex flex-col justify-between shadow-md overflow-hidden ${darkMode ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-gray-200' : 'bg-white text-gray-900'} transition-transform duration-300 ease-in-out transform hover:scale-105`}>
      <div className="absolute inset-0 opacity-30">
        <Line data={data} options={options} />
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="text-xs mb-1">{title}</div>
          <div className="text-xl font-semibold mb-1">{value}</div>
          <div className={`text-xxs px-1 py-0.5 ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-900'} rounded-md inline-block`}>New Income</div>
        </div>
        <div className="relative z-10">
          <FontAwesomeIcon icon={icon} className={`text-2xl ${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
        </div>
      </div>
    </div>
  );
};

export default KPI;
