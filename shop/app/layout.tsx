import { DeliveryProvider } from "@/context/DeliveryContext";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { getLocalShippingZone } from "@/lib/woo/getShipping";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const local = await getLocalShippingZone();
  return (
    <html lang="pl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="min-h-screen">
        <UserProvider>
          <DeliveryProvider local={local}>{children}</DeliveryProvider>
        </UserProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
