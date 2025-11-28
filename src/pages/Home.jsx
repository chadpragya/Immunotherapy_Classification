import React from 'react';
import microbiomeImage from '../../public/images/microbiome.jpg';
import immunotherapyImage from '../../public/images/immunotherapy.jpg';
import connectionImage from '../../public/images/connection.webp';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const infoSections = [
    {
      title: "What is the Gut Microbiome?",
      content: "The gut microbiome is the community of trillions of microorganisms that live in your digestive tract, influencing your digestion, immunity, brain, and even mood.",
      image: microbiomeImage,
      reverse: false
    },
    {
      title: "What Is Immunotherapy?",
      content: "Immunotherapy is a type of medical treatment that uses a person's own immune system to fight diseases — most commonly cancer, but also autoimmune disorders and infections.",
      image: immunotherapyImage ,
      reverse: true
    },
    {
      title: "Gut Microbiome & Immunotherapy",
      content: "The gut microbiome plays a vital role in regulating the immune system, directly influencing how the body responds to immunotherapy.",
      image: connectionImage,
      reverse: false
    }
  ];

  const services = [
    {
      title: "Microbiome Data Analysis",
      description: "We process and analyze gut microbiome data using advanced preprocessing and feature selection techniques."
    },
    {
      title: "Immunotherapy Suitability Prediction",
      description: "Our explainable machine learning model predicts patient suitability for cancer immunotherapy."
    },
    {
      title: "Model Explainability Dashboard",
      description: "We offer a visual interface to explore which gut microbes contribute most to immune response prediction."
    },
    {
      title: "Personalized Health Insights",
      description: "Patients receive microbiome-based health insights to personalize treatments."
    }
  ];

  const testimonials = [
    {
      name: "Mr. Rahul Dev",
      comment: "OncoBiome made it so easy to consult a doctor. Love their service!",
      image: "/images/user1.jpg"
    },
    {
      name: "Ms. Kriti",
      comment: "Excellent platform! Easy to use.",
      image: "/images/user2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-white z-10"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Your Gut Holds the Key to Your Immunotherapy Success
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl mb-8 leading-relaxed"
              >
                Discover how your gut health influences your body's response to treatment. Using advanced microbiome analysis, we help predict your compatibility with immunotherapy.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link
                  to="/prediction"
                  className="inline-block bg-primary-800 text-primary-50 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/images/hero-medical.jpg"
                  alt="Healthcare"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      {infoSections.map((section, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className={`py-20 ${section.reverse ? 'bg-primary-100' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="lg:w-1/2"
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full rounded-2xl shadow-xl"
                />
              </motion.div>
              <div className="lg:w-1/2">
                <motion.h3
                  initial={{ opacity: 0, x: section.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-primary-600 mb-6"
                >
                  {section.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: section.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  {section.content}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Services Section */}
      <section className="py-20 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary-600 text-center mb-12"
          >
            Our Services
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <h4 className="text-xl font-semibold text-primary-800 mb-4">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-200 to-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary-600 text-center mb-12"
          >
            What Our Users Say
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-sm"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-700 text-center mb-4 italic">"{testimonial.comment}"</p>
                <h4 className="text-primary-600 font-semibold text-center">- {testimonial.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;