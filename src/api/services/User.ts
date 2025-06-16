import clientPromise from "@/lib/mongodb";
import { User } from "@/api/models/User";

export async function createUser(data: User) {
    console.log("Data to insert:", data);
    const client = await clientPromise;
    const db = client.db("bookstore");
    const result = await db.collection("users").insertOne({
        ...data,
        createdAt: new Date(),
    });
    console.log("Insert result:", result);
    return result;
}

export async function getUsers() {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const users = await db
        .collection("users")
        .find()
        .sort({ createdAt: -1 })
        .toArray();
    return users;
}

export async function getUser(email: string) {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const user = await db.collection("users").findOne({email: email});
    return user;
}

export async function updateUser(email: string, data: Partial<User>) {
  const client = await clientPromise;
  const db = client.db("bookstore");
  const user = await db
    .collection("users")
    .updateOne({ email }, { $set: data });
  return user;
}

export async function deleteUser(email: string) {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const user = await db
        .collection("users")
        .deleteOne({email: email});
    return user;
}