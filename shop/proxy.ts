import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname === "/shop/login") {
    const referer = req.headers.get("referer");
    const res = NextResponse.next();

    if (referer && referer.includes(req.nextUrl.origin)) {
      const path = referer.replace(req.nextUrl.origin, "");

      if (path.startsWith("/shop/register") || path.startsWith("/register")) {
        res.cookies.set("redirectAfterLogin", "/shop", { path: "/" });
      } else {
        res.cookies.set("redirectAfterLogin", path, { path: "/" });
      }
    } else {
      res.cookies.set("redirectAfterLogin", "/shop", { path: "/" });
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/login"],
};
