// pages/api/auth/[...nextauth].ts

import { getUser } from "@/api/services/User";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";

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
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
