import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, token } = await req.json();

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/shop/verify?token=${token}`;

  await resend.emails.send({
    from: "Sklep <no-reply@mail.lawendoweatelier.pl>",
    to: email,
    subject: "Potwierdź swój adres e‑mail",
    html: `
      <h2>Witaj!</h2>
      <p>Dziękujemy za rejestrację w naszym sklepie.</p>
      <p>Kliknij poniższy link, aby aktywować swoje konto:</p>
      <p><a href="${verifyUrl}">Aktywuj konto</a></p>
      <p>Jeśli to nie Ty zakładałaś/eś konto, zignoruj tę wiadomość.</p>
    `,
  });

  return NextResponse.json({ ok: true });
}

