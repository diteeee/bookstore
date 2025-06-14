import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our Bookstore</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Welcome to our bookstore, your one-stop destination for literary treasures! Our carefully curated selection caters to every book lover, from timeless classics to modern bestsellers. We believe in the power of stories to inspire, educate, and entertain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To foster a love for reading by providing an inclusive space where everyone can explore, discover, and share the joy of books.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600">
              Established in the heart of the city, our bookstore has been a haven for book enthusiasts for over a decade. With a passion for literature and community, we aim to connect readers with their next great adventure.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Visit Us</h2>
            <p className="text-gray-600">
              Come by our store to explore our collection in person. Enjoy a cozy atmosphere, friendly staff, and regular events like book signings and readings.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Community & Events</h2>
            <p className="text-gray-600">
              We regularly host book clubs, author talks, and workshops to bring our community together and celebrate the joy of reading.
            </p>
          </div>
        </div>
      </div>
  );
};

export default AboutPage;
