import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodedToken } from "@/utils/jwt-decode";

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/dashboard/profile", "/post", /^\/booking\/.+$/];
const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/my-bookings/, /^\/dashboard\/my-posts/],
  ADMIN: [
    /^\/dashboard\/all-user/,
    /^\/dashboard\/all-flats/,
    /^\/dashboard\/all-bookings/,
    /^\/dashboard\/update-flats/,
    /^\/dashboard\/update-bookings/,
  ],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // If no access token is found and the route is public, allow access
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the access token is found and the route is common, allow access
  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let decodedData: any = null;

  // Decode the JWT token to get user data
  if (accessToken) {
    decodedData = decodedToken(accessToken);
  }

  const role = decodedData?.role?.toUpperCase();

  // Check if the user role matches the role-based routes
  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If none of the conditions are met, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/post",
    "/booking/:id*",
  ],
};
