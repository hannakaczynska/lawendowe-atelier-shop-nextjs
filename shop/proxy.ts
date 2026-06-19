import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  // 1. PROTECTED ROUTES
  if (url.pathname.startsWith("/shop/account")) {
    const token = req.cookies.get("auth_token");

    if (!token) {
      return NextResponse.redirect(new URL("/shop/login", req.url));
    }
    const verify = await fetch(`${req.nextUrl.origin}/api/me`, {
      headers: {
        Cookie: `auth_token=${token.value}`,
      },
    });

    if (!verify.ok) {
      return NextResponse.redirect(new URL("/shop/login", req.url));
    }
  }
  
  // 2. REDIRECT AFTER LOGIN LOGIC
  if (url.pathname === "/shop/login") {

    if (req.cookies.has("auth_token")) {
      return NextResponse.redirect(new URL("/shop/account", req.url));
    }

    const referer = req.headers.get("referer");
    const res = NextResponse.next();

    if (referer && referer.includes(req.nextUrl.origin)) {
      const path = referer.replace(req.nextUrl.origin, "");

      if (
        path.startsWith("/shop/register") ||
        path.startsWith("/register") ||
        path.startsWith("/shop/verify") ||
        path.startsWith("/shop/verify-email") ||
        path.startsWith("/shop/resend-verification") ||
        path.startsWith("/shop/reset-password") ||
        path.startsWith("/shop/forgot-password") ||
        path.startsWith("/shop/account")
      ) {
        res.cookies.set("redirectAfterLogin", "/shop", { path: "/" });
      } else {
        res.cookies.set("redirectAfterLogin", path, { path: "/" });
      }
    } else {
      res.cookies.set("redirectAfterLogin", "/shop", { path: "/" });
    }

    return res;
  }

  if (url.pathname === "/shop/register") {
    if (req.cookies.has("auth_token")) {
      return NextResponse.redirect(new URL("/shop/account", req.url));
    }
  }
    
  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/:path*"],
};
