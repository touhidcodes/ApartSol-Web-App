import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/auth"];
const commonPrivateRoutes = [
  "/dashboard/profile",
  "/dashboard/change-password",
  "^/properties/add$",
  /^\/booking\/[^/].+$/,
  /^\/review\/[^/].+$/,
];
const roleBasedPrivateRoutes = {
  USER: [
    /^\/dashboard\/user\/overview/,
    /^\/dashboard\/user\/bookings/,
    /^\/dashboard\/user\/listings/,
    /^\/dashboard\/user\/reviews/,
    /^\/dashboard\/user\/invoice\/[^\/]+/,
    /^\/checkout\/.+$/,
    /^\/checkout\/success/,
    /^\/checkout\/failed/,
  ],
  ADMIN: [
    /^\/dashboard\/admin\/overview/,
    /^\/dashboard\/admin\/users/,
    /^\/dashboard\/admin\/listings/,
    /^\/dashboard\/admin\/bookings/,
    /^\/dashboard\/admin\/reviews/,
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
      return NextResponse.redirect(new URL("/auth", request.url));
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
    "/auth",
    "/properties/add",
    "/dashboard/:path*",
    "/booking/:path*",
    "/checkout/:path*",
    "/review/:path*",
  ],
};
