const BASE_URL = process.env.WOOCOMMERCE_URL;

export async function verifyUserToken(req: Request) {
  console.log("Verifying user token...");
  console.log("base URL:", BASE_URL);
  const cookieHeader = req.headers.get("cookie");
  const token =
    cookieHeader
      ?.split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1] ?? null;


  if (!token) {
    console.log("No token found in cookies.");
    return { ok: false, token: null };
  }

  const validateRes = await fetch(
    `${BASE_URL}/wp-json/jwt-auth/v1/token/validate`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

   const validateData = await validateRes.json();


  if (!validateRes.ok || validateData?.data?.status !== 200) {
    return { ok: false, token: null };
  }

  return { ok: true, token };
}
