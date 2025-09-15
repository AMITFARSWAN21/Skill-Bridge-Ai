import React from 'react';
import { Check } from 'lucide-react';

export const WhyChooseUs = () => {
  const reasons = [
    "Skip the Grind – No More Manual Job Hunting",
    "Hyper Relevant Job Matches",
    "Personalized Matching Scores for each Job",
    "Real Jobs, Not Spam – No Fake, Expired, or Redundant Jobs"
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 md:px-20 py-16 bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
        Why Jobseekers choose us?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reasons.map((reason, index) => (
          <div 
            key={index} 
            className="bg-white border-2 border-green-100 rounded-2xl p-6 hover:border-green-400 transition-all duration-300 hover:shadow-lg group"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                  <Check className="w-4 h-4 text-green-600 group-hover:text-white" />
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-800">{reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};