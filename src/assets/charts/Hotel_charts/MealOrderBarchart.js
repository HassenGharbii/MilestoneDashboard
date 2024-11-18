import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MealsOrderedBarChart = ({ darkMode }) => {
  const data = {
    labels: ['Bed & Breakfast', 'Breakfast & Dinner', 'No Meal', 'Whole Day Meal'],
    datasets: [
      {
        label: 'Meals Ordered',
        data: [181000, 30000, 22000, 2000],
        backgroundColor: darkMode ? 'rgba(255, 206, 86, 0.6)' : 'rgba(54, 162, 235, 0.6)',
        borderColor: darkMode ? 'rgba(255, 206, 86, 1)' : 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        },
      },
      title: {
        display: true,
        text: 'Meals Ordered by Guests',
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

  return <div className="h-full"><Bar data={data} options={options} /></div>;
};

export default MealsOrderedBarChart;
