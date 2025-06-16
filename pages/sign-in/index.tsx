import { getCsrfToken, signIn } from "next-auth/react";
import router from "next/router";
import { useState } from "react";
import Button from "@/components/shared/Button";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        setError("");
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (res?.error) {
            setError(res.error);
        } else if (res?.url) {
            router.push("/");
        }
    };

    return (
        <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
            {/* Header */}
            <div className="text-center mb-14 max-w-2xl">
                <h1 className="text-5xl font-serif font-extrabold text-gray-800 mb-6">
                    Sign In
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Access your account by logging in below.
                </p>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-2xl">
                <h2 className="text-lg font-serif font-bold text-gray-800 mb-4">
                    Enter Your Credentials
                </h2>
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            text="Sign In"
                            variant="tertiary"
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

SignIn.getInitialProps = async (context: any) => {
    return {
        csrfToken: await getCsrfToken(context),
    };
};
SignIn.displayName = "Sign In | My Application";
