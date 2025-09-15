import React, { useState } from 'react';
import { Upload, FileText, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';

export const ResumeUpload = () => {
  const [formData, setFormData] = useState({
    resume: null,
    jobRole: ''
  });
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle file selection
  const handleFileSelect = (file) => {
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: '' }));
    } else {
      setErrors(prev => ({ ...prev, resume: 'Please select a PDF or document file' }));
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Handle job role input
  const handleJobRoleChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, jobRole: value }));
    if (value.trim()) {
      setErrors(prev => ({ ...prev, jobRole: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.resume) {
      newErrors.resume = 'Please upload your resume';
    }
    
    if (!formData.jobRole.trim()) {
      newErrors.jobRole = 'Please enter your desired job role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitted(true);
  
    const form = new FormData();
    form.append("resume", formData.resume);
    form.append("jobRole", formData.jobRole);
  
    try {
      const response = await fetch("http://localhost:8080/api/v1.0/resume/analyze-resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth is needed
        },
        body: form,
      });
  
      if (!response.ok) throw new Error("Failed to analyze resume");
  
      const result = await response.json();
  
      console.log("AI Response:", result);
  
      // TODO: Pass this result to another component to show ATS Score, Suggestions etc.
      alert(`Success! ATS Score: ${result.atsScore}`);
    } catch (err) {
      alert("Something went wrong: " + err.message);
    } finally {
      setIsSubmitted(false);
    }
  };

  const isFormValid = formData.resume && formData.jobRole.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload Your <span className="text-green-600">Resume</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Get started by uploading your resume and telling us about your dream job
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Resume Upload Section */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                Upload Your Resume
              </label>
              
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer group ${
                  dragActive 
                    ? 'border-green-400 bg-green-50' 
                    : errors.resume 
                    ? 'border-red-300 bg-red-50' 
                    : formData.resume 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('resume-upload').click()}
              >
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
                
                <div className="text-center">
                  {formData.resume ? (
                    <div className="space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                        <FileText className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">{formData.resume.name}</p>
                        <p className="text-sm text-gray-500">
                          {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-green-600 font-medium">
                        <CheckCircle className="w-5 h-5" />
                        File uploaded successfully
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full group-hover:bg-green-100 transition-colors duration-200">
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drop your resume here, or <span className="text-green-600">browse</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Supports PDF, DOC, DOCX files up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {errors.resume && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.resume}
                </div>
              )}
            </div>

            {/* Job Role Input Section */}
            <div className="space-y-4">
              <label htmlFor="job-role" className="block text-lg font-semibold text-gray-900">
                Desired Job Role
              </label>
              
              <div className="relative">
                <input
                  id="job-role"
                  type="text"
                  value={formData.jobRole}
                  onChange={handleJobRoleChange}
                  placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                    errors.jobRole 
                      ? 'border-red-300 focus:border-red-400' 
                      : formData.jobRole.trim() 
                      ? 'border-green-300 focus:border-green-400' 
                      : 'border-gray-300 focus:border-green-400'
                  }`}
                />
                
                {formData.jobRole.trim() && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
              </div>
              
              {errors.jobRole && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.jobRole}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitted}
                className={`w-full py-4 px-8 text-lg font-bold rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-green-100 ${
                  isFormValid && !isSubmitted
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitted ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Upload className="w-6 h-6" />
                    Submit Application
                  </div>
                )}
              </button>
            </div>

            {/* Form Status */}
            {isFormValid && !isSubmitted && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Ready to submit your application
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Your information is secure and will only be used to match you with relevant job opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

