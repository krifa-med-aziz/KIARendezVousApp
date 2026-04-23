import React, { createContext, useCallback, useMemo, useState } from "react";

export type AuthContextValue = {
  userEmail: string | null;
  signIn: (email: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const signIn = useCallback((email: string) => {
    setUserEmail(email.trim() || "driver@kia.app");
  }, []);

  const signOut = useCallback(() => {
    setUserEmail(null);
  }, []);

  const value = useMemo(
    () => ({ userEmail, signIn, signOut }),
    [userEmail, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
