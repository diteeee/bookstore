
import clientPromise from "@/lib/mongodb";
import { Blog } from "@/api/models/Blog";
import { ObjectId } from "mongodb"

export async function createBlog(data: Blog) {
  const client = await clientPromise;
  const db = client.db("bookstore");
  const { _id, ...blogData } = data;

  if (!blogData.cover) {
    throw new Error("Cover image is required");
  }

  const result = await db.collection("blogs").insertOne({
    ...blogData,
    createdAt: new Date(),
  });
  return result;
}


export async function getBlogs(limit = 10) {
  const client = await clientPromise;
  const db = client.db("bookstore");
  const blogs = await db
    .collection("blogs")
    .find({}, { projection: { title: 1, body: 1, cover: 1, createdAt: 1 } })  // Only return these fields
    .sort({ createdAt: -1 })
    .limit(limit) // limit number of returned blogs
    .toArray();
  return blogs;
}

export async function getBlog(id: string) {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const blog = await db.collection("blogs").findOne({_id: new ObjectId(id)});
    return blog;
}

export async function updateBlog(id: string, data: Blog) {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const blog = await db
        .collection("blogs")
        .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return blog;
}

export async function deleteBlog(id: string) {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const blog = await db
        .collection("blogs")
        .deleteOne({ _id: new ObjectId(id) });
    return blog;
}