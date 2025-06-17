import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import { BookOpen, User, Lock, Users, ClipboardList, Settings } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-3xl mt-8"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          About This Project
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Welcome to our online bookstore application, developed as part of the course <strong>Client-Side Web Development</strong>, 
          guided by Prof. Cand. PhD. Vesa Morina. This platform offers a seamless experience for browsing, managing, and exploring 
          books and literary content.
        </p>
        <div className="mt-8">
          <Button
            text="Explore Features"
            variant="primary"
            onClick={() => alert("Redirecting to features...")}
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-14">
        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <BookOpen className="text-emerald-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Book Browsing</h2>
          <p className="text-gray-600 text-sm">
            Browse and explore a wide variety of books with dynamic features for viewing detailed information and discovering updates.
          </p>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <ClipboardList className="text-emerald-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Content</h2>
          <p className="text-gray-600 text-sm">
            Add, update, or delete books and news updates directly from the user interface, ensuring up-to-date content for your audience.
          </p>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <User className="text-emerald-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">User Roles</h2>
          <p className="text-gray-600 text-sm">
            Role-based authentication with secure sign-in and sign-up features, ensuring access control and a personalized experience.
          </p>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Settings className="text-emerald-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">User Dashboard</h2>
          <p className="text-gray-600 text-sm">
            A dedicated dashboard for logged-in users to manage their profiles, view saved books, and access personalized content.
          </p>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Lock className="text-emerald-600 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Admin Panel</h2>
          <p className="text-gray-600 text-sm">
            Admins can access an exclusive panel to view all users, manage roles, and oversee platform operations effectively.
          </p>
        </motion.div>
      </div>

      {/* Closing Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-14"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          About the Developer
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          This project was developed by <strong>Dite Qela</strong> as part of the course requirements. 
          For inquiries, reach out at <a href="mailto:dq66228@ubt-uni.net" className="text-blue-600 hover:underline">dq66228@ubt-uni.net</a>. 
          A special thanks to Prof. Cand. PhD. Vesa Morina for the guidance provided throughout this journey.
        </p>
        <Button
          text="View the Live App"
          variant="secondary"
          onClick={() => alert("Redirecting to the live app...")}
        />
      </motion.div>
    </div>
  );
};

export default AboutPage;
