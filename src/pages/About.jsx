import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const sections = [
    {
      id: 'goal',
      title: 'Project Goal',
      content: 'To develop an explainable machine learning model that classifies patient suitability for cancer immunotherapy based on gut microbiome data, providing interpretable insights into microbiota–immune interactions.'
    },
    {
      id: 'problem',
      title: 'Problem Statement',
      content: 'Cancer immunotherapy is not effective for every patient. The gut microbiome plays a crucial role in modulating immune responses, but the relationship between specific microbes and immunotherapy success remains unclear.'
    },
    {
      id: 'objectives',
      title: 'Objectives',
      content: '• Analyze gut microbiome and immune response data.\n• Identify microbial species influencing therapy outcomes.\n• Train explainable ML models to predict immunotherapy suitability.\n• Provide transparent and interpretable results.\n• Create a user-friendly interface for clinical interpretation.'
    },
    {
      id: 'methodology',
      title: 'Methodology',
      content: '1. Data Collection – Gut microbiome and clinical datasets.\n2. Preprocessing – Cleaning, normalization, and feature extraction.\n3. Model Development – Random Forest, XGBoost, and SHAP analysis.\n4. Evaluation – Accuracy, precision, recall, and ROC-AUC metrics.\n5. Explainability – Visualization of microbial and immune factors affecting predictions.'
    },
    {
      id: 'impact',
      title: 'Impact',
      content: 'This project contributes to precision medicine by helping clinicians understand how gut microbiota affects immunotherapy response. It supports personalized treatment decisions and reduces the risk of ineffective therapies.'
    }
  ];

  const teamMembers = [
    { name: 'Khushi Dubey', id: '225/UCF/063', image: '/images/khushi.jpg' },
    { name: 'Pragya Tiwari', id: '225/UCF/084', image: '/images/pragya.jpg' },
    { name: 'Shambhavi Soumya', id: '225/UCF/099', image: '/images/shambhavi.jpg' },
    { name: 'Srashti Rajput', id: '225/UCF/106', image: '/images/srashti.jpg' }
  ];

  const values = [
    { icon: '🔬', title: 'Innovation', description: 'Pushing boundaries in medical AI research' },
    { icon: '🎯', title: 'Precision', description: 'Accurate and reliable predictions' },
    { icon: '🤝', title: 'Collaboration', description: 'Working with medical professionals' },
    { icon: '💡', title: 'Explainability', description: 'Transparent AI decisions' }
  ];

  return (
    <div className="min-h-screen bg-primary-50 pt-16">
      {/* Main Sections */}
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-primary-600 mb-8 relative"
            >
              {section.title}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary-500 rounded-full mt-4"></div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-700 leading-relaxed whitespace-pre-line"
            >
              {section.content}
            </motion.p>
          </div>
        </motion.section>
      ))}

      {/* Team Section */}
      <motion.section
        id="team"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 bg-primary-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-primary-600 text-center mb-12"
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
                />
                <h4 className="text-xl font-semibold text-primary-600 mb-2">{member.name}</h4>
                <p className="text-gray-600">{member.id}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 bg-gradient-to-br from-primary-200 to-primary-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-primary-600 text-center mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-primary-600 mb-4">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;