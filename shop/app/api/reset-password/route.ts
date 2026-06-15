import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const WP_ADMIN_USER = process.env.WP_ADMIN_USER;
const WP_ADMIN_PASS = process.env.WP_ADMIN_PASSWORD;

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { success: false, message: "Brak tokenu lub hasła" },
      { status: 400 }
    );
  }

  //fetch admin token
  const tokenRes = await fetch(`${BASE_URL}/wp-json/jwt-auth/v1/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: WP_ADMIN_USER,
      password: WP_ADMIN_PASS,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.token) {
    return NextResponse.json(
      { success: false, message: "Błąd autoryzacji admina" },
      { status: 500 }
    );
  }

  const adminToken = tokenData.token;

  //fetch user by reset token
  const usersRes = await fetch(
    `${BASE_URL}/wp-json/wp/v2/users?meta_key=password_reset_token&meta_value=${token}&context=edit`,
    {
      headers: { Authorization: `Bearer ${adminToken}` },
    }
  );

  const users = await usersRes.json();

  if (!Array.isArray(users) || users.length === 0) {
    return NextResponse.json(
      { success: false, message: "Nieprawidłowy token" },
      { status: 400 }
    );
  }

  const user = users[0];

  //fetch update user password
  const updateRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users/${user.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      password: password,
      meta: {
        password_reset_token: "",
      },
    }),
  });

  if (!updateRes.ok) {
    return NextResponse.json(
      { success: false, message: "Nie udało się ustawić hasła" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
