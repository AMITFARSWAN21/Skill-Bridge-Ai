import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ percentage, title }) => {
  const getColor = (percent) => {
    if (percent >= 80) return '#10B981'; // Green
    if (percent >= 60) return '#F59E0B'; // Yellow
    if (percent >= 40) return '#F97316'; // Orange
    return '#EF4444'; // Red
  };

  const color = getColor(percentage);
  
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, '#F3F4F6'],
        borderWidth: 0,
        cutout: '70%',
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative w-40 h-24 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
          <div className="text-xs text-gray-500 mt-1">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;