"use client";

import { useUser } from "@/context/UserContext";

export function useAuthFetch() {
  const { refreshUser } = useUser();

  return async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, options);

    if (res.status === 401) {
      await refreshUser();
    }

    return res;
  };
}
