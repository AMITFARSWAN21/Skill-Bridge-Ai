import React, { useState } from 'react';
import RadarMatchChart from '../charts/RadarMatchChart';

const JobMatchCard = ({ job, index, animationDelay }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Mock match score if not provided
  const matchScore = job.matchScore || Math.floor(Math.random() * 40) + 60;
  
  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMatchLabel = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Low Match';
  };

  return (
    <div 
      className={`group bg-white rounded-2xl border border-gray-200 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-3 hover:border-blue-300 overflow-hidden`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {job.title}
          </h4>
          <div className="flex flex-col items-end space-y-1">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMatchColor(matchScore)}`}>
              {matchScore}%
            </span>
            <span className="text-xs text-gray-500">{getMatchLabel(matchScore)}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <span className="mr-2 text-blue-500">🏢</span>
            <span className="font-medium">{job.company}</span>
          </div>
          
          {job.location && (
            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-green-500">📍</span>
              <span>{job.location}</span>
            </div>
          )}

          {job.salary && (
            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-yellow-500">💰</span>
              <span>{job.salary}</span>
            </div>
          )}
        </div>

        {/* Match Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Match Score</span>
            <span>{matchScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                matchScore >= 80 ? 'bg-green-500' :
                matchScore >= 60 ? 'bg-blue-500' :
                matchScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Skills Tags */}
      {job.skills && (
        <div className="px-6 py-3 bg-gray-50">
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Expandable Details */}
      {showDetails && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <h5 className="font-semibold text-gray-800 mb-3">Match Breakdown</h5>
          <RadarMatchChart 
            skillsMatch={job.skillsMatch}
            experienceMatch={job.experienceMatch}
            educationMatch={job.educationMatch}
            keywordsMatch={job.keywordsMatch}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 pt-0">
        <div className="flex gap-2">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            {showDetails ? 'Hide Details' : 'View Analysis'}
          </button>
          <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobMatchCard;