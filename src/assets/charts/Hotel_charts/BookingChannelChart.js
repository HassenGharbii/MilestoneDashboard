import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BookingChannelsChart = ({ bookingData, darkMode = false }) => {
  const bookingChannels = ["Online", "Phone", "Direct", "Friend", "Referral", "Other"];

  // Process booking data to get the count of bookings per channel
  const channelCounts = bookingData.reduce((acc, booking) => {
    const channel = booking.booking_channel || "Other"; // Default to "Other" if no channel is specified
    if (!acc[channel]) {
      acc[channel] = 0;
    }
    acc[channel] += 1;
    return acc;
  }, {});

  // Ensure all booking channels are included, even if their count is 0
  bookingChannels.forEach(channel => {
    if (!channelCounts[channel]) {
      channelCounts[channel] = 0;
    }
  });

  const chartData = {
    labels: bookingChannels,
    datasets: [
      {
        label: 'Booking Count',
        data: bookingChannels.map(channel => channelCounts[channel]),
        backgroundColor: darkMode ? '#FFD700' : '#FF4500',
        borderColor: darkMode ? '#FFD700' : '#FF4500',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#ffffff' : '#000000',
        },
        title: {
          display: true,
          text: 'Booking Channel',
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
      y: {
        ticks: {
          color: darkMode ? '#ffffff' : '#000000',
        },
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
    },
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`} style={{ height: '340px', width: '100%' }}>
      <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        Booking Channels
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BookingChannelsChart;
