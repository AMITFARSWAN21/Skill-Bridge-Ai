import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppConstants } from '../utils/constants'
import college from '../assets/college.webp'

export const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name should not be empty'
    if (!formData.email) {
      newErrors.email = 'Email should not be empty'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter valid email address'
    }
    if (!formData.password) {
      newErrors.password = 'Password should not be empty'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (!formData.role) newErrors.role = 'Please select a role'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${AppConstants.BACKEND_URL}/api/v1.0/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        navigate('/login')
      } else {
        setErrors({
          submit: data.message || 'Registration failed'
        })
      }
    } catch (error) {
      setErrors({
        submit: 'Registration failed. Please try again.'
      })
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
              alt="Register Illustration"
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Right Side - Form */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="card-body p-4" style={{ width: '100%', maxWidth: '400px' }}>
              <div className="text-center mb-4">
                <i className="bi bi-person-plus-fill text-primary fs-1"></i>
                <h4 className="mt-2">Create Account</h4>
                <p className="text-muted">Please fill in your details</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
  name="role"
  className={`form-control ${errors.role ? 'is-invalid' : ''}`}
  value={formData.role}
  onChange={handleChange}
>
  <option value="">Select role</option>
  <option value="USER">User</option>
</select>

                  {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>

                {errors.submit && (
                  <div className="alert alert-danger mb-3">{errors.submit}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <span
                    className="text-primary"
                    role="button"
                    onClick={() => navigate('/login')}
                  >
                    Login here
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