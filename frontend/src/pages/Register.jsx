import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSuccessMessage('')

    try {
      await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      setSuccessMessage('Registration successful! Redirecting to login...')
      setFormData({ name: '', email: '', password: '' })

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.'
      setErrors({ submit: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h1>

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 mb-6 rounded">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                errors.name ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-purple-600'
              }`}
            />
            {errors.name && <span className="text-red-600 text-sm mt-1 block">{errors.name}</span>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-purple-600'
              }`}
            />
            {errors.email && <span className="text-red-600 text-sm mt-1 block">{errors.email}</span>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                errors.password ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-purple-600'
              }`}
            />
            {errors.password && <span className="text-red-600 text-sm mt-1 block">{errors.password}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg transition ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
            }`}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
