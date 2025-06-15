
import { createBlog, getBlogs } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
        const newBlog = req.body;
        const result = await createBlog (newBlog);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
    }
    if (req.method === "GET") {
        try {
            const blogs = await getBlogs();
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res
            .status(405)
            .json({ message: "Metoda e kerkeses nuk eshte e mbeshtetur" });
    }
}