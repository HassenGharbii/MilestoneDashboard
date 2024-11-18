import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ darkMode, data }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
        titleColor: darkMode ? '#FFFFFF' : '#000000',
        bodyColor: darkMode ? '#FFFFFF' : '#000000',
        borderColor: darkMode ? '#374151' : '#E5E7EB',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: darkMode ? '#374151' : '#E5E7EB',
        },
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
        },
      },
      y: {
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB',
        },
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
        },
        max: 100,
        min: 0,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
