import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, CheckCircle, RotateCcw, BookOpen, Award, Users, Target, Zap } from "lucide-react";

const MCQTest = () => {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("MCQ");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [testStarted, setTestStarted] = useState(false);

  // Timer effect - starts when questions are loaded
  useEffect(() => {
    let timer;
    if (questions.length > 0 && !submitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [questions.length, submitted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/v1.0/question/generate", {
        topic,
        type,
      });
      setQuestions(res.data.questions);
      setAnswers({});
      setSubmitted(false);
      setScore(0);
      setTestStarted(true);
      // Set timer to 2 minutes per question
      setTimeLeft(res.data.questions.length * 120);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (qIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] && answers[idx][0] === q.correctAnswer) {
        score++;
      }
    });
    setScore(score);
    setSubmitted(true);
  };

  const resetTest = () => {
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setTestStarted(false);
    setTimeLeft(null);
    setTopic("");
  };

  const getScoreColor = () => {
    const percentage = (score / questions.filter(q => q.type === "MCQ").length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.filter(q => q.type === "MCQ").length) * 100;
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent work! 🌟";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 60) return "Good effort! 👍";
    return "Keep practicing! 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-96 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-96 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-100 rounded-full p-4 mr-4 shadow-lg">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-5xl font-bold text-gray-800">QuizMaster AI</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Challenge yourself with AI-generated questions tailored to any topic. Test your knowledge and track your progress.
            </p>
          </div>

          {/* Stats Cards */}
          {!testStarted && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200 shadow-lg">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-800">Smart Questions</h3>
                <p className="text-gray-600 text-sm">AI-powered question generation</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200 shadow-lg">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-800">Instant Feedback</h3>
                <p className="text-gray-600 text-sm">Get detailed explanations</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200 shadow-lg">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-800">Real-time Scoring</h3>
                <p className="text-gray-600 text-sm">Track your performance</p>
              </div>
            </div>
          )}

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Timer Bar */}
            {testStarted && timeLeft !== null && !submitted && (
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-gray-800 font-semibold">Time Remaining</span>
                  </div>
                  <div className="text-2xl font-mono text-orange-600 font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.max(0, (timeLeft / (questions.length * 120)) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            )}

            <div className="p-8">
              {!testStarted ? (
                <>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Your Test</h2>

                  {/* Topic and Type Form */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Topic</label>
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                          placeholder="e.g., JavaScript, History, Biology..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Question Type</label>
                        <select 
                          value={type} 
                          onChange={(e) => setType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        >
                          <option value="MCQ">Multiple Choice Questions</option>
                        </select>
                      </div>
                    </div>
                    
                    <button 
                      onClick={fetchQuestions} 
                      disabled={!topic || loading}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                        loading || !topic 
                          ? 'bg-gray-400 cursor-not-allowed opacity-50' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                      } text-white`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Generating Questions...</span>
                        </div>
                      ) : (
                        'Generate Questions'
                      )}
                    </button>
                  </div>
                </>
              ) : submitted ? (
                /* Results Screen */
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Complete!</h2>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 max-w-md mx-auto border border-gray-200 shadow-lg">
                    <div className="text-center space-y-4">
                      <div className={`text-6xl font-bold ${getScoreColor()}`}>
                        {score}/{questions.filter(q => q.type === "MCQ").length}
                      </div>
                      <div className="text-xl text-gray-800 font-semibold">
                        {Math.round((score / questions.filter(q => q.type === "MCQ").length) * 100)}% Score
                      </div>
                      <div className="text-lg text-gray-600">
                        {getScoreMessage()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    {/* <button 
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-300"
                    >
                      Review Answers
                    </button> */}
                    <button 
                      onClick={resetTest}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>New Test</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Questions Display */
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Test: {topic}
                    </h2>
                    <div className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                      {questions.length} Questions
                    </div>
                  </div>

                  {questions.map((q, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 transition-all duration-300 hover:bg-white/15">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-gray-800 mb-4">
                            {q.questionText}
                          </p>

                          {q.type === "MCQ" ? (
                            <div className="space-y-3">
                              {q.options.map((option, oIdx) => (
                                <label key={oIdx} className="flex items-center space-x-3 cursor-pointer group">
                                  <input
                                    type="radio"
                                    name={`question-${idx}`}
                                    value={option}
                                    disabled={submitted}
                                    onChange={() => handleChange(idx, option)}
                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                  />
                                  <span className="text-gray-800 group-hover:text-blue-600 transition-colors duration-200 select-none">
                                    {option}
                                  </span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <textarea
                              disabled={submitted}
                              placeholder="Type your answer here..."
                              onChange={(e) => handleChange(idx, e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                              rows="4"
                            />
                          )}

                          {submitted && q.type === "MCQ" && (
                            <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                              <div className="flex items-center space-x-2 mb-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                <span className="text-green-400 font-medium">Correct Answer:</span>
                              </div>
                              <p className="text-gray-800">
                                {q.options.find((opt) => opt.startsWith(q.correctAnswer + ".")) || "N/A"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {!submitted && (
                    <div className="flex justify-center pt-6">
                      <button 
                        onClick={handleSubmit}
                        className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                      >
                        Submit Test
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQTest;