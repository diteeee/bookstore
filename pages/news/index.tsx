import { News } from "@/api/models/News";
import { useNewsContext } from "@/lib/contexts/NewsContext";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";

export default function NewsPage() {
    const router = useRouter();
    const { news, setNews } = useNewsContext();
    const { data, loading, remove } = useFetch<News[]>("/api/news");

    useEffect(() => {
        if (data) {
            setNews(data);
        }
    }, [data, setNews]);

    const handleDeleteNews = async (id: string) => {
        const confirmed = confirm("Do you want to delete news?");
        if (!confirmed) return;

        try {
            await remove(`/api/news/${id}`);
            alert("News deleted successfully");
            window.location.reload();
        } catch (error) {
            alert("Error deleting news.");
            console.error(error);
        }
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
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="loader">Loading...</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
                    {news && news.length > 0 ? (
                        news.map((post: News) => (
                            <motion.div
                                key={post._id}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                <h2 className="text-lg font-serif font-bold text-gray-800 mb-3 line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 mb-4 line-clamp-3">
                                    {post.body || "Description not available."}
                                </p>
                                <div className="flex flex-col space-y-2 items-center">
                                    <Link href={`/update/news/${post._id}`} passHref>
                                        <Button text="Update" variant="tertiary" />
                                    </Link>
                                    <Button
                                    text="Delete"
                                    variant="danger"
                                    onClick={() => handleDeleteNews(post._id)}
                                    />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-3 py-20">
                            <p className="text-xl font-bold text-gray-800 text-center">
                                No news in the database.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

NewsPage.displayName = "News | My Application";
