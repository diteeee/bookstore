import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import useFetch from "hooks/useFetch";
import { Rocket, BarChart, ShieldCheck } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";

interface Book {
  key: string; // unique id
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface OpenLibraryResponse {
  docs: Book[];
}

const HomePage = () => {
  const { data: initialData, loading } = useFetch<OpenLibraryResponse>(
    "https://openlibrary.org/search.json?q=fiction"
  );

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (initialData?.docs) {
      setBooks(initialData.docs);
    }
  }, [initialData]);

  const handleDelete = (key: string) => {
    setBooks((prev) => prev.filter((book) => book.key !== key));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16 max-w-2xl"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Our Bookstore
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Explore our curated collection of books spanning every genre, and
          discover stories that will inspire and captivate you.
        </p>
        <div className="mt-8">
          <Button
            text="Discover Our Collection"
            variant="primary"
            onClick={() => alert("Redirecting to collections...")}
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
        <Card
          icon={Rocket}
          title="Fast Delivery"
          description="Get your books delivered swiftly and securely to your doorstep."
        />
        <Card
          icon={BarChart}
          title="Bestsellers"
          description="Browse our collection of top-selling books loved by readers worldwide."
        />
        <Card
          icon={ShieldCheck}
          title="Secure Shopping"
          description="Enjoy a safe and secure shopping experience with us."
        />
      </div>

      {/* Books Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 bg-gray-200 w-full max-w-6xl">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          books.map((book) => (
            <motion.section
              key={book.key}
              className="bg-white rounded-xl p-6 shadow-md text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-indigo-600 line-clamp-2 uppercase">
                {book.title}
              </h2>
              <p className="text-gray-700 mb-2">
                Author: {book.author_name?.join(", ") || "Unknown"}
              </p>
              <p className="text-gray-600 italic">
                First Published: {book.first_publish_year || "N/A"}
              </p>
              <button
                onClick={() => handleDelete(book.key)}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Delete Book
              </button>
            </motion.section>
          ))
        )}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Have Questions?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Contact our team for any inquiries or assistance.
        </p>
        <Button
          text="Contact Us"
          variant="secondary"
          onClick={() => alert("Redirecting to contact page...")}
        />
      </motion.div>
    </div>
  );
};

export default HomePage;
