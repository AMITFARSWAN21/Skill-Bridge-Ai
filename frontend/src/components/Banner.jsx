import React from 'react';
import banner1 from '../assets/banner1.jpg';

export const Banner = () => {
  
  const handleFindJobsClick = () => {
    // Add your logic here
    
    window.location.href = '/resume-upload';
  };

  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
      </div>

      {/* Left Text Section */}
      <div className="w-full md:w-1/2 mb-12 md:mb-0 space-y-12 relative z-10 animate-slideInLeft">
        {/* Background Overlay for Text Depth */}
        <div className="absolute -inset-6 bg-gradient-to-r from-white/80 via-white/60 to-transparent rounded-2xl backdrop-blur-sm -z-10"></div>
        
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight animate-fadeInUp">
            <span className="text-10xl inline-block animate-slideInUp" style={{ animationDelay: '0.1s' }}>
              Find Your
            </span>
            <br/>
            <span className="text-green-600 relative inline-block animate-slideInUp" style={{ animationDelay: '0.3s' }}>
              Dream Job
             
            </span>
            <br/>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent animate-slideInUp" style={{ animationDelay: '0.5s' }}>
              Today
            </span>
          </h1>
          
          <div className="flex items-center gap-6 animate-slideInUp" style={{ animationDelay: '0.7s' }}>
            <div className="h-3 w-36 bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-full shadow-lg animate-expandWidth"></div>
            <p className="text-xl font-bold text-green-600 uppercase tracking-wider drop-shadow-sm">
              Relevant Jobs Made Fast
            </p>
          </div>
        </div>
        
        <p className="text-xl font-medium text-gray-700 leading-relaxed max-w-2xl animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
          Discover <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">5000+</span> job opportunities with top companies. 
          Our AI-powered platform matches you with positions that align perfectly with your skills and experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
          <button className="group relative w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-green-200/50 transform hover:scale-105 hover:-translate-y-2 active:scale-95">
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative z-10 flex items-center gap-2" onClick={handleFindJobsClick}>
              Find Jobs
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white shadow-md"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full border-2 border-white shadow-md"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Join <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-md">10,000+</span> professionals
            </p>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-slideInRight">
        <div className="relative group">
          {/* Enhanced Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-green-600 via-green-400 to-green-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
          
          {/* Secondary Glow Layer */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-400 rounded-xl blur-md opacity-30 group-hover:opacity-80 transition-all duration-500"></div>
          
          {/* Image Container */}
          <div className="relative bg-white p-2 rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
            <img
              src={banner1}
              alt="Professional Success Illustration"
              className="relative w-full max-w-lg rounded-lg transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 filter group-hover:brightness-110 group-hover:contrast-110"
            />
            
            {/* Image Overlay Effect */}
            <div className="absolute inset-2 bg-gradient-to-t from-green-600/10 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full animate-bounce opacity-80 group-hover:scale-125 transition-transform duration-300"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full animate-bounce opacity-60 group-hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-expandWidth {
          animation: expandWidth 1s ease-out forwards 0.8s;
          width: 0;
        }
      `}</style>
    </div>
  );
};