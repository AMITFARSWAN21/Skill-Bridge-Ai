import React from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';

const JobMatchIndicator = ({ matchCount = 0, averageScore = 0, topMatch = 0 }) => {
  return (
    <div className="hidden lg:flex items-center space-x-6 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-blue-100 rounded-full">
          <Target size={14} className="text-blue-600" />
        </div>
        <div className="text-xs">
          <span className="font-semibold text-gray-800">{matchCount}</span>
          <span className="text-gray-500 ml-1">Matches</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-green-100 rounded-full">
          <TrendingUp size={14} className="text-green-600" />
        </div>
        <div className="text-xs">
          <span className="font-semibold text-gray-800">{averageScore}%</span>
          <span className="text-gray-500 ml-1">Avg Score</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-yellow-100 rounded-full">
          <Award size={14} className="text-yellow-600" />
        </div>
        <div className="text-xs">
          <span className="font-semibold text-gray-800">{topMatch}%</span>
          <span className="text-gray-500 ml-1">Best Match</span>
        </div>
      </div>
    </div>
  );
};

export default JobMatchIndicator;