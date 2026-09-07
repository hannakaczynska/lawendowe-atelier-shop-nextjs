import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({
  email,
  message,
}: {
  email: string;
  message: string;
}) {
  const { data, error } = await resend.emails.send({
    from: "Lawendowe Atelier <no-reply@mail.lawendoweatelier.pl>",
    to: "hannakacz13@gmail.com",
    replyTo: email,
    subject: "Pytanie od klienta",
    text: message,
  });

  if (error) {
    console.error("Resend error:", error);

    return {
      ok: false as const,
      error,
    };
  }

  return {
    ok: true as const,
    data,
  };
}