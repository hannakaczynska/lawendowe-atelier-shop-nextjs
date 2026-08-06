import { NextResponse } from "next/server";
import { Resend } from "resend";

const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);
const BREVO_API_KEY = process.env.BREVO_API_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.hcaptcha) {
      return NextResponse.json(
        { message: "Brak tokenu hCaptcha" },
        { status: 400 },
      );
    }

    const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${HCAPTCHA_SECRET}&response=${body.hcaptcha}`,
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { message: "Niepoprawna weryfikacja hCaptcha" },
        { status: 400 },
      );
    }

    if (body.topic === "question") {
      await resend.emails.send({
        from: "Lawendowe Atelier <no-reply@mail.lawendoweatelier.pl>",
        to: "hannakacz13@gmail.com",
        replyTo: body.email,
        subject: "Pytanie od klienta",
        text: body.message,
      });
    }

    if (body.topic === "notify") {
      const newContact = {
        email: body.email,
        attributes: {
          FNAME: body.name,
        },
        listIds: [4],
      };

      console.log("New contact to add:", newContact);
    }

    return NextResponse.json({
      ok: true,
      message: "Wiadomość została wysłana",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił błąd podczas wysyłania wiadomości" },
      { status: 500 },
    );
  }
}
