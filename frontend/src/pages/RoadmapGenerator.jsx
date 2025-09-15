import React, { useState } from 'react';
import {
  User,
  Briefcase,
  ArrowRight,
  Sparkles,
  Target,
  Calendar,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

const RoadmapGenerator = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
  });

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);

    try {
      const response = await fetch('http://localhost:8080/api/v1.0/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setRoadmap(data);
    } catch (err) {
      console.error('Error fetching roadmap:', err);
      setRoadmap({ roadMapText: '❌ Failed to generate roadmap. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="pt-12 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Career Roadmap Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto px-4">
          Get a personalized learning path tailored to your career goals and experience level
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* ✅ Wrap the form inside a <form> tag */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Build Your Path</h2>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Role Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700 mb-3">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    Desired Role
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Backend Developer, Data Scientist, Product Manager"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Experience Select */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-medium text-gray-700 mb-3">
                    <User className="w-4 h-4 text-purple-500" />
                    Experience Level
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Select your experience level</option>
                      <option value="0">🌱 Fresher (Just starting)</option>
                      <option value="1">🔰 1 Year Experience</option>
                      <option value="2">📈 2 Years Experience</option>
                      <option value="3">🎯 3 Years Experience</option>
                      <option value="4+">🚀 4+ Years Experience</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !formData.role || !formData.experience}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Your Roadmap...
                    </>
                  ) : (
                    <>
                      Generate My Roadmap
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Roadmap Results */}
        {roadmap && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Your Personalized Roadmap</h2>
                <p className="text-gray-600">
                  Tailored for {formData.role} with{' '}
                  {formData.experience === '0' ? 'fresher' : formData.experience + ' year(s)'} experience
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="font-medium text-gray-700">Ready to implement</span>
              </div>
              <div className="prose prose-gray max-w-none">
                <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed bg-white p-4 rounded-lg shadow-sm border">
                  {roadmap.roadMapText}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapGenerator;
