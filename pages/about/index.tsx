import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import { BookOpen, Users, Calendar } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-3xl"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          About Our Bookstore
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Step into our world of stories. With a rich history and a commitment
          to community, we aim to be your sanctuary for literary treasures and
          inspiration.
        </p>
        <div className="mt-8">
          <Button
            text="Visit Us Today"
            variant="primary"
            onClick={() => alert("Redirecting to contact page...")}
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-14">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <BookOpen className="text-teal-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-600 text-sm">
            Fostering a love for reading by providing an inclusive and inspiring
            space for every book lover.
          </p>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Users className="text-teal-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Story</h2>
          <p className="text-gray-600 text-sm">
            Born from a passion for books, we’ve spent over a decade connecting
            readers with stories that inspire.
          </p>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Calendar className="text-teal-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Community Events
          </h2>
          <p className="text-gray-600 text-sm">
            From book signings to workshops, our events bring readers together
            to celebrate the love of literature.
          </p>
        </motion.div>
      </div>

      {/* Visit Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-14"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Visit Us</h2>
        <p className="text-lg text-gray-600 mb-6">
          Explore our shelves in person and enjoy a cozy atmosphere, friendly
          staff, and a passion for books.
        </p>
        <Button
          text="Get Directions"
          variant="secondary"
          onClick={() => alert("Redirecting to map...")}
        />
      </motion.div>
    </div>
  );
};

export default AboutPage;
