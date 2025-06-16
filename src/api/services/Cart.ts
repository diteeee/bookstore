import clientPromise from "@/lib/mongodb";
import { CartItem } from "@/api/models/Cart";
import { ObjectId } from "mongodb";

// Add item to the cart
export async function addToCart(data: CartItem) {
  const client = await clientPromise;
  const db = client.db("bookstore");
  const result = await db.collection("cart").insertOne({
    ...data,
    createdAt: new Date(),
  });
  return result;
}

// Get cart items for a specific user
export async function getCartItems(userId: string) {
  const client = await clientPromise;
  const db = client.db("bookstore");
  const cartItems = await db
    .collection("cart")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
  return cartItems;
}

// Remove a specific item from the cart
export async function removeFromCart(cartItemId: string) {
  const client = await clientPromise;
  const db = client.db("bookstore");
  const result = await db
    .collection("cart")
    .deleteOne({ _id: new ObjectId(cartItemId) });
  return result;
}

// Clear all cart items for a specific user (optional)
export async function clearCart(userId: string) {
  const client = await clientPromise;
  const db = client.db("bookstore");
  const result = await db.collection("cart").deleteMany({ userId });
  return result;
}