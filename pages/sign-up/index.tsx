import useFetch from "hooks/useFetch";
import { User } from "@/api/models/User";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/shared/Button";

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const { post } = useFetch<User[]>("/api/auth/register");

    const handleSubmit = async () => {
        try {
            const res = await post(user);

            if (res?.error) {
                setError(res.error);
            } else {
                router.push("/sign-in");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
            {/* Header */}
            <div className="text-center mb-14 max-w-2xl">
                <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
                    Register
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Sign up to use our application.
                </p>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
                <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
                    User Details
                </h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                        {error}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end">
                    <Button
                        onClick={handleSubmit}
                        text="Register"
                        variant="tertiary"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}

SignUp.displayName = "Sign Up | My Application";
