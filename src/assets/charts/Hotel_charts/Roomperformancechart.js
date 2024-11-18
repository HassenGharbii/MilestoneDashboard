import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RoomPerformanceMetricsChart = ({ darkMode }) => {
  const data = {
    labels: ['RevPAR', 'ADR', 'OCC'],
    datasets: [
      {
        label: 'Metrics',
        data: [150, 120, 80],
        backgroundColor: darkMode ? 'rgba(153, 102, 255, 0.6)' : 'rgba(75, 192, 192, 0.6)',
        borderColor: darkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        },
      },
      title: {
        display: true,
        text: 'Room Performance Metrics',
        color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RoomPerformanceMetricsChart;
