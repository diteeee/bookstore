import Link from "next/link";
import { GetStaticProps } from "next";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/shared/Button";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import useFetch from "hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSession, signIn } from "next-auth/react";

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

  const books: Book[] = (data.docs || [])
    .slice(0, 20)
    .map((book: any) => ({
      ...book,
      key: book.key.replace("/works/", ""),
    }));

  return {
    props: { books },
    revalidate: 3600,
  };
};

export default function Blogs({ books }: BlogsProps) {
  const [visibleBooks, setVisibleBooks] = useState<Book[]>(books);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { data: session } = useSession();
  const userRole = useMemo(() => {
    if (typeof window !== "undefined") {
      return session?.user?.role || localStorage.getItem("userRole");
    }
    return session?.user?.role || null;
  }, [session]);

  console.log("session: ", session);
  console.log("userrole: ", userRole);

  const {
    data: blogsData,
    loading: blogsLoading,
    remove,
    refetch,
  } = useFetch<Blog[]>("/api/blogs");

  async function handleAddToCart(bookId: string) {
    if (!session) {
      alert("You must be logged in to add to cart");
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.token}`,  // <-- Add this
        },
        body: JSON.stringify({ bookId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to add to cart");
      }

      alert("Book added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.message);
    }
  }


  const loadMoreBooks = () => {
    alert("No more books to load.");
  };

  const handleDelete = (key: string) => {
    setVisibleBooks((prev) => prev.filter((book) => book.key !== key));
  };

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("Do you want to delete this book?");
    if (!confirmed) return;

    try {
      await remove(`/api/blogs/${id}`);
      alert("Book deleted successfully.");
      window.location.reload();
    } catch (error) {
      alert("Error deleting book.");
      console.error(error);
    }
  };

  const bookCards = useMemo(
  () =>
    visibleBooks.map((book) => (
      <motion.div
        key={book.key}
        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center relative"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={prefersReducedMotion ? {} : { opacity: 1 }}
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
        <div className="flex flex-col space-y-2 items-center">
          <Link href={`/blogs/ssg/${book.key}`} passHref legacyBehavior>
            <Button text="Read More" variant="tertiary" />
          </Link>
          {userRole === "admin" && (

          <Button
            text="Delete"
            variant="danger"
            onClick={() => handleDelete(book.key)}
          />
          )}

        </div>
        {/* Cart Icon */}
        <button
          className="absolute top-4 right-4 bg-blue-900 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-300"
          onClick={() => handleAddToCart(book)}
        >
          <ShoppingCartIcon />
        </button>
      </motion.div>
    )),
  [visibleBooks, prefersReducedMotion]
);

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
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

      <div className="mb-8">
        {userRole === "admin" && (
          <Link href="/create/blog" passHref>
            <Button text="Add Blog" variant="tertiary"/>
          </Link>
        )}
      </div>

      {blogsData && blogsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {blogsData.map((post: Blog) => (
            <motion.div
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center relative"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h2 className="text-lg font-serif font-bold text-gray-800 mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-500 mb-4 italic line-clamp-3">
                {post.body || "No description available."}
              </p>
              <div className="flex flex-col space-y-2 items-center">

                {userRole === "admin" && (
                  <Link href={`/update/blog/${post._id}`} passHref legacyBehavior>
                    <a>
                      <Button text="Update" variant="tertiary" hidden={userRole !== "admin"}/>
                    </a>
                  </Link>
                )}

                {userRole === "admin" && (
                  <Button
                    text="Delete"
                    variant="danger"
                    onClick={() => handleDeleteBlog(post._id)}
                    hidden={userRole !== "admin"}
                  />
                )}
              </div>
              {/* Cart Icon */}
              <button
                className="absolute top-4 right-4 bg-blue-900 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-300"
                onClick={() => handleAddToCart(post)}
              >
                <ShoppingCartIcon />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {bookCards}
        </div>
      )}

      <div className="mt-8">
        <Button
          text="Load More"
          variant="quarternary"
          onClick={loadMoreBooks}
          disabled={true}
        />
      </div>
    </div>
  );
}
