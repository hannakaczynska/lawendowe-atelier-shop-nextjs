import { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  authenticated: boolean | null; // null = loading
  userId: number | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/me");

      if (!res.ok) {
        setAuthenticated(false);
        setUserId(null);
        return;
      }

      const data = await res.json();

      setAuthenticated(data.authenticated);
      setUserId(data.user?.id ?? null);
    } catch (error) {
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
