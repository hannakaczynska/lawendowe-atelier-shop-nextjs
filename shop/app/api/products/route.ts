import { NextResponse } from "next/server";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function GET() {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/wc/v3/products?consumer_key=${CK}&consumer_secret=${CS}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products from WooCommerce" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}













// import { NextResponse } from "next/server";

// export async function GET() {
//   const baseUrl = process.env.WOOCOMMERCE_URL;
//   console.log("Fetching products from WooCommerce API at:", baseUrl);
//   const key = process.env.WOOCOMMERCE_KEY;
//   console.log("Using WooCommerce consumer key:", key ? "****" : "Not set");
//   const secret = process.env.WOOCOMMERCE_SECRET;
//   console.log(
//     "Using WooCommerce consumer secret:",
//     secret ? "****" : "Not set",
//   );

//   const auth = Buffer.from(`${key}:${secret}`).toString("base64");

//   const res = await fetch(`${baseUrl}/wp-json/wc/v3/products`, {
//     headers: {
//       Authorization: `Basic ${auth}`,
//     },
//   });
//   console.log("WooCommerce API response status:", res.status);
//   const text = await res.text();

//   if (!res.ok) {
//     return Response.json(
//       {
//         error: "WooCommerce API error",
//         status: res.status,
//         body: text,
//       },
//       { status: res.status },
//     );
//   }

//   return Response.json(JSON.parse(text));

  // const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${key}&consumer_secret=${secret}`;

  // const res = await fetch(url, {
  //   method: "GET",
  //   cache: "no-store",
  // });

  // console.log("WooCommerce API response status:", res.status);

  // if (!res.ok) {
  //   return NextResponse.json(
  //     { error: "Failed to fetch products" },
  //     { status: res.status }
  //   );
  // }

  // const data = await res.json();

  // return NextResponse.json(data);
// }
