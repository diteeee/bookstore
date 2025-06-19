import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;
  const client = await clientPromise;
  const db = client.db("bookstore");
  const cartCollection = db.collection("cart");

  try {
    switch (req.method) {
      case "GET": {
        const cartItems = await cartCollection
          .find({ userId })
          .sort({ createdAt: -1 })
          .toArray();
        return res.status(200).json(cartItems);
      }

      case "POST": {
        const { title, authorName, body, cover, bookKey, bookId } = req.body;

        const newItem = await cartCollection.insertOne({
          userId,
          title,
          authorName,
          body,
          cover,
          bookKey: bookKey || null,
          bookId: bookId || null,
          createdAt: new Date(),
        });

        const insertedItem = await cartCollection.findOne({ _id: newItem.insertedId });

        return res.status(201).json(insertedItem);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!ObjectId.isValid(id as string)) {
          return res.status(400).json({ error: "Invalid cart item ID" });
        }

        const result = await cartCollection.deleteOne({
          _id: new ObjectId(id as string),
          userId,
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Item not found or unauthorized" });
        }

        return res.status(200).json({ success: true });
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
