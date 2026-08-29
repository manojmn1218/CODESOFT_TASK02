import { NextResponse } from "next/server";

export function middleware(request) {
  // Only protect /staff routes (except the login page)
  if (
    request.nextUrl.pathname.startsWith("/staff") &&
    !request.nextUrl.pathname.startsWith("/staff/login")
  ) {
    const session = request.cookies.get("staff-session");
    if (!session) {
      return NextResponse.redirect(new URL("/staff/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/staff/:path*"],
};
