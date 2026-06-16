import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.WOOCOMMERCE_URL;
const WP_ADMIN_USER = process.env.WP_ADMIN_USER;
const WP_ADMIN_PASS = process.env.WP_ADMIN_PASSWORD;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;

export async function POST(req: Request) {
  const { email, hcaptcha } = await req.json();

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Brak adresu email" },
      { status: 400 },
    );
  }

  if (!hcaptcha) {
    return NextResponse.json(
      { success: false, message: "Brak tokenu hCaptcha" },
      { status: 400 },
    );
  }

  // verify hCaptcha response
  const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${HCAPTCHA_SECRET}&response=${hcaptcha}`,
  });

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return NextResponse.json(
      { message: "Niepoprawna weryfikacja hCaptcha" },
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

  // fetch user by email
  const usersRes = await fetch(
    `${BASE_URL}/wp-json/wp/v2/users?search=${email}&context=edit`,
    {
      headers: { Authorization: `Bearer ${adminToken}` },
    },
  );

  const users = await usersRes.json();

  // always return success to avoid revealing if the email is registered or not
  if (!Array.isArray(users) || users.length === 0) {
    return NextResponse.json({ success: true });
  }

  const user = users[0];

  // save reset token in wp
  const resetToken = crypto.randomUUID();

  await fetch(`${BASE_URL}/wp-json/wp/v2/users/${user.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      meta: {
        password_reset_token: resetToken,
        password_reset_token_expires: Date.now() + 15 * 60 * 1000, // 15 minutes expiry
      },
    }),
  });

  // send reset email
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/shop/reset-password?token=${resetToken}`;

  await resend.emails.send({
    from: "Bezpieczeństwo <security@mail.lawendoweatelier.pl>",
    to: email,
    subject: "Reset hasła",
    html: `
      <p>Otrzymaliśmy prośbę o zresetowanie hasła.</p>
      <p>Kliknij poniższy link, aby ustawić nowe hasło:</p>
      <p><a href="${verifyUrl}">
        Zresetuj hasło
      </a></p>
      <p>Jeśli to nie Ty wysłałaś prośbę, zignoruj tę wiadomość.</p>
    `,
  });

  return NextResponse.json({ success: true });
}
