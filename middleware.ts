import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = req.cookies.get("sb-access-token"); // Supabase zapisuje token w cookie

  const isLoggedIn = !!session;
  const isAdminRoute = url.pathname.startsWith("/admin");
  const isUserRoute = url.pathname.startsWith("/user");
  const isPublicRoute = url.pathname.startsWith("/login");

  // Jeśli nie jest zalogowany → zawsze na login
  if (!isLoggedIn && !isPublicRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Jeśli jest zalogowany i wchodzi na /login → przekieruj do panelu
  if (isLoggedIn && isPublicRoute) {
    url.pathname = "/user/dashboard";
    return NextResponse.redirect(url);
  }

  // Admin routes — tu później dodamy sprawdzanie roli
  if (isAdminRoute) {
    return NextResponse.next();
  }

  // User routes
  if (isUserRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login"],
};

