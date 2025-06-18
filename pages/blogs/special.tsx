import Link from "next/link";
import { GetStaticProps } from "next";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/shared/Button";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Book {
  key: string; // e.g. "OL12345W"
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  covers?: number[];
}

interface BlogsSSGProps {
  books: Book[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://openlibrary.org/search.json?q=fiction");
  const data = await res.json();

  const books: Book[] = (data.docs || [])
    .slice(0, 20)
    .map((book: any) => ({
      key: book.key.replace("/works/", ""),
      title: book.title,
      author_name: book.author_name,
      first_publish_year: book.first_publish_year,
      covers: book.cover_i ? [book.cover_i] : [],
    }));

  return {
    props: { books },
    revalidate: 3600,
  };
};

export default function BlogsSSG({ books }: BlogsSSGProps) {
  const prefersReducedMotion = useReducedMotion();
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [visibleBooks, setVisibleBooks] = useState<Book[]>(books);

  useEffect(() => {
    if (session?.user?.role) {
      setUserRole(session.user.role);
    } else if (typeof window !== "undefined") {
      const roleFromStorage = localStorage.getItem("userRole");
      setUserRole(roleFromStorage);
    }
  }, [session]);

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
            Authorization: `Bearer ${session.user.token}`,
          },
          body: JSON.stringify({
            title: book.title,
            authorName: book.author_name?.join(", ") || "Unknown Author",
            bookId: book.key,
            cover: coverUrl, // Pass coverUrl here
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

  const bookCards = useMemo(
    () =>
      visibleBooks.map((book) => {
        const coverUrl = book.covers?.[0]
          ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
          : null;

        return (
          <motion.div
            key={book.key}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center relative"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {coverUrl ? (
              <div className="w-full h-64 relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={coverUrl}
                  alt={`Cover of ${book.title}`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg"
                />
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                No Cover Available
              </div>
            )}
            <h2 className="text-lg font-serif font-bold text-gray-800 mb-3 line-clamp-2">
              {book.title}
            </h2>
            <p className="text-gray-500 mb-4 italic">
              {book.author_name?.join(", ") || "Unknown Author"}
            </p>
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
              First Published: {book.first_publish_year || "N/A"}
            </p>
            <div className="flex flex-col space-y-2 items-center">
              <Link href={`/blogs/ssg/${book.key}`} passHref legacyBehavior>
                <Button text="Read More" variant="tertiary" onClick={() => {}} />
              </Link>
            </div>
            <button
              className="absolute top-4 right-4 bg-blue-900 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-300"
              onClick={() => handleAddToCart(book, coverUrl)} // Pass coverUrl here
            >
              <ShoppingCartIcon />
            </button>
          </motion.div>
        );
      }),
    [visibleBooks, prefersReducedMotion, handleAddToCart]
  );


  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl mt-8"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Browse our collection of hand-picked books and explore the stories
          that captivate readers worldwide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {bookCards}
      </div>
    </div>
  );
}
