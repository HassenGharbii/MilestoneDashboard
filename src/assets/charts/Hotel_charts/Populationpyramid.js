import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const groupByAgeRange = (data, rangeSize = 15) => {
    const ageRanges = {};

    data.forEach(booking => {
        const age = booking.Age;
        const range = `${Math.floor(age / rangeSize) * rangeSize}-${Math.floor(age / rangeSize) * rangeSize + rangeSize - 1}`;
        if (!ageRanges[range]) {
            ageRanges[range] = { Male: 0, Female: 0 };
        }
        ageRanges[range][booking.Gender] += 1;
    });

    return ageRanges;
};

const PopulationPyramidChart = ({ data = [], darkMode = false, height = 250 }) => {
    const ageRanges = groupByAgeRange(data);

    const sortedRanges = Object.keys(ageRanges).sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]));

    const chartData = {
        labels: sortedRanges,
        datasets: [
            {
                label: 'Male',
                data: sortedRanges.map(range => ageRanges[range].Male),
                backgroundColor: darkMode ? '#1f77b4' : '#007bff',
                borderColor: darkMode ? '#1f77b4' : '#007bff',
                borderWidth: 1,
            },
            {
                label: 'Female',
                data: sortedRanges.map(range => ageRanges[range].Female),
                backgroundColor: darkMode ? '#ff7f0e' : '#ff6384',
                borderColor: darkMode ? '#ff7f0e' : '#ff6384',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'x',  // Horizontal bar chart
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
            },
            y: {
                ticks: {
                    color: darkMode ? '#ffffff' : '#000000',
                },
                title: {
                    display: true,
                    text: 'Age Range',
                    color: darkMode ? '#ffffff' : '#000000',
                },
            },
        },
    };

    return (
        <div className={`p-4 rounded-lg shadow-lg h-${height} ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} flex flex-col justify-between`}>
            <div className="flex items-center mb-2">
                <i className={`fas fa-chart-bar mr-2 text-lg ${darkMode ? 'text-white' : 'text-gray-700'}`}></i>
                <span className="text-sm font-semibold">Age Distribution by Gender</span>
            </div>
            <div className="flex-grow">
                <Bar data={chartData} options={options} height={height} />
            </div>
        </div>
    );
};

export default PopulationPyramidChart;
