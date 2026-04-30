import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { authService } from "@/services/authService";

export type AuthUser = {
  email: string | null;
  name: string | null;
  preferredUsername: string | null;
  givenName: string | null;
  familyName: string | null;
  sub: string | null;
};

export type AuthContextValue = {
  user: AuthUser | null;
  /** @deprecated use user.email */
  userEmail: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

function decodeUserFromAccessToken(token: string | null): AuthUser | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as Record<
      string,
      unknown
    >;
    const email =
      typeof payload.email === "string"
        ? payload.email
        : typeof payload.preferred_username === "string"
          ? payload.preferred_username
          : null;
    const given =
      typeof payload.given_name === "string" ? payload.given_name : null;
    const family =
      typeof payload.family_name === "string" ? payload.family_name : null;
    const nameDirect = typeof payload.name === "string" ? payload.name : null;
    const nameFromParts =
      [given, family].filter(Boolean).join(" ").trim() || null;
    const name = nameDirect ?? nameFromParts;
    return {
      email,
      name,
      preferredUsername:
        typeof payload.preferred_username === "string"
          ? payload.preferred_username
          : null,
      givenName: given,
      familyName: family,
      sub: typeof payload.sub === "string" ? payload.sub : null,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("access_token").then((token) => {
      setUser(decodeUserFromAccessToken(token));
      setIsLoading(false);
    });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await authService.login(email, password);
    const token = await SecureStore.getItemAsync("access_token");
    setUser(decodeUserFromAccessToken(token));
  }, []);

  const signOut = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      userEmail: user?.email ?? null,
      isLoading,
      signIn,
      signOut,
    }),
    [user, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
