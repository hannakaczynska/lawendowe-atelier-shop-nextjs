import { NextResponse } from "next/server";
import { subscribeToBrevo } from "@/app/api/_utils/brevo/brevoSubscribe";
import { verifyHcaptcha } from "@/app/api/_utils/hcaptcha/verifyHcaptcha";
import { sendContactEmail } from "@/app/api/_utils/resend/sendContactEmail";
import { contactSchema } from "@/schemas/contactSchema";
import { rateLimit } from "@/app/api/_utils/security/rateLimit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { message: "Zbyt wiele prób, spróbuj ponownie za chwilę" },
        { status: 429 },
      );
    }

    //validate body with zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Nieprawidłowe dane formularza",
        },
        { status: 400 },
      );
    }

    const data = result.data;

    const hcaptcha = await verifyHcaptcha(data.hcaptcha);
    if (!hcaptcha.ok) {
      return NextResponse.json(
        { message: hcaptcha.message || "Niepoprawna weryfikacja hCaptcha" },
        { status: 400 },
      );
    }

    if (data.topic === "question") {
      const emailRes = await sendContactEmail({
        email: data.email,
        message: data.message,
      });

      if (!emailRes.ok) {
        return NextResponse.json(
          { message: "Nie udało się wysłać wiadomości" },
          { status: 500 },
        );
      }

      if (data.shopNotify) {
        //[4] is the ID of the Brevo list for notifications
        const res = await subscribeToBrevo(data.email, data.name, [4]);
        if (!res.ok) {
          console.error("Failed to subscribe to Brevo:", res.error);
        }
      }
      return NextResponse.json({
        ok: true,
        message: "Wiadomość została wysłana",
      });
    }

    if (data.topic === "notify") {
      //[4] is the ID of the Brevo list for notifications
      const res = await subscribeToBrevo(data.email, data.name, [4]);

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

    return NextResponse.json(
      { message: "Nieprawidłowy temat formularza" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd po stronie serwera" },
      { status: 500 },
    );
  }
}
