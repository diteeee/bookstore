import { News } from "@/api/models/News";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/shared/Button";

export default function CreateNews() {
  const router = useRouter();
  const [newNews, setNewNews] = useState({ title: "", body: "" });
  const { post } = useFetch<News[]>("/api/news");

  const handleCreate = async () => {
    if (!newNews.title || !newNews.body) return;
    await post(newNews);
    setNewNews({ title: "", body: "" });
    router.push("/news");
  };

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mt-6">
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Add News
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Add a title and description of news.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
        <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
          News Details
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={newNews.title}
          onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Description"
          value={newNews.body}
          onChange={(e) => setNewNews({ ...newNews, body: e.target.value })}
          className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 resize-none"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleCreate}
            text="Add News"
            variant="tertiary"
          />
        </div>
      </div>
    </div>
  );
}
