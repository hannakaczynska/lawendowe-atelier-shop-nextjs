import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const WP_ADMIN_USER = process.env.WP_ADMIN_USER;
const WP_ADMIN_PASS = process.env.WP_ADMIN_PASSWORD;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Brak tokenu" },
      { status: 400 },
    );
  }

  // fetch admin token
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
      { status: 500 },
    );
  }

  const adminToken = tokenData.token;

  //fetch user by token
  const wpRes = await fetch(
    `${BASE_URL}/wp-json/email/v1/verify?token=${token}`,
  );

  const wpData = await wpRes.json();

  if (!wpRes.ok) {
    return NextResponse.json(
      { success: false, message: "Nieprawidłowy token" },
      { status: 400 },
    );
  }

  const userId = wpData.id;
  const emailFromToken = wpData.email;
  console.log("wpData", wpData);

  // fetch user data with admin token to check if email matches token
  const userRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users/${userId}?context=edit`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const userData = await userRes.json();

  if (!userRes.ok) {
    return NextResponse.json(
      { success: false, message: "Nie udało się pobrać danych użytkownika" },
      { status: 500 },
    );
  }

  const currentEmail = userData.email;
  console.log("User data", userData);
  console.log("Emails", currentEmail, emailFromToken);

  // check if email from token matches current email
  if (currentEmail !== emailFromToken) {
    return NextResponse.json(
      {
        success: false,
        message: "Email został zmieniony — link aktywacyjny jest nieważny",
      },
      { status: 400 },
    );
  }

  // meta update - set email_verified to true and clear token
  const updateRes = await fetch(`${BASE_URL}/wp-json/wp/v2/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      meta: {
        email_verified: true,
        email_verification_token: "",
      },
    }),
  });

  if (!updateRes.ok) {
    return NextResponse.json(
      { success: false, message: "Nie udało się zweryfikować emaila" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
