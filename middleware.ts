import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const supabaseToken = req.cookies.get("sb-access-token")?.value;

  // Jeśli brak tokena → redirect do logowania
  if (!supabaseToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Pobieramy rolę z cookie (ustawisz ją w layout)
  const role = req.cookies.get("role")?.value;

  const pathname = req.nextUrl.pathname;

  // ADMIN → tylko /admin/*
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }

  // USER → tylko /user/*
  if (pathname.startsWith("/user")) {
    if (role !== "user") {
      return NextResponse.redirect(new URL("/admin/tickets", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
  ],
};
