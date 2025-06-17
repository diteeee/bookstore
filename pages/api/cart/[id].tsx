import { NextApiRequest, NextApiResponse } from "next";
import { removeFromCart } from "@/api/services/Cart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const result = await removeFromCart(id as string);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart.", error });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
