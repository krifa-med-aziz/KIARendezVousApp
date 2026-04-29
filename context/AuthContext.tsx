import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { authService } from "@/services/authService";

export type AuthContextValue = {
  userEmail: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on app start
  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((token) => {
      if (token) {
        // Decode email from token payload (no verification needed here, just display)
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserEmail(payload.email ?? null);
        } catch {
          setUserEmail(null);
        }
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await authService.login(email, password);
    setUserEmail(email);
  }, []);

  const signOut = useCallback(async () => {
    await authService.logout();
    setUserEmail(null);
  }, []);

  const value = useMemo(
    () => ({ userEmail, isLoading, signIn, signOut }),
    [userEmail, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}