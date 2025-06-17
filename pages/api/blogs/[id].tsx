import { deleteBlog, getBlog, updateBlog } from "@/api/services/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const id = req.query.id as string;
            const blog = await getBlog(id);
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if (req.method === "PUT") {
        try {
            const newBlog = req.body;
            const result = await updateBlog(req.query.id as string, newBlog);
            res.status(200).json(result); // Use 200 for updates
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if (req.method === "DELETE") {
        try {
            const blog = await deleteBlog(req.query.id as string);
            res.status(200).json(blog);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res
            .status(405)
            .json({ message: "Metoda e kerkeses nuk eshte e mbeshtetur" });
    }
}