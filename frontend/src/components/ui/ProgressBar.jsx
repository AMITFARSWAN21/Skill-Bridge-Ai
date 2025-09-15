import React, { useEffect, useState } from 'react';

const ProgressBar = ({ value, max = 100, color = 'bg-blue-500', label, animated = true }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (value / max) * 100;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, animated]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;