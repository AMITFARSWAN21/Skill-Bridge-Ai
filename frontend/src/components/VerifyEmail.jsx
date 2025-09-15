import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppConstants } from '../utils/constants'

export const EmailVerify = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    setMessage('')
    setError('')
    try {
      const response = await fetch(`${AppConstants.BACKEND_URL}/api/v1.0/send-otp`, {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        setMessage('OTP sent successfully. Please check your email.')
      } else {
        const errorData = await response.text()
        setError(errorData || 'Failed to send OTP.')
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP')
      return
    }

    setLoading(true)
    setMessage('')
    setError('')
    try {
      const response = await fetch(`${AppConstants.BACKEND_URL}/api/v1.0/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ otp }),
      })

      if (response.ok) {
        setMessage('OTP verified successfully. Your account is now verified.')
        setVerified(true)
        // Automatically redirect to profile after 3 seconds
        setTimeout(() => navigate('/profile'), 3000)
      } else {
        const errorData = await response.text()
        setError(errorData || 'Failed to verify OTP.')
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <i className="bi bi-envelope-check text-primary display-4"></i>
                  <h4 className="mt-3 mb-1">Email Verification</h4>
                  <p className="text-muted">Enter the OTP sent to your email</p>
                </div>

                {message && (
                  <div className="alert alert-success d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {message}
                  </div>
                )}
                
                {error && (
                  <div className="alert alert-danger d-flex align-items-center">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={handleSendOtp}
                    disabled={loading || verified}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Send OTP
                      </>
                    )}
                  </button>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <i className="bi bi-shield-lock me-2"></i>
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the 6-digit OTP"
                    disabled={verified}
                  />
                </div>

                <div className="mb-4">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleVerifyOtp}
                    disabled={loading || verified}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Verify OTP
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <button 
                    className="btn btn-link text-decoration-none"
                    onClick={() => navigate('/profile')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}