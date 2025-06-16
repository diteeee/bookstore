// pages/api/user.ts

import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getUser, updateUser } from "@/api/services/User"; // adjust import if needed
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // adjust path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the session for the logged-in user
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized: No active session" });
    }

    const email = session.user.email;

    if (req.method === "GET") {
      // Handle GET request to fetch user data
      const user = await getUser(email);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Exclude sensitive information like password from the response
      const { password, ...userData } = user;
      return res.status(200).json(userData);
    } else if (req.method === "PUT") {
      // Handle PUT request to update user data
      const { name, password } = req.body;

      // Validation: Name is required
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const updatedData: any = { name };

      // Update password if provided and not empty
      if (password && password.trim() !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }

      const result = await updateUser(email, updatedData);

      // Check if the update operation was successful
      if (!result.modifiedCount) {
        return res
          .status(404)
          .json({ error: "User not found or no changes made" });
      }

      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      // Method not allowed
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("API Error:", error);

    // Return a generic error response to avoid exposing sensitive details
    return res.status(500).json({ error: "Internal server error" });
  }
}
