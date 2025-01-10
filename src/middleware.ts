import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/api/utils/auth";

export async function middleware(req: NextRequest) {
  const unprotectedRoutes = ["/sign-in", "/sign-up"]; // Add more routes if needed

  // Check if the current path is unprotected
  const isUnprotected = unprotectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isUnprotected) {
    // Allow access to unprotected routes
    return NextResponse.next();
  }
  // Read Zustand state from cookies
  const tokenCookie = req.cookies.get("auth");
  if (tokenCookie) {
    // console.log(tokenCookie);

    const token = tokenCookie.value;
    const payload = await verifyToken(token);
    if (payload) {
      // Token is valid
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/sign-in", req.url));
}

// Apply the middleware to specific routes
export const config = {
  // Apply middleware to all routes except API routes and static files
  matcher: "/((?!_next|api|favicon.ico|assets).*)",
};
