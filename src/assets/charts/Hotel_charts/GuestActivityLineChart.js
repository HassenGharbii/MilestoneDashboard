import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const GuestActivityChart = ({ darkMode, bookingData }) => {
  // Function to group data by month
  const groupDataByMonth = (data) => {
    const result = {};

    data.forEach(item => {
      const checkInMonth = new Date(item.Check_in_date).toLocaleString('default', { month: 'short' });
      const checkOutMonth = new Date(item.Check_Out_Date).toLocaleString('default', { month: 'short' });

      if (!result[checkInMonth]) {
        result[checkInMonth] = { checkIns: 0, checkOuts: 0 };
      }
      if (!result[checkOutMonth]) {
        result[checkOutMonth] = { checkIns: 0, checkOuts: 0 };
      }

      result[checkInMonth].checkIns += 1;
      result[checkOutMonth].checkOuts += 1;
    });

    return result;
  };

  const groupedData = groupDataByMonth(bookingData);
  const labels = Object.keys(groupedData);
  const checkInsData = labels.map(month => groupedData[month].checkIns);
  const checkOutsData = labels.map(month => groupedData[month].checkOuts);

  const data = {
    labels,
    datasets: [
      {
        label: 'Check-Ins',
        data: checkInsData,
        fill: true,
        backgroundColor: darkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: darkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        datalabels: {
          display: false,
        },
      },
      {
        label: 'Check-Outs',
        data: checkOutsData,
        fill: true,
        backgroundColor: darkMode ? 'rgba(153, 102, 255, 0.2)' : 'rgba(153, 102, 255, 0.2)',
        borderColor: darkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 1)',
        tension: 0.4,
        datalabels: {
          display: false,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to adjust its height based on the container
    plugins: {
      legend: {
        labels: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`} style={{ height: '340px', width: '100%' }}>
      <div className="text-lg font-semibold mb-2">Guest Activity Overview</div>
      <Line data={data} options={options} height={260} />
    </div>
  );
};

export default GuestActivityChart;
