"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  authenticated: boolean | null; // null = loading
  userId: number | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const refreshUser = async () => {
    try {
      console.log("Refreshing user info...");
      const res = await fetch("/api/me");

      if (!res.ok) {
        console.error("Failed to fetch user info:", res.statusText);
        setAuthenticated(false);
        setUserId(null);
        return;
      }

      const data = await res.json();
      console.log("User info response:", data);
      setAuthenticated(data.authenticated);
      setUserId(data.userId ?? null);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setAuthenticated(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ authenticated, userId, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    console.error("useUser must be used within a UserProvider");
    return { authenticated: null, userId: null, refreshUser: async () => {} };
  }
  return context;
}
