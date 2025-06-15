import { Blog } from "@api/models/Blog";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/shared/Button";

export default function CreateBlog() {
  const router = useRouter();
  const [newBlog, setNewBlog] = useState({ title: "", body: "" });
  const { post } = useFetch<Blog[]>("/api/blogs");

  const handleCreate = async () => {
    if (!newBlog.title || !newBlog.body) return;
    await post(newBlog);
    setNewBlog({ title: "", body: "" });
    router.push("/blogs");
  };

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl">
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Shto Blog të ri
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Shtoni një blog të ri duke plotësuar titullin dhe përmbajtjen më poshtë.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
        <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
          Detajet e Blogut të Ri
        </h2>
        <input
          type="text"
          placeholder="Titulli"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Përmbajtja"
          value={newBlog.body}
          onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
          className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 resize-none"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleCreate}
            text="Shto Blog"
            variant="tertiary"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}
