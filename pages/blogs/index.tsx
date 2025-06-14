import Link from "next/link";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import React, { useState } from "react";

interface Book {
  key: string; // e.g. "/works/OL45883W"
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface BlogsProps {
  books: Book[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://openlibrary.org/search.json?q=fiction");
  const data = await res.json();

  // Limit to 20 books for better performance
  const books: Book[] = (data.docs || [])
    .slice(0, 20)
    .map((book: any) => ({
      ...book,
      key: book.key.replace("/works/", ""),
    }));

  return {
    props: { books },
    revalidate: 3600, // Revalidate every hour
  };
};

export default function Blogs({ books }: BlogsProps) {
  const [visibleBooks, setVisibleBooks] = useState(books);

  const loadMoreBooks = () => {
    // Simulate loading more books (e.g., from API or state)
    setVisibleBooks((prev) => [...prev, ...books]);
  };

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Browse our collection of hand-picked books and explore the stories
          that captivate readers worldwide.
        </p>
      </motion.div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {visibleBooks.map((book) => (
          <motion.div
            key={book.key}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h2 className="text-lg font-serif font-bold text-gray-800 mb-3 line-clamp-2">
              {book.title}
            </h2>
            <p className="text-gray-500 mb-4 italic">
              {book.author_name?.join(", ") || "Unknown Author"}
            </p>
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
              First Published: {book.first_publish_year || "N/A"}
            </p>
            <Link href={`/blogs/ssg/${book.key}`}>
              <Button text="Read More" variant="tertiary" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-8">
        <Button
          text="Load More"
          variant="primary"
          onClick={loadMoreBooks}
          disabled={visibleBooks.length >= books.length * 2}
        />
      </div>
    </div>
  );
}
