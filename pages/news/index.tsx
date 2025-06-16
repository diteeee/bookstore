import Link from "next/link";
import { GetServerSideProps } from "next";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/shared/Button";
import React, { useEffect, useMemo } from "react";
import { useNewsContext } from "@/lib/contexts/NewsContext";

interface News {
  _id: string;
  title: string;
  body?: string;
}

interface NewsPageProps {
  initialNews: News[];
}

export default function NewsPage({ initialNews }: NewsPageProps) {
  const { news, setNews } = useNewsContext();
  const prefersReducedMotion = useReducedMotion();

  // Populate the context with server-side fetched data on mount
  useEffect(() => {
    setNews(initialNews);
  }, [initialNews, setNews]);

  // Memoized news cards
  const newsCards = useMemo(
    () =>
      news.map((post) => (
        <motion.div
          key={post._id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2 className="text-lg font-serif font-bold text-gray-800 mb-3 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-500 mb-4 line-clamp-3">
            {post.body || "Description not available."}
          </p>
          <div className="flex flex-col space-y-2 items-center">
            <Link href={`/update/news/${post._id}`} passHref legacyBehavior>
              <a>
                <Button text="Update" variant="tertiary" />
              </a>
            </Link>
            <Button
              text="Delete"
              variant="danger"
              onClick={async () => {
                const confirmed = confirm("Do you want to delete news?");
                if (!confirmed) return;

                try {
                  const res = await fetch(`/api/news/${post._id}`, {
                    method: "DELETE",
                  });
                  if (!res.ok) throw new Error("Failed to delete news.");
                  alert("News deleted successfully.");
                  setNews((prev) => prev.filter((n) => n._id !== post._id));
                } catch (error) {
                  alert("Error deleting news.");
                  console.error(error);
                }
              }}
            />
          </div>
        </motion.div>
      )),
    [news, prefersReducedMotion, setNews]
  );

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          News Display
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explore latest bookstore news
        </p>
      </motion.div>

      {/* Add News Button */}
      <div className="mb-8">
        <Link href="/create/news" passHref>
          <Button text="Add News" variant="tertiary" />
        </Link>
      </div>

      {/* News Content */}
      {news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {newsCards}
        </div>
      ) : (
        <div className="col-span-3 py-20">
          <p className="text-xl font-bold text-gray-800 text-center">
            No news in the database.
          </p>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/news`);
    const news: News[] = await res.json();

    return {
      props: { initialNews: news },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { initialNews: [] },
    };
  }
};
