import React from 'react';
import { Upload, FileText, Check, Star, MapPin, Clock, Users } from 'lucide-react';

export const Feature = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 md:px-20 py-16 bg-white">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How It <span className="text-green-600">Works</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get matched with your dream job in just four simple steps
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* 1. Upload Resume */}
        <div className="group">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">1</span>
            Upload your Latest Resume
          </h3>
          
          <div className="relative bg-white border-2 border-green-200 rounded-2xl p-8 hover:border-green-400 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl shadow-sm">
            <div className="flex items-center justify-center h-48">
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                {/* Main Resume Document */}
                <div className="w-32 h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative hover:border-green-300 transition-colors duration-200">
                  <FileText className="w-12 h-12 text-gray-400 mb-2 group-hover:text-green-500 transition-colors duration-200" />
                  <div className="w-16 h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="w-12 h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="w-14 h-1 bg-gray-300 rounded"></div>
                </div>
                
                {/* PDF Overlay */}
                <div className="absolute -bottom-2 -right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-md">
                  <FileText className="w-3 h-3" />
                  PDF
                </div>
                
                {/* Upload Icon */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:bg-green-600 transition-colors duration-200">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Personalise Job Search */}
        <div className="group">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">2</span>
            Personalise your Job Search
          </h3>
          
          <div className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:border-green-400 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl shadow-sm">
            {/* Your Preferences */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 group-hover:bg-green-50/50 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 mb-3">Your Preferences</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all duration-200">
                  Software Engineer
                  <Check className="w-4 h-4 text-green-500" />
                </span>
                <span className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all duration-200">
                  Pune
                  <Check className="w-4 h-4 text-green-500" />
                </span>
                <span className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all duration-200">
                  40 LPA
                  <Check className="w-4 h-4 text-green-500" />
                </span>
              </div>
            </div>
            
            {/* Skills */}
            <div className="bg-gray-50 rounded-xl p-4 group-hover:bg-green-50/50 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium hover:bg-green-200 hover:shadow-sm transition-all duration-200">
                  <Star className="w-4 h-4 fill-current" />
                  JavaScript
                </span>
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium hover:bg-green-200 hover:shadow-sm transition-all duration-200">
                  <Star className="w-4 h-4 fill-current" />
                  AI/ML
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Get Hyper-Relevant Job Matches */}
        <div className="group">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">3</span>
            Get Hyper-Relevant Job Matches
          </h3>
          
          <div className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:border-green-400 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl shadow-sm">
            <div className="space-y-4">
              {/* Amazon Job Card */}
              <div className="relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img 
                      src="https://placehold.co/40x40/FF9900/FFFFFF?text=A" 
                      alt="Amazon logo" 
                      className="w-10 h-10 rounded-lg shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 hover:text-green-700 transition-colors duration-200">Senior Software Engineer</h4>
                      <p className="text-gray-600 text-sm">Amazon</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          100+ Applicants
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Pune
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-800 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-green-700 transition-colors duration-200">
                    <div className="text-center">
                      <div className="text-lg">97%</div>
                      <div className="text-xs">Match</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Job Card (Partially Visible) */}
              <div className="relative bg-white border border-gray-200 rounded-xl p-4 opacity-60 transform translate-y-2 hover:opacity-80 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img 
                      src="https://placehold.co/40x40/4285F4/FFFFFF?text=G" 
                      alt="Google logo" 
                      className="w-10 h-10 rounded-lg shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Software Engineer</h4>
                      <p className="text-gray-600 text-sm">Google</p>
                    </div>
                  </div>
                  <div className="bg-green-800 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-md">
                    <div className="text-center">
                      <div className="text-lg">95%</div>
                      <div className="text-xs">Match</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Razorpay Job Card (Partially Visible) */}
              <div className="relative bg-white border border-gray-200 rounded-xl p-4 opacity-40 transform translate-y-4 hover:opacity-60 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img 
                      src="https://placehold.co/40x40/0C2451/FFFFFF?text=R" 
                      alt="Razorpay logo" 
                      className="w-10 h-10 rounded-lg shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Frontend Developer</h4>
                      <p className="text-gray-600 text-sm">Razorpay</p>
                    </div>
                  </div>
                  <div className="bg-green-800 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-md">
                    <div className="text-center">
                      <div className="text-lg">92%</div>
                      <div className="text-xs">Match</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Apply Instantly */}
        <div className="group">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">4</span>
            Apply Instantly
          </h3>
          
          <div className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:border-green-400 transition-all duration-300 hover:shadow-lg group-hover:shadow-xl shadow-sm">
            {/* Google Job Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 hover:shadow-md hover:border-green-200 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img 
                    src="https://placehold.co/40x40/4285F4/FFFFFF?text=G" 
                    alt="Google logo" 
                    className="w-10 h-10 rounded-lg shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Senior Software Engineer</h4>
                    <p className="text-gray-600 text-sm">Google</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        100+ Applicants
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Pune
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        3 hours ago
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-800 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-md">
                  <div className="text-center">
                    <div className="text-lg">97%</div>
                    <div className="text-xs">Match</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Now Button */}
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-lg">
              Apply Now
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};