import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// Utility function to format numbers
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const BookingTrendsChart = ({ darkMode, bookingData }) => {
  // Function to group data by month and calculate averages
  const groupDataByMonth = (data) => {
    const result = {};

    data.forEach(item => {
      const date = new Date(item.booking_date);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!result[month]) {
        result[month] = { confirmed: 0, pending: 0, confirmedCount: 0, pendingCount: 0 };
      }

      if (item.Booking_Status === 'Booking Confirmed') {
        result[month].confirmed += item.total_room_revenue;
        result[month].confirmedCount += 1;
      } else if (item.Booking_Status === 'Booking Pending') {
        result[month].pending += item.total_room_revenue;
        result[month].pendingCount += 1;
      }
    });

    return result;
  };

  const groupedData = groupDataByMonth(bookingData);
  const labels = Object.keys(groupedData);
  const confirmedBookings = labels.map(month => groupedData[month].confirmed / (groupedData[month].confirmedCount || 1));
  const pendingBookings = labels.map(month => groupedData[month].pending / (groupedData[month].pendingCount || 1));

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Booking Confirmed',
        data: confirmedBookings,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 0,
        yAxisID: 'y',
        datalabels: {
          display: false,
        }
      },
      {
        type: 'line',
        label: 'Booking Pending',
        data: pendingBookings,
        borderColor: 'rgba(255, 165, 0, 1)',
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
        yAxisID: 'y1',
        datalabels: {
          display: false,
        }
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${formatNumber(tooltipItem.raw)}`;
          },
        },
      },
      datalabels: {
        display: false,
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          maxRotation: 0,
          callback: function(value, index, values) {
            return labels[index].split(' ')[0]; // Show only the month part of the label
          },
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        max: Math.max(...confirmedBookings) + 50,
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          callback: formatNumber,
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          display: true,
          text: 'Booking Confirmed',
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        max: Math.max(...pendingBookings) + 10,
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          callback: formatNumber,
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Booking Pending',
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
      <div className="text-lg font-semibold mb-2">Booking Trends Over Time</div>
      <div className="relative w-full" style={{ height: '250px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BookingTrendsChart;
