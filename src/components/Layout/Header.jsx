import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About', hasDropdown: true },
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Sign Up' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const aboutSections = [
    { id: 'goal', label: 'Goal' },
    { id: 'problem', label: 'Problem Statement' },
    { id: 'objectives', label: 'Objectives' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'impact', label: 'Impact' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary-700/95 backdrop-blur-glass shadow-lg' 
          : 'bg-primary-600/85 backdrop-blur-glass shadow-md'
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4">
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="text-white font-bold text-xl sm:text-2xl tracking-wide"
        >
          OncoBiome
        </motion.h1>

        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            {navItems.map((item) => (
              <li key={item.path} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setAboutMenuOpen(true)}
                    onMouseLeave={() => setAboutMenuOpen(false)}
                  >
                    <button className="text-white font-medium hover:text-primary-200 transition-colors duration-300 flex items-center">
                      About
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {aboutMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white/15 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-3"
                        >
                          {aboutSections.map((section) => (
                            <Link
                              key={section.id}
                              to={`/about#${section.id}`}
                              className="block px-4 py-2 text-primary-800 bg-white/40 hover:bg-primary-400/60 hover:text-white rounded-lg transition-all duration-300 mb-2 last:mb-0 transform hover:scale-105"
                              onClick={() => setAboutMenuOpen(false)}
                            >
                              {section.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-medium transition-all duration-300 relative ${
                      location.pathname === item.path
                        ? 'text-primary-200'
                        : 'text-white hover:text-primary-200'
                    }`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-200 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;