import { Blog } from "@/api/models/Blog";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@/components/shared/Button";

export default function UpdateBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [newBlog, setNewBlog] = useState({ title: "", body: "", cover: "" });
  const { data: existingBlog, loading, put } = useFetch<Blog>(`/api/blogs/${id}`); // Use Blog here

  useEffect(() => {
    if (existingBlog) {
      setNewBlog({
        title: existingBlog.title || "",
        body: existingBlog.body || "",
        cover: existingBlog.cover || "",
      });
    }
  }, [existingBlog]);

  const handleUpdate = async () => {
    if (!newBlog.title || !newBlog.body || !newBlog.cover || !id) return;

    try {
      const updatedBlog = await put(newBlog); // Log response to ensure update
      console.log("Updated book: ", updatedBlog);
      router.push("/blogs");
    } catch (error) {
      console.error("Failed to update the blog:", error);
      alert("Failed to update the book. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mt-6">
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Update Book
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Make changes to your book content and save your updates.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
        <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
          Update Book Details
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
          placeholder="Image"
          value={newBlog.cover}
          onChange={(e) => setNewBlog({ ...newBlog, cover: e.target.value })}
          className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 resize-none"
        />
        <div className="flex justify-end">
            <Button
                onClick={handleUpdate}
                text="Update Book"
                variant="tertiary"
            />
        </div>
      </div>
    </div>
  );
}
