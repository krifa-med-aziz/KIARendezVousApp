import * as SecureStore from "expo-secure-store";
import { API_BASE_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_TOKEN_URL, STORAGE_KEYS } from "@/constants/env";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await fetch(KEYCLOAK_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: KEYCLOAK_CLIENT_ID,
        username: email,
        password,
      }).toString(),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error_description ?? "Login failed");
    }

    const { access_token, refresh_token } = await res.json();
    await SecureStore.setItemAsync(STORAGE_KEYS.accessToken, access_token);
    await SecureStore.setItemAsync(STORAGE_KEYS.refreshToken, refresh_token);
    return { access_token };
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.accessToken);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.refreshToken);
  },

  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
  ) => {
    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, email, password, firstName, lastName }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "Failed to send OTP");
    }
  },

  verifyOtp: async (phone: string, code: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error ?? "OTP verification failed");
    }
  },
};
