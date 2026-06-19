import { NextResponse } from "next/server";
import { verifyUserToken } from "@/app/api/_utils/auth/verifyUser";

const BASE_URL = process.env.WOOCOMMERCE_URL;

export async function POST(req: Request) {
  try {
    const { ok, token } = await verifyUserToken(req);

    if (!ok || !token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { current_password, new_password } = await req.json();

    if (!current_password || !new_password) {
      return NextResponse.json(
        { error: "Brak wymaganych pól." },
        { status: 400 },
      );
    }

    // Validate password strength
    if (new_password.length < 8) {
      return NextResponse.json(
        { message: "Hasło musi mieć co najmniej 8 znaków" },
        { status: 400 },
      );
    }

    const hasLower = /[a-z]/.test(new_password);
    const hasUpper = /[A-Z]/.test(new_password);
    const hasDigit = /[0-9]/.test(new_password);

    if (!hasLower || !hasUpper || !hasDigit) {
      return NextResponse.json(
        { message: "Hasło musi zawierać małą literę, dużą literę i cyfrę" },
        { status: 400 },
      );
    }

    // fetch the current user data from WordPress to get the user ID
    const wpUserRes = await fetch(
      `${BASE_URL}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!wpUserRes.ok) {
      return NextResponse.json(
        { message: "Nie udało się pobrać danych użytkownika." },
        { status: 400 },
      );
    }
    const wpUser = await wpUserRes.json();
    const userId = wpUser.id;

    // 2. Verify the current password (WordPress requires this)
    const verifyRes = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: wpUser.username,
        password: current_password,
      }),
    });

    if (!verifyRes.ok) {
      return NextResponse.json(
        { message: "Aktualne hasło jest nieprawidłowe." },
        { status: 400 },
      );
    }

    // 3. Set the new password
    const updateRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: new_password,
      }),
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      return NextResponse.json(
        { message: "Nie udało się zmienić hasła.", details: err },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Password change error:", err);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera", details: String(err) },
      { status: 500 },
    );
  }
}
