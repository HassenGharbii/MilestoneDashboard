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

const MonthlyRoomPerformanceChart = ({ darkMode, bookingData }) => {
  // Function to group data by month and calculate averages
  const groupDataByMonth = (data) => {
    const result = {};

    data.forEach(item => {
      const date = new Date(item.booking_date);
      const month = date.toLocaleString('default', { month: 'short' });

      if (!result[month]) {
        result[month] = { RevPAR: 0, ADR: 0, OCC: 0, count: 0 };
      }

      result[month].RevPAR += item.RevPAR;
      result[month].ADR += item.ADR;
      result[month].OCC += item.OCC;
      result[month].count += 1;
    });

    // Calculate averages
    Object.keys(result).forEach(month => {
      result[month].RevPAR = result[month].RevPAR / result[month].count;
      result[month].ADR = result[month].ADR / result[month].count;
      result[month].OCC = result[month].OCC / result[month].count;
    });

    return result;
  };

  const groupedData = groupDataByMonth(bookingData);
  const labels = Object.keys(groupedData);
  const RevPARData = labels.map(month => groupedData[month].RevPAR);
  const ADRData = labels.map(month => groupedData[month].ADR);
  const OCCData = labels.map(month => groupedData[month].OCC);

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'RevPAR',
        data: RevPARData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        yAxisID: 'y',
        datalabels: {
          display: false,
        },
      },
      {
        type: 'bar',
        label: 'ADR',
        data: ADRData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        yAxisID: 'y',
        datalabels: {
          display: false,
        },
      },
      {
        type: 'line',
        label: 'OCC',
        data: OCCData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
        yAxisID: 'y1',
        datalabels: {
          display: false,
        },
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}${tooltipItem.dataset.label === 'OCC' ? '%' : ''}`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          callback: formatNumber,
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          display: true,
          text: 'RevPAR & ADR',
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          callback: function(value) {
            return value + '%'; // Add percentage symbol
          },
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'OCC',
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
      <div className="text-lg font-semibold mb-2">Monthly Room Performance Overview</div>
      <div className="relative w-full" style={{ height: '250px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyRoomPerformanceChart;
