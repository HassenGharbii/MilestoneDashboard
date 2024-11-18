import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BookingsByGuestTypeChart = ({ darkMode }) => {
  const data = {
    labels: ['New Guests', 'Repeated Guests'],
    datasets: [
      {
        label: 'Bookings',
        data: [300, 150],
        backgroundColor: darkMode ? ['#FF6384', '#36A2EB'] : ['#FF6384', '#36A2EB'],
        borderColor: darkMode ? ['#FF6384', '#36A2EB'] : ['#FF6384', '#36A2EB'],
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
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default BookingsByGuestTypeChart;
