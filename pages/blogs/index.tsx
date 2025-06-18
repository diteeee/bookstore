import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/shared/Button";
import React, { useEffect, useState } from "react";
import useFetch from "hooks/useFetch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  body: string;
  cover: string; // Added cover attribute
}

export default function BlogsDB() {
  const prefersReducedMotion = useReducedMotion();
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.role) {
      setUserRole(session.user.role);
    } else if (typeof window !== "undefined") {
      const roleFromStorage = localStorage.getItem("userRole");
      setUserRole(roleFromStorage);
    }
  }, [session]);

  const { data: blogsData, remove } = useFetch<Blog[]>("/api/blogs");

  const handleAddToCart = async (post: Blog) => {
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
          title: post.title,
          body: post.body,
          bookId: post._id,
          cover: post.cover, // Include cover in the payload
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add to cart");
      }

      alert("Book added to cart successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("Do you want to delete this book?");
    if (!confirmed) return;

    try {
      await remove(`/api/blogs/${id}`);
      alert("Book deleted successfully.");
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  console.log("book: ", blogsData);

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl mt-8"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Books
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Browse our latest books.
        </p>
      </motion.div>

      <div className="mb-8">
        {userRole === "admin" && (
          <Link href="/create/blog" passHref>
            <Button text="Add Book" variant="tertiary" onClick={() => {}} />
          </Link>
        )}
      </div>

      {blogsData && blogsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {blogsData.map((post) => (
            <motion.div
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center relative"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {post.cover ? (
                <div className="w-full h-64 relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={`Cover of ${post.title}`}
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
                {post.title}
              </h2>
              <p className="text-gray-500 mb-4 italic line-clamp-3">
                {post.body || "No description available."}
              </p>
              <div className="flex flex-col space-y-2 items-center">
                {userRole === "admin" && (
                  <Link href={`/update/blog/${post._id}`} passHref legacyBehavior>
                    <Button text="Update" variant="tertiary" onClick={() => {}} />
                  </Link>
                )}

                {userRole === "admin" && (
                  <Button
                    text="Delete"
                    variant="danger"
                    onClick={() => handleDeleteBlog(post._id)}
                  />
                )}
              </div>

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
        <p>Loading books...</p>
      )}
    </div>
  );
}
