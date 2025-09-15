import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppConstants } from '../utils/constants'
import college from '../assets/college.webp'


export const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${AppConstants.BACKEND_URL}/api/v1.0/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        const roleRes = await fetch(`${AppConstants.BACKEND_URL}/api/v1.0/role?email=${formData.email}`, {
          credentials: 'include'
        })
        const roleData = await roleRes.json()

        localStorage.setItem('role', roleData.role);

        if (roleData.role === 'USER' || roleData.role === 'ADMIN') {
            navigate('/home')
          } else {
            setError('Unknown role')
          }
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row shadow bg-white rounded overflow-hidden">
          {/* Left Side - Image */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img 
              src={college}
              alt="Login Illustration"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="card-body p-4" style={{ width: '100%', maxWidth: '400px' }}>
              <div className="text-center mb-4">
                <i className="bi bi-shield-lock-fill text-primary fs-1"></i>
                <h4 className="mt-2">Welcome To Skill-Bridge</h4>
                <p className="text-muted">Please enter your credentials</p>
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input 
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4 text-end">
                  <span 
                    className="text-primary" 
                    role="button"
                    onClick={() => navigate('/reset-password')}
                  >
                    Forgot Password?
                  </span>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <span 
                    className="text-primary" 
                    role="button"
                    onClick={() => navigate('/register')}
                  >
                    Create Account
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}