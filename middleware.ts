import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

// Public pages accessible without authentication
const publicPaths = ["/", "/contact", "/about", "/blogs", "/news", "/sign-in", "/sign-up", "/blogs/special"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow API, _next, static files, and public pages without authentication
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    publicPaths.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Check for token
  const token = await getToken({ req, secret });

  // If no token, redirect to sign-in
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Protect admin routes (only admin allowed)
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect create and update routes (only admin allowed)
  if ((pathname.startsWith("/create") || pathname.startsWith("/update")) && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow authenticated users to continue
  return NextResponse.next();
}
