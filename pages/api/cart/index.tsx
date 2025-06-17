import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]"; // adjust path if necessary

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id; // This comes from your NextAuth session
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
        const { title, authorName, bookKey, bookId } = req.body;

        const newItem = await cartCollection.insertOne({
          userId,
          title,
          authorName,
          bookKey: bookKey || null,
          bookId: bookId || null,
          createdAt: new Date(),
        });

        // Note: insertedId instead of ops for MongoDB driver v4+
        const insertedItem = await cartCollection.findOne({ _id: newItem.insertedId });

        return res.status(201).json(insertedItem);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid cart item ID" });
        }

        const result = await cartCollection.deleteOne({
          _id: new ObjectId(id),
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
