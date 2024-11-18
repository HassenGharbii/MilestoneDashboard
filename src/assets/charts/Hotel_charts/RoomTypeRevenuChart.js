import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'; // Import the icon you want to use

Chart.register(ChartDataLabels);

const RoomTypeRevenueChart = ({ data, darkMode }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!data || data.length === 0) return;

    const roomTypes = ["Standard Room", "Deluxe Room", "Suite", "Junior Suite", "Presidential Suite"];
    const revenueByRoomType = roomTypes.map(type => {
      return data
        .filter(booking => booking.room_type === type)
        .reduce((acc, booking) => acc + booking.total_room_revenue, 0);
    });

    setChartData({
      labels: roomTypes,
      datasets: [
        {
          label: 'Revenue',
          data: revenueByRoomType,
          backgroundColor: darkMode 
            ? ['#2563EB', '#1D4ED8', '#1E40AF', '#3B82F6', '#60A5FA']
            : ['#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8'],
          borderColor: darkMode 
            ? '#1F2937'
            : '#E5E7EB',
          borderWidth: 3,
          hoverOffset: 15,
        },
      ],
    });
  }, [data, darkMode]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toFixed(2);
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg  h-80 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
      <h3 className="text-lg font-semibold mb-4 text-left">
        <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> {/* Add icon here */}
        Revenue by Room Type
      </h3>
      <div style={{ height: '250px' }}>
        <Doughnut 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: darkMode ? '#E5E7EB' : '#1F2937',
                  font: {
                    size: 9,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    const value = tooltipItem.raw;
                    return `${tooltipItem.label}: $${formatNumber(value)}`;
                  },
                },
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                titleColor: darkMode ? '#E5E7EB' : '#1F2937',
                bodyColor: darkMode ? '#E5E7EB' : '#1F2937',
                borderColor: darkMode ? '#374151' : '#E5E7EB',
                borderWidth: 1,
              },
              datalabels: {
                color: darkMode ? '#E5E7EB' : '#1F2937',
                font: {
                  size: 10,
                  weight: 'bold',
                },
                formatter: (value) => `$${formatNumber(value)}`,
                anchor: 'end',
                align: 'start',
              },
            },
          }} 
        />
      </div>
    </div>
  );
};

export default RoomTypeRevenueChart;
