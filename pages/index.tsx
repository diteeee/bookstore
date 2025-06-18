import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import useFetch from "hooks/useFetch";
import { Rocket, BarChart, ShieldCheck } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Book {
  key: string; // unique id
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number; // cover ID for fetching the book cover
}

interface OpenLibraryResponse {
  docs: Book[];
}

const HomePage = () => {
  const { data: initialData, loading } = useFetch<OpenLibraryResponse>(
    "https://openlibrary.org/search.json?q=fiction"
  );
  const [books, setBooks] = useState<Book[]>([]);
  const { data: session } = useSession();
  const userRole = useMemo(() => {
    if (typeof window !== "undefined") {
      return session?.user?.role || localStorage.getItem("userRole");
    }
    return session?.user?.role || null;
  }, [session]);
  const router = useRouter();

  useEffect(() => {
    if (initialData?.docs) {
      setBooks(initialData.docs.slice(0, 20)); // Limit books to 20 for better performance
    }
  }, [initialData]);

  const handleAddToCart = useCallback(
    async (book: Book, coverUrl: string | null) => {
      if (!session) {
        alert("You must be logged in to add to cart");
        return;
      }

      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: book.title,
            authorName: book.author_name?.join(", ") || "Unknown Author",
            bookId: book.key,
            cover: coverUrl,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to add to cart");
        }

        alert("Book added to cart successfully!");
      } catch (error: any) {
        alert(error.message);
      }
    },
    [session]
  );

  const handleDelete = (key: string) => {
    setBooks((prev) => prev.filter((book) => book.key !== key));
  };

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl mt-8"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Welcome to Our Bookstore
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explore our curated collection of books spanning every genre, and
          discover stories that will inspire and captivate you.
        </p>
        <div className="mt-8">
          <Button
            text="Discover Our Collection"
            variant="primary"
            onClick={() => router.push("/blogs")}
          />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-14">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          books.map((book) => {
            const coverUrl = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : "/default-cover.jpg";

            return (
              <motion.div
                key={book.key}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="w-full h-64 relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={coverUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-lg font-serif font-bold text-gray-800 mb-3 line-clamp-2">
                  {book.title}
                </h2>
                <p className="text-gray-500 mb-4 italic">
                  {book.author_name?.join(", ") || "Unknown Author"}
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  First Published: {book.first_publish_year || "N/A"}
                </p>
                <div className="flex flex-col space-y-2 items-center">
                  {userRole === "admin" && (
                    <Button
                      text="Delete"
                      variant="danger"
                      onClick={() => handleDelete(book.key)}
                    />
                  )}
                </div>
                <button
                  className="absolute top-4 right-4 bg-blue-900 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-300"
                  onClick={() => handleAddToCart(book, coverUrl)}
                >
                  <ShoppingCartIcon />
                </button>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-14"
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
          onClick={() => router.push("/contact")}
        />
      </motion.div>
    </div>
  );
};

export default HomePage;
