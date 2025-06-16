import { NextApiRequest, NextApiResponse } from "next";
import { addToCart, getCartItems } from "@/api/services/cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const result = await addToCart(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Error adding to cart.", error });
    }
  } else if (req.method === "GET") {
    const { userId } = req.query;
    try {
      const items = await getCartItems(userId as string);
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching cart items.", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` }); // Corrected this line
  }
}
