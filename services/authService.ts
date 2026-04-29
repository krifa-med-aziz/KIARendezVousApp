import * as SecureStore from "expo-secure-store";

const KEYCLOAK_URL =
  "http://192.168.100.74:8080/realms/kia-app/protocol/openid-connect/token";
const API_BASE = "http://192.168.100.74:3000";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await fetch(KEYCLOAK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: "kia-mobile",
        username: email,
        password,
      }).toString(),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error_description ?? "Login failed");
    }

    const { access_token, refresh_token } = await res.json();
    await SecureStore.setItemAsync("access_token", access_token);
    await SecureStore.setItemAsync("refresh_token", refresh_token);
    return { access_token };
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
  },

  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
  ) => {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
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
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
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
