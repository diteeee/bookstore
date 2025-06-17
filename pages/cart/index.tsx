import Link from "next/link";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@/components/shared/Button";
import { motion } from "framer-motion";

interface CartItem {
  _id?: string;
  source: string; // "openLibrary" or "database"
  title: string;
  authorName?: string | string[];
  bookKey?: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cart items");

      const data = await response.json();
      setCartItems(data);
      console.log("cart items: ", cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCartItems();
}, []);

  const handleRemoveFromCart = async (id: string) => {
    const confirmed = confirm("Do you want to remove this item from the cart?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setCartItems((prev) => prev.filter((item) => item._id !== id));
      alert("Item removed from cart successfully!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl mt-8"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          Your Cart
        </h1>
      </motion.div>
      {loading ? (
        <CircularProgress />
      ) : cartItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col text-center"
            >
              <h2 className="text-lg font-serif font-bold text-gray-800 mb-3">
                {item.bookId.title}
              </h2>
              <p className="text-gray-500 mb-4 italic">
                {Array.isArray(item.authorName)
                  ? item.authorName.join(", ")
                  : item.bookId.body || "Unknown Author"}
              </p>
              <Button
                text="Remove from Cart"
                variant="danger"
                onClick={() => handleRemoveFromCart(item._id!)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg leading-relaxed">
          Your cart is empty. <Link href="/">Go back to browse books.</Link>
        </p>
      )}
    </div>
  );
}
