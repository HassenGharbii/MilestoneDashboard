import React from 'react';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faStar, faChartBar } from '@fortawesome/free-solid-svg-icons';

const ReviewsRatings = ({ darkMode }) => {
  const data = {
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        label: 'Reviews',
        data: [60, 20],
        backgroundColor: ['#4caf50', '#f44336'],
        borderColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      x: {
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
    },
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg h-80 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FontAwesomeIcon icon={faChartBar} className="mr-2 text-blue-500" />
        Reviews and Ratings
      </h2>
      <Bar data={data} options={options} />
      <div className="mt-4 flex justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faThumbsUp} className="text-green-500 mr-2" />
          <span>Positive Reviews: 60</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faThumbsDown} className="text-red-500 mr-2" />
          <span>Negative Reviews: 20</span>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
        <span className="font-semibold">Overall Rating: 4.5</span>
      </div>
    </div>
  );
};

export default ReviewsRatings;
