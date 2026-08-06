import { NextResponse } from "next/server";
import { Resend } from "resend";
import { subscribeToBrevo } from "@/app/api/_utils/brevo/brevoSubscribe";

const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

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

      return NextResponse.json({
        ok: true,
        message: "Wiadomość została wysłana",
      });
    }

    if (body.topic === "notify") {
      const res = await subscribeToBrevo(body.email, body.name, [4]);

      if (!res.ok) {
        return NextResponse.json(
          { message: "Nie udało się zapisać do listy" },
          { status: 500 },
        );
      }
      return NextResponse.json({
        ok: true,
        message: "Zapisano do listy powiadomień",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił błąd po stronie serwera" },
      { status: 500 },
    );
  }
}
