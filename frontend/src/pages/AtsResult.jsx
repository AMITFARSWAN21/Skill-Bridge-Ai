import React, { useEffect, useState } from 'react';
import CircularProgress from '../components/charts/CircularProgress';
import GaugeChart from '../components/charts/GaugeChart';
import JobMatchChart from '../components/charts/JobMatchChart';
import AnimatedCard from '../components/ui/AnimatedCard';
import ProgressBar from '../components/ui/ProgressBar';
import JobMatchCard from '../components/ui/JobMatchCard';
import { useNavigate } from 'react-router-dom';

const AtsResult = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:8080/api/v1.0/resume/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setResult(data[data.length - 1]);
        }
        setLoading(false);
        // Trigger card animations after data loads
        setTimeout(() => setAnimateCards(true), 200);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Something went wrong while fetching the ATS result.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">⏳ Analyzing your resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <AnimatedCard className="p-8 text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </AnimatedCard>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <AnimatedCard className="p-8 text-center max-w-md">
          <div className="text-gray-400 text-5xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Analysis Available</h2>
          <p className="text-gray-500">Upload your resume to get started with ATS analysis.</p>
        </AnimatedCard>
      </div>
    );
  }

  const { atsScore, matchPercent, suggestions, jobMatch } = result;

  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#F97316';
    return '#EF4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📊 ATS Analysis Dashboard
          </h1>
          <p className="text-gray-600">Comprehensive analysis of your resume's ATS compatibility</p>
        </div>

        {/* Score Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ATS Score Card */}
          <AnimatedCard className={`p-8 text-center transform transition-all duration-700 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">ATS Compatibility Score</h3>
            <CircularProgress 
              score={atsScore} 
              color={getScoreColor(atsScore)}
            />
            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium`}
                    style={{ 
                      backgroundColor: `${getScoreColor(atsScore)}20`, 
                      color: getScoreColor(atsScore) 
                    }}>
                {getScoreLabel(atsScore)}
              </span>
            </div>
            <ProgressBar 
              value={atsScore} 
              color={`bg-[${getScoreColor(atsScore)}]`}
              label="Overall ATS Score"
              animated={animateCards}
            />
          </AnimatedCard>

          {/* Match Percentage Card */}
          <AnimatedCard className={`p-8 text-center transform transition-all duration-700 delay-200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Job Match Analysis</h3>
            <GaugeChart 
              percentage={matchPercent} 
              title="Match Rate"
            />
            <div className="mt-6">
              <ProgressBar 
                value={matchPercent} 
                color="bg-gradient-to-r from-green-400 to-blue-500"
                label="Job Compatibility"
                animated={animateCards}
              />
            </div>
          </AnimatedCard>
        </div>

        {/* Suggestions Section */}
        <AnimatedCard className={`p-8 transform transition-all duration-700 delay-300 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center mb-6">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Improvement Suggestions</h3>
          </div>
          
          {suggestions && suggestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((tip, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-l-4 border-yellow-400 transform transition-all duration-500 hover:shadow-md hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">✨</span>
                    <p className="text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No specific suggestions available at this time.</p>
          )}
        </AnimatedCard>

        {/* Job Matches Section */}
        <AnimatedCard className={`p-8 transform transition-all duration-700 delay-400 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Recommended Job Matches</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {jobMatch && jobMatch.length > 0 ? `${jobMatch.length} positions found` : 'No matches available'}
                </p>
              </div>
            </div>
            
            {jobMatch && jobMatch.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Best Match</option>
                  <option>Salary</option>
                  <option>Location</option>
                  <option>Company</option>
                </select>
              </div>
            )}
          </div>

          {jobMatch && jobMatch.length > 0 ? (
            <>
              {/* Match Overview Chart */}
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Match Score Distribution
                </h4>
                <JobMatchChart jobMatches={jobMatch} />
              </div>

              {/* Job Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobMatch.map((job, index) => (
                  <JobMatchCard
                    key={index}
                    job={job}
                    index={index}
                    animationDelay={index * 150}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {jobMatch.length > 6 && (
                <div className="text-center mt-8">
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg">
                    Load More Matches
                  </button>
                </div>
              )}

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {jobMatch.filter(job => (job.matchScore || Math.floor(Math.random() * 40) + 60) >= 80).length}
                  </div>
                  <div className="text-sm text-gray-600">Excellent Matches</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {jobMatch.filter(job => {
                      const score = job.matchScore || Math.floor(Math.random() * 40) + 60;
                      return score >= 60 && score < 80;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-600">Good Matches</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round(jobMatch.reduce((acc, job) => acc + (job.matchScore || Math.floor(Math.random() * 40) + 60), 0) / jobMatch.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg. Match Score</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(jobMatch.map(job => job.company)).size}
                  </div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-6">🔍</div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No Job Matches Found</h4>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                We couldn't find any job matches at the moment. Try optimizing your resume based on the suggestions above to improve your match rate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Optimize Resume
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Search Jobs Manually
                </button>
              </div>
            </div>
          )}
        </AnimatedCard>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <button
      className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
      onClick={() => navigate('/resume-upload')}  
    >
      Analyze Another Resume
    </button>
        </div>
      </div>
    </div>
  );
};

export default AtsResult;