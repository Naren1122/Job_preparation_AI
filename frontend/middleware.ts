import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that require authentication
const protectedRoutes = ["/dashboard"];

// Define routes that authenticated users should be redirected from
const authRoutes = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // Check if user is authenticated (has a valid token)
  const isAuthenticated = !!token;

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // Check if the current route is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Check if the current route is an auth route (root, login or register)
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // 1. Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Optionally preserve the intended destination
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (_next/api/*)
     * - static files (favicon.ico, images, etc.)
     * - public files (_next/static/*)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
