import React from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10 max-w-2xl"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600">
            Have questions or want to say hello? We’d love to hear from you! Reach out using the form below or visit us in store.
          </p>
        </motion.div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form className="flex flex-col space-y-6">
              <label className="flex flex-col">
                <span className="text-gray-700 font-semibold mb-1">Name</span>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-gray-700 font-semibold mb-1">Email</span>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-gray-700 font-semibold mb-1">Message</span>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </label>

              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Visit or Call Us</h2>
            <p className="mb-2 text-gray-600">
              <strong>Address:</strong> 123 Booklover St, Storytown, BK 45678
            </p>
            <p className="mb-2 text-gray-600">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="mb-2 text-gray-600">
              <strong>Email:</strong> contact@ourbookstore.com
            </p>
            <p className="text-gray-600">
              Our doors are open Mon-Sat, 9am to 7pm. We’re happy to welcome you!
            </p>
          </div>
        </div>
      </div>
  );
};

export default ContactPage;
