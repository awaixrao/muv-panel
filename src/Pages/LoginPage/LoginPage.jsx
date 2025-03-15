import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../../assets/login.png';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Centered Login Container */}
      <div className="flex w-full max-w-3xl rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginBg}
            alt="Login Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg md:rounded-l-none">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="MUV Logo" className="h-10" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 text-center">
              Log In to Admin Panel
            </h1>
            <p className="text-gray-500 text-sm text-center mt-1">
              Enter your phone number and password below
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-yellow-500">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your User Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-yellow-500">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Log In</span>
                </>
              ) : (
                "Log In"
              )}
            </button>
            
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="#" className="text-yellow-400 font-medium">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;