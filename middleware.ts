import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Get the token from NextAuth (JWT)
  const token = await getToken({ req, secret });

  // Get requested pathname
  const { pathname } = req.nextUrl;

  // Allow public paths like sign-in, API routes, static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/sign-in"
  ) {
    return NextResponse.next();
  }

  // If no token, redirect to sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Example: Protect admin routes
  if (pathname.startsWith("/admin")) {
    // Check role
    if (token.role !== "admin") {
      // Redirect non-admin users to homepage or 403 page
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  console.log("Middleware triggered for:", req.nextUrl.pathname);

  // If everything is fine, continue
  return NextResponse.next();
}
