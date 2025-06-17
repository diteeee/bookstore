import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/shared/Button";

interface User {
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const [userRole, setUserRole] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const fetchUsers = useCallback(async () => {
    const res = await fetch("/api/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    } else {
      console.error("Failed to fetch users");
    }
  }, []);

  // Sync userRole from session or localStorage
  useEffect(() => {
    if (session?.user?.role) {
      setUserRole(session.user.role);
      if (session.user.role === "admin") {
        fetchUsers();
      }
    } else if (typeof window !== "undefined") {
      const roleFromStorage = localStorage.getItem("userRole");
      setUserRole(roleFromStorage);
      if (roleFromStorage === "admin") {
        fetchUsers();
      }
    }
  }, [session, fetchUsers]);

  const handleDelete = useCallback(async (email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) return;

    const res = await fetch(`/api/user/${encodeURIComponent(email)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchUsers();
    } else {
      alert("Failed to delete user");
    }
  }, [fetchUsers]);

  const saveEdit = useCallback(async (email: string) => {
    const res = await fetch(`/api/user/${encodeURIComponent(email)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (res.ok) {
      setEditingEmail(null);
      setEditData({});
      fetchUsers();
    } else {
      const errorData = await res.json();
      alert("Failed to update user: " + (errorData.error || res.statusText));
    }
  }, [editData, fetchUsers]);


  function startEditing(user: User) {
    setEditingEmail(user.email);
    setEditData({ name: user.name, role: user.role });
  }

  function cancelEditing() {
    setEditingEmail(null);
    setEditData({});
  }
  
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    signOut({ callbackUrl: "/sign-in" });
  };

  const userRows = useMemo(
    () =>
      users.map((user) => (
        <motion.li
          key={user.email}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-4 mb-3 shadow-sm hover:shadow-md"
        >
          <div className="flex flex-col flex-1 min-w-0">
            {editingEmail === user.email ? (
              <>
                <input
                  className="border border-black-300 rounded px-3 py-2 mb-1 max-w-xs text-black"
                  value={editData.name || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <p className="mb-1 text-gray-500 font-mono truncate">{user.email}</p>
                <select
                  className="border border-black-300 rounded px-3 py-2 mb-1 max-w-xs text-black"
                  value={editData.role || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, role: e.target.value })
                  }
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                <p className="text-sm text-gray-500">
                  Created: {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                </p>
              </>
            ) : (
              <>
                <h3 className="font-serif font-semibold text-lg truncate text-black">{user.name}</h3>
                <p className="text-gray-700 font-mono truncate">{user.email}</p>
                <p className="capitalize text-gray-600 font-medium">{user.role}</p>
                <p className="text-sm text-gray-500">
                  Created: {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                </p>
              </>
            )}
          </div>
          <div className="flex space-x-2 ml-4">
            {editingEmail === user.email ? (
              <>
                <Button text="Save" variant="tertiary" onClick={() => saveEdit(user.email)} />
                <Button text="Cancel" variant="secondary" onClick={cancelEditing} />
              </>
            ) : (
              <>
                <Button text="Edit" variant="tertiary" onClick={() => startEditing(user)} />
                <Button text="Delete" variant="danger" onClick={() => handleDelete(user.email)} />
              </>
            )}
          </div>
        </motion.li>
      )),
    [users, editingEmail, editData, prefersReducedMotion, handleDelete, saveEdit]
  );

  if (status === "loading") return <p className="p-6 text-center">Loading...</p>;
  if (!session || session.user?.role !== "admin") return null;

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen py-16 px-6 flex flex-col items-center">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 max-w-3xl mt-6"
      >
        <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome, <strong>{session.user.email}</strong>
        </p>
      </motion.div>

      <ul className="w-full max-w-4xl">{userRows.length ? userRows : <p className="text-center text-gray-700">No users found.</p>}</ul>

      <Button
        onClick={handleSignOut}
        text="Sign Out"
        variant="danger"
      />
    </div>
  );
}
