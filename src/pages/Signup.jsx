import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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

    localStorage.setItem(
      "user",
      JSON.stringify({ isSignup: true, email: formData.email })
    );

    window.location.href = "/";
  };

  // ⭐ Google Sign-Up Callback
  const handleGoogleSignup = (response) => {
    console.log("Google Signup Response:", response);

    if (response?.credential) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          isSignup: true,
          token: response.credential
        })
      );

      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "833037809300-6n0j6e3cr7bskiqmku311qcvgt420lk1.apps.googleusercontent.com",
        callback: handleGoogleSignup
      });

     google.accounts.id.renderButton(
  document.getElementById("googleSignupBtn"),
  {
    theme: "filled_blue",
    size: "large",
    width: "100%",
    type: "standard",
    text: "continue_with"
  }
);


      google.accounts.id.prompt(); 
    }
  }, []);

  return (
    <div className="min-h-screen gradient-bg font-urbanist">
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 bg-white/30 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-2xl font-bold text-primary-600">OncoBiome</h1>
        </div>
      </motion.nav>

      <section className="flex items-center justify-center min-h-[calc(100vh-80px)] py-8 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white/40 backdrop-blur-2xl rounded-3xl p-10 shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-4">Create Your Account</h2>

          {/* NORMAL SIGNUP FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-white rounded-xl shadow-md" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-white rounded-xl shadow-md" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-3 bg-white rounded-xl shadow-md" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full p-3 bg-white rounded-xl shadow-md" />

            <div className="flex items-center space-x-3">
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
              <span>I agree to Terms & Conditions</span>
            </div>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-full shadow-lg">
              Sign Up
            </motion.button>
          </form>
          

          {/* GOOGLE BUTTON (outside form) */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">OR</p>
            <div id="googleSignupBtn"></div>
          </div>

          <p className="text-center mt-4 text-sm">
            Already have an account? <Link to="/login" className="text-primary-600">Login</Link>
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Signup;