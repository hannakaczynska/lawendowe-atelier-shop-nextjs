import { NextResponse } from "next/server";
import { Resend } from "resend";
import { subscribeToBrevo } from "@/app/api/_utils/brevo/brevoSubscribe";
import { verifyHcaptcha } from "@/app/api/_utils/hcaptcha/verifyHcaptcha";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const hcaptcha = await verifyHcaptcha(body.hcaptcha);
    if (!hcaptcha.ok) {
      return NextResponse.json(
        { message: hcaptcha.message || "Niepoprawna weryfikacja hCaptcha" },
        { status: 400 },
      );
    }

    if (body.topic === "question") {
      //Resend try catch (seperate endpoint)
      await resend.emails.send({
        from: "Lawendowe Atelier <no-reply@mail.lawendoweatelier.pl>",
        to: "hannakacz13@gmail.com",
        replyTo: body.email,
        subject: "Pytanie od klienta",
        text: body.message,
      });

      if (body.shopNotify) {
        const res = await subscribeToBrevo(body.email, body.name, [4]);
        if (!res.ok) {
          console.error("Failed to subscribe to Brevo:", res.error);
        }
      }
      return NextResponse.json({
        ok: true,
        message: "Wiadomość została wysłana",
      });
    }

    if (body.topic === "notify") {
      //[4] is the ID of the Brevo list for notifications
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
