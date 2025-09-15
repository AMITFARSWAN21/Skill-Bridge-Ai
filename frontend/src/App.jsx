import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Menubar } from './components/Menubar';
import { Profile } from './pages/Profile';
import { EmailVerify } from './components/VerifyEmail';
import { ResumeUpload } from './pages/ResumeUpload';
import AtsResult from './pages/AtsResult';
import Footer from './pages/Footer';
import RoadmapGenerator from './pages/RoadmapGenerator';
import MCQTest from './pages/ MCQTest';

const App = () => {
  const location = useLocation();
  
 
  const authRoutes = ['/login', '/register'];
  const shouldShowMenubar = !authRoutes.includes(location.pathname);

  return (
    <>
     
      {shouldShowMenubar && (
        <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
          <Menubar />
        </div>
      )}
      
      
      <div className={shouldShowMenubar ? 'pt-16' : ''}>
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/email-verify" element={<EmailVerify />} />
  <Route path="/resume-upload" element={<ResumeUpload />} />
  <Route path="/ats-result" element={<AtsResult />} />
  <Route path="/roadmap" element={<RoadmapGenerator />} />
  <Route path="/mcq-test" element={<MCQTest />} />

  {/* Home route */}
  <Route path="/home" element={<Home />} />

  {/* Default redirect to login */}
  <Route path="/" element={<Navigate to="/login" replace />} />
</Routes>

      </div>
      <Footer/>
      
     
      
    </>
  );
};

export default App;