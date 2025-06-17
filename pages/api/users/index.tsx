// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "@/api/services/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email || session.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const users = await getUsers();
  const safeUsers = users.map(({ password, ...user }) => user);
  res.status(200).json(safeUsers);
}