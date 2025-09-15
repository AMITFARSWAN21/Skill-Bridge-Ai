// components/MermaidChart.jsx
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

const MermaidChart = ({ chart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chart) {
      try {
        mermaid.render('theGraph', chart, (svgCode) => {
          chartRef.current.innerHTML = svgCode;
        });
      } catch (error) {
        console.error("Mermaid render error:", error);
      }
    }
  }, [chart]);

  return (
    <div
      ref={chartRef}
      className="overflow-x-auto rounded-md border border-gray-300 bg-white p-4 shadow-md"
    />
  );
};

export default MermaidChart;
