import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getUser, updateUser } from "@/api/services/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

type UpdateUserData = {
  name: string;
  password?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized: No active session" });
    }

    const email = session.user.email;

    if (req.method === "GET") {
      const user = await getUser(email);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userData } = user;
      return res.status(200).json(userData);
    } else if (req.method === "PUT") {
      const { name, password } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const updatedData: UpdateUserData = { name };

      if (password && password.trim() !== "") {
        updatedData.password = await bcrypt.hash(password.trim(), 10);
      }

      const result = await updateUser(email, updatedData);

      if (!result.modifiedCount) {
        return res.status(404).json({ error: "User not found or no changes made" });
      }

      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);

    return res.status(500).json({ error: "Internal server error" });
  }
}
