
import { createBlog, getBlogs } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newBlog = req.body;
      console.log("New Blog Data:", newBlog);

      if (!newBlog.cover) {
        return res.status(400).json({ message: "Cover image is required" });
      }

      const result = await createBlog(newBlog);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Failed to create blog", error });
    }
  } else if (req.method === "GET") {
    try {
      const blogs = await getBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Method not supported" });
  }
}