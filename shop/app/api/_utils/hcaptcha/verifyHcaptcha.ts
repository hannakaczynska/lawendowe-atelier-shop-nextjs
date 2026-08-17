const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET_KEY;

export async function verifyHcaptcha(token: string) {
  if (!token) {
    return { ok: false, message: "Brak tokenu hCaptcha" };
  }
  try {
    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${HCAPTCHA_SECRET}&response=${token}`,
    });

    const data = await res.json();

    if (!data.success) {
      console.error("hCaptcha verification failed:", data);
      return { ok: false, message: "Niepoprawna weryfikacja hCaptcha" };
    }
    return { ok: true };
  } catch (error) {
    console.error("hCaptcha verification error:", error);
    return { ok: false, message: "Błąd weryfikacji hCaptcha" };
  }
}
