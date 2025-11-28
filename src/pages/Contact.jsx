
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const formRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const contactInfo = [
    { icon: "📞", text: "+91 98765 43210" },
    { icon: "✉️", text: "support@oncobiome.com" },
    { icon: "📍", text: "Sector 21, New Delhi, India" },
    { icon: "⏰", text: "Mon - Sat: 9:00 AM - 8:00 PM" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;
    // Make sure all required fields are filled
    if (!form.name.value || !form.email.value || !form.subject.value || !form.message.value) {
      alert("Please fill in all fields.");
      return;
    }

    // Submit the form via the browser
    form.submit();

    // Show success popup
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    // Reset the form
    form.reset();
  };

  return (
    <div className="min-h-screen gradient-bg pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full max-w-lg"
          >
            <div className="bg-white/65 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-primary-600 mb-8 text-center">
                Get In Touch
              </h2>

              <form
                ref={formRef}
                action="https://formspree.io/f/mpwkgznv"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full px-6 py-4 bg-white/90 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all duration-300"
                />

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-6 py-4 bg-white/90 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all duration-300"
                />

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="w-full px-6 py-4 bg-white/90 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all duration-300"
                />

                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  rows="5"
                  placeholder="Your Message..."
                  required
                  className="w-full px-6 py-4 bg-white/90 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all duration-300 resize-none"
                />

                {/* Hidden field for sending copy to user */}
                <input type="hidden" name="_replyto" />

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-400 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full max-w-lg"
          >
            <div className="bg-white/65 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-primary-600 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center p-4 rounded-2xl hover:bg-white/60 transition-all duration-300"
                  >
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <span className="text-lg text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl mb-4"
              >
                ✅
              </motion.div>
              <h3 className="text-2xl font-bold text-primary-600 mb-4">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-700">
                Thank you for contacting OncoBiome. We'll get back to you soon.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
