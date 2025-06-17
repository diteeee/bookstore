import type { NextApiRequest, NextApiResponse } from "next";
import { updateUser, deleteUser, getUser } from "@/api/services/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  // Protect route: only admin can update/delete users
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    if (req.method === "PUT") {
      const { name, role, password } = req.body;

      if (!name || !role) {
        return res.status(400).json({ error: "Name and role are required" });
      }

      const updateData: any = { name, role };

      if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const result = await updateUser(email, updateData);

      if (!result.modifiedCount) {
        return res.status(404).json({ error: "User not found or no changes made" });
      }

      return res.status(200).json({ message: "User updated successfully" });

    } else if (req.method === "DELETE") {
      const user = await getUser(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await deleteUser(email);

      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
