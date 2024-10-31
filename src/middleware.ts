import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = [
  "/dashboard/home",
  "/dashboard/profile",
  "/dashboard/change-password",
  "/post",
  /^\/booking\/[^/].+$/,
  /^\/review\/[^/].+$/,
];
const roleBasedPrivateRoutes = {
  USER: [
    /^\/dashboard\/my-bookings/,
    /^\/dashboard\/my-posts/,
    /^\/checkout\/.+$/,
    /^\/checkout\/success/,
    /^\/checkout\/cancel/,
  ],
  ADMIN: [
    /^\/dashboard\/all-user/,
    /^\/dashboard\/all-posts/,
    /^\/dashboard\/all-bookings/,
  ],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log("Middleware: Checking path:", pathname);

  // Get the access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  // console.log("access", accessToken);

  // If no access token is found and the route is public, allow access
  if (!accessToken) {
    // console.log("Middleware: No access token found");
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    accessToken &&
    commonPrivateRoutes.some((route) => pathname.match(route))
  ) {
    return NextResponse.next();
  }

  let decodedData: any = null;

  // Decode the JWT token to get user data
  if (accessToken) {
    decodedData = jwtDecode(accessToken);
  }

  const role = decodedData?.role?.toUpperCase();

  // Check if the user role matches the role-based routes
  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      // console.log(`Middleware: Access allowed for role ${role}`);
      return NextResponse.next();
    }
  }

  // If none of the conditions are met, redirect to home
  // console.log("Middleware: Redirecting to home");
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/post",
    "/dashboard/:path*",
    "/booking/:path*",
    "/checkout/:path*",
    "/review/:path*",
  ],
};
