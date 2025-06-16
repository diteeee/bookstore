import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import axios from "axios";
import Button from "@/components/shared/Button";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data);
        setPassword("");
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    try {
      const payload: any = {
        name: user.name,
      };
      if (password.trim() !== "") {
        payload.password = password;
      }
      const response = await axios.put("/api/user", payload);
      alert(response.data.message || "Profile updated successfully!");
      setIsEditing(false);
      setPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Failed to log out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-2xl"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
          My Profile
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Manage your account details and settings below.
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-6 w-full max-w-md">
          {error}
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
        <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
          Profile Details
        </h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 ${
                isEditing ? "focus:ring-blue-400" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 border rounded-lg placeholder-gray-400 text-gray-800 bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter new password" : "********"}
              className={`w-full px-4 py-2 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 ${
                isEditing ? "focus:ring-blue-400" : "bg-gray-100"
              }`}
            />
          </div>

          <div className="flex justify-between">
            {isEditing ? (
              <>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setPassword("");
                  }}
                  variant="tertiary"
                  text="Cancel"
                />
                <Button
                  onClick={handleSave}
                  variant="primary"
                  text="Save"
                />
              </>
            ) : (
              <Button
                text="Edit Profile"
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
