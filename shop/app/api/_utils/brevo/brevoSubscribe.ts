const BREVO_API_KEY = process.env.BREVO_API_KEY;

export async function subscribeToBrevo(
  email: string,
  name: string,
  listIdsArray: number[],
) {
  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY!,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name,
        },
        listIds: listIdsArray,
        emailBlacklisted: false,
        smsBlacklisted: false,
        updateEnabled: true,
      }),
    });

    if (!brevoRes.ok) {
      const error = await brevoRes.json();
      console.error("Brevo error:", error);
      return { ok: false, error };
    }

    return { ok: true };
  } catch (error) {
    console.error("API error:", error);
    return { ok: false, error };
  }
}
