import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen gradient-bg font-urbanist">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 bg-white/30 backdrop-blur-xl shadow-lg z-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary-600 tracking-wide"
            >
              OncoBiome
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Login', 'Sign Up', 'Contact Us'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                  className="font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 relative"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Login Section */}
      <section className="flex items-center justify-center min-h-[calc(100vh-80px)] py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/35 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl w-full max-w-md"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-primary-700 text-center mb-4"
          >
            Welcome Back!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-700 text-center mb-8"
          >
            Login to continue your healthcare journey with OncoBiome
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="email"
              placeholder="Email or Username"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/80 rounded-xl border-none shadow-lg focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all duration-300"
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/80 rounded-xl border-none shadow-lg focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all duration-300"
            />

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <span>Remember Me</span>
              </label>
              <Link
                to="#"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
              >
                Forgot Password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Login
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-gray-700"
            >
              <p>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-300"
                >
                  Sign Up here
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Login;