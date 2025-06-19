
import { User } from "@/api/models/User";
import { getUser, createUser } from "@/api/services/User";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
    const { name, email, password } = req.body as User;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Ju lutem plotësoni të gjitha fushat" });
    }
    try {
        const existingUser = await getUser(email);
        if (existingUser) {
            return res.status(409).json({ error: "Email-i është i regjistruar tashmë" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
            role: "user",
            createdAt: new Date(),
        };
        
        const result = await createUser(newUser);
        res.status(201).json({
            message: "User registered successfully.",
            userId: result.insertedId,
        });
    } catch (error) {
        console.error("Error in registration handler:", error);
        res.status(500).json({ error: "Gabim gjatë regjistrimit" });
    }
}
}