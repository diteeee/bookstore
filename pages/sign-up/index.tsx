import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useFetch from "hooks/useFetch";
import { User } from "@/api/models/User";
import Button from "@/components/shared/Button";

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
    const { post, loading, error } = useFetch<User[]>("/api/auth/register");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const { data: userData, error } = await post(data);

    if (error) {
        alert(error); // Show server-provided or default error message
    } else {
        alert("Registration successful!");
        router.push("/sign-in");
    }
};

  return (
    <div className="bg-gradient-to-b from-white to-cream-50 min-h-screen flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mt-6">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <div className="text-red-600 text-sm mb-2">
              {errors.name.message}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 mb-4 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <div className="text-red-600 text-sm mb-2">
              {errors.email.message}
            </div>
          )}
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
            className="w-full px-4 py-2 mb-6 border rounded-lg placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <div className="text-red-600 text-sm mb-2">
              {errors.password.message}
            </div>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              text="Register"
              variant="tertiary"
              onClick={() => {}}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

SignUp.displayName = "Sign Up | My Application";
