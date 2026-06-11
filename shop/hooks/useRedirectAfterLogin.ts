"use client";

import { useRouter } from "next/navigation";

export function useRedirectAfterLogin() {
  const router = useRouter();

  const redirect = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("redirectAfterLogin="));

    const raw = cookie?.split("=")[1] || "/shop";
    const target = decodeURIComponent(raw);

    document.cookie = "redirectAfterLogin=; Max-Age=0; path=/";

    router.push(target);
  };

  return { redirect };
}
