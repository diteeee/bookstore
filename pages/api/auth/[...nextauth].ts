// pages/api/auth/[...nextauth].ts

import { getUser } from "@/api/services/User";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUser(credentials?.email!);
        if (!user) throw new Error("Email nuk ekziston");

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Fjalëkalimi nuk është i saktë");

        // Return user data along with a mock token
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role, // <-- add role here
          emailVerified: user.emailVerified ?? null,
          token: `mock-token-${user._id}` // Replace with actual token if available
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt" as "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;  // <--- add role here
        token.token = user.token; // Add token from user object
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;   // <--- add role here
      session.user.token = token.token; // Attach token to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
