import "./globals.css";
import {UserProvider} from "@/context/UserContext";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="min-h-screen">
        <UserProvider>{children}</UserProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
