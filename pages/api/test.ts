import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const test = await db.command({ ping: 1 });
    console.log("Connected to MongoDB:", test);
    res.status(200).json({ message: "MongoDB connection successful." });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ error: "MongoDB connection failed.", error });
  }
}
