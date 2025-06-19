import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import emailjs from "emailjs-com";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  emailjs
    .send(
      "service_erwa8rf",
      "template_juz01dr",
      formData,
      "2idW1OYVOZZjTPYZw"
    )
    .then(
      (response) => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      },
      (error) => {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    )
    .finally(() => setIsSubmitting(false));
};


  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl mt-8"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Whether you have questions, need recommendations, or simply want to
          say hello, we&apos;re here for you. Reach out anytime!
        </p>
      </motion.div>

      {/* Contact Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-1">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-1">Email</span>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold mb-1">Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Your message..."
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-black"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="submit"
              className={`bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-teal-600 mr-3" />
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Booklover St, Storytown, BK 45678
            </p>
          </div>
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-teal-600 mr-3" />
            <p className="text-gray-700">
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>
          <div className="flex items-center">
            <Mail className="w-6 h-6 text-teal-600 mr-3" />
            <p className="text-gray-700">
              <strong>Email:</strong> contact@ourbookstore.com
            </p>
          </div>
          <p className="text-gray-600 mt-6">
            <strong>Hours:</strong> Mon-Sat, 9am to 7pm. We&apos;re always happy to assist you!

            assist you!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
