import React, { useState } from 'react';

const AnimatedCard = ({ children, className = '', hoverEffect = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out
        ${hoverEffect ? 'hover:shadow-xl hover:-translate-y-1' : ''}
        ${isHovered ? 'scale-[1.02]' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;