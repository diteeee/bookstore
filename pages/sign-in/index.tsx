import { getCsrfToken, signIn, getSession } from "next-auth/react";
import router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/Button";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (res?.error) {
            setError(res.error);
        } else if (res?.ok) {
            try {
                const session = await getSession();
                if (session?.user) {
                    localStorage.setItem("authToken", session.user.token || "");
                    localStorage.setItem("userRole", session.user.role || "");
                    alert("Successfully signed in!");
                    router.push("/");
                } else {
                    setError("Could not retrieve session details.");
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                setError("An error occurred while signing in.");
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
            {/* Header */}
            <div className="text-center mb-14 max-w-2xl mt-6">
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className={`w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            errors.email ? "border-red-500" : ""
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}

                    {/* Password Field */}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className={`w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                            errors.password ? "border-red-500" : ""
                        }`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            text="Sign In"
                            variant="tertiary"
                            onClick={() => {}}
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
