import { Blog } from "@/api/models/Blog";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/shared/Button";

export default function CreateBlog() {
  const router = useRouter();
  const [newBlog, setNewBlog] = useState({ title: "", body: "", cover: "" });
  const { post } = useFetch<Blog[]>("/api/blogs");

  const handleCreate = async () => {
    console.log("Submitting Blog:", newBlog); // Log the blog data for debugging
    if (!newBlog.title || !newBlog.body || !newBlog.cover) return;
    try {
      await post(newBlog);
      setNewBlog({ title: "", body: "", cover: "" });
      router.push("/blogs");
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mt-6">
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Add New Book
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Add a title and description.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
        <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
          Book Details
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Content"
          value={newBlog.body}
          onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
          className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 resize-none"
        />
        <textarea
          placeholder="Image URL"
          value={newBlog.cover}
          onChange={(e) => setNewBlog({ ...newBlog, cover: e.target.value })}
          className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 resize-none"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleCreate}
            text="Add Book"
            variant="tertiary"
          />
        </div>
      </div>
    </div>
  );
}
