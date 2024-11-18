import React from 'react';
import { Line } from 'react-chartjs-2';

const RealTimeFeedbackChart = ({  }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Satisfaction Level',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#0033cc',
        borderColor: '#0033cc',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color:  '#000000',
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default RealTimeFeedbackChart;
