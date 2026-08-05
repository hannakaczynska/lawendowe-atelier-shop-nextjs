import { NextResponse } from "next/server";

export async function POST() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    return NextResponse.json(
      { message: "Wersja demonstracyjna — wylogowywanie jest wyłączone." },
      { status: 403 },
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("redirectAfterLogin", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
