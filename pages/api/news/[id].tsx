import { deleteNews, getSingleNews, updateNews } from "@/api/services/News";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const id = req.query.id as string;
            const news = await getSingleNews(id);
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if (req.method === "PUT") {
        try {
            const newNews = req.body;
            const result = await updateNews(req.query.id as string, newNews);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if (req.method === "DELETE") {
        try {
            const news = await deleteNews(req.query.id as string);
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res
            .status(405)
            .json({ message: "Metoda e kerkeses nuk eshte e mbeshtetur" });
    }
}