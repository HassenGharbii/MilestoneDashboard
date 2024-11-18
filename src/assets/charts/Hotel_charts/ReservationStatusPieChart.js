import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReservationStatusChart = ({ darkMode, bookingData }) => {
  // Function to group data by reservation status
  const groupDataByStatus = (data) => {
    const result = {
      'New': 0,
      'Confirmed': 0,
      'Due In': 0,
    };

    data.forEach(item => {
      if (result[item.Reservation_Status] !== undefined) {
        result[item.Reservation_Status] += 1;
      }
    });

    return result;
  };

  // Ensure bookingData is not undefined or null
  if (!bookingData || bookingData.length === 0) {
    console.error("No booking data available");
    return <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>No booking data available</div>;
  }

  const groupedData = groupDataByStatus(bookingData);
  const labels = Object.keys(groupedData);
  const statusData = labels.map(status => groupedData[status]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Reservation Status',
        data: statusData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 10, // Make the donut chart look better with hover effect
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`} style={{ height: '340px', width: '100%' }}>
      <div className="text-lg font-semibold mb-2" style={{ textAlign: 'left' }}> Reservation Status Overview</div>
      <div style={{ height: '240px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ReservationStatusChart;
