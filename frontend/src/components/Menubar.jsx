import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, BarChart3, AlertCircle, User, LogOut, Menu, X } from "lucide-react";

export const Menubar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [role, setRole] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole); 
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1.0/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/login');
      } else {
        const data = await res.text();
        console.error('Logout failed:', data);
        alert('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Logout error');
    }
  };

  const NavButton = ({ onClick, icon: Icon, children, variant = 'ghost' }) => {
    const baseClasses = "flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5";
    const variants = {
      ghost: "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md",
      primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
        aria-label={children}
      >
        <Icon size={18} className="mr-2" />
        <span className="hidden sm:inline">{children}</span>
      </button>
    );
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            aria-label="Navigate to home"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
              <Briefcase size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Skill Bridge
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Connect • Learn • Grow
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn && role === 'USER' && (
              <>



                <NavButton
                  onClick={() => navigate('/resume-upload')}
                  icon={FileText}
                >
                  Resume
                </NavButton>


                <NavButton
                  onClick={() => navigate('/ats-result')}
                  icon={BarChart3}
                >
                  Results
                </NavButton>

                <NavButton
                  onClick={() => navigate('/roadmap')}
                  icon={FileText}
                >
                RoadMap
                </NavButton>

                <NavButton
                  onClick={() => navigate('/mcq-test')}
                  icon={FileText}
                >
                  Quiz-Test
                </NavButton>


              </>
            )}

            {isLoggedIn && role === 'ADMIN' && (
              <NavButton
                onClick={() => navigate('/get-all-complaints')}
                icon={AlertCircle}
              >
                Complaints
              </NavButton>
            )}
          </div>

          {/* User Account Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Account Dropdown */}
            {isLoggedIn ? (
              <div className="relative dropdown-container">
                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:border-blue-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:block text-gray-700 font-medium">My Account</span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Signed in as</p>
                      <p className="text-sm text-gray-500 capitalize">{role?.toLowerCase()} Account</p>
                    </div>
                    
                    <button
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => {
                        navigate('/profile');
                        setShowDropdown(false);
                      }}
                    >
                      <User size={16} className="mr-3" />
                      Profile Settings
                    </button>
                    
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavButton
                onClick={() => navigate('/login')}
                icon={User}
                variant="primary"
              >
                Sign In
              </NavButton>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {isLoggedIn && role === 'USER' && (
                <>
                  <button
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => {
                      navigate('/resume-upload');
                      setShowMobileMenu(false);
                    }}
                  >
                    <FileText size={18} className="mr-3" />
                    Resume Upload
                  </button>

                  <button
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => {
                      navigate('/ats-result');
                      setShowMobileMenu(false);
                    }}
                  >
                    <BarChart3 size={18} className="mr-3" />
                    ATS Results
                  </button>
                </>
              )}

              {isLoggedIn && role === 'ADMIN' && (
                <button
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => {
                    navigate('/get-all-complaints');
                    setShowMobileMenu(false);
                  }}
                >
                  <AlertCircle size={18} className="mr-3" />
                  Complaints
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};