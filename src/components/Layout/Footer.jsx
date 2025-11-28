import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialIcons = [
    { name: 'logo-facebook', href: '#' },
    { name: 'logo-instagram', href: '#' },
    { name: 'logo-twitter', href: '#' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-primary-800 text-white text-center py-8"
    >
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          className="mb-4 text-sm sm:text-base"
        >
          © 2025 OncoBiome. All Rights Reserved.
        </motion.p>
        <div className="flex justify-center space-x-6">
          {socialIcons.map((icon, index) => (
            <motion.a
              key={icon.name}
              href={icon.href}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, color: '#74c2b8' }}
              className="text-xl transition-colors duration-300"
            >
              {/* In a real project, you'd use react-icons or similar */}
              <span className="sr-only">{icon.name}</span>
              {icon.name.includes('facebook') && 'f'}
              {icon.name.includes('instagram') && 'ig'}
              {icon.name.includes('twitter') && 't'}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;