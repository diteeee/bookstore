import { News } from "@/api/models/News";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";

export default function UpdateNews() {
  const router = useRouter();
  const { id } = router.query;
  const [newNews, setNewNews] = useState({ title: "", body: "" });
  const { data: existingNews, loading, put } = useFetch<News>(`/api/news/${id}`);

  useEffect(() => {
    if (existingNews) {
      setNewNews({
        title: existingNews.title || "",
        body: existingNews.body || "",
      });
    }
  }, [existingNews]);

  const handleUpdate = async () => {
    if (!newNews.title || !newNews.body || !id) return;

    try {
      const updatedNews = await put(newNews);
      console.log("Updated News: ", updatedNews);
      router.push("/news");
    } catch (error) {
      console.error("Failed to update the news:", error);
      alert("Failed to update the news. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Duke u ngarkuar...</p>;

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl">
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6 mt-6">
          Update News
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Make changes to your news content and save your updates.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
        <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
          Update News Details
        </h2>
        <input
          type="text"
          placeholder="Titulli"
          value={newNews.title}
          onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Përmbajtja"
          value={newNews.body}
          onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
          className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 resize-none"
        />
        <div className="flex justify-end">
            <Button
                onClick={handleUpdate}
                text="Update News"
                variant="tertiary"
            />
        </div>
      </div>
    </div>
  );
}
