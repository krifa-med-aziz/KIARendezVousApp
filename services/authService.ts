import * as SecureStore from "expo-secure-store";

const KEYCLOAK_URL =
  "http://192.168.100.74:8080/realms/kia-app/protocol/openid-connect/token";

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
  ) => {
    // Step 1 — admin token
    const adminTokenRes = await fetch(
      "http://192.168.100.74:8080/realms/master/protocol/openid-connect/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "password",
          client_id: "admin-cli",
          username: "admin",
          password: "admin",
        }).toString(),
      },
    );

    const adminTokenBody = await adminTokenRes.json();

    if (!adminTokenRes.ok) {
      throw new Error(
        adminTokenBody.error_description ?? "Could not get admin token",
      );
    }

    const adminToken = adminTokenBody.access_token;

    // Step 2 — create user
    const createRes = await fetch(
      "http://192.168.100.74:8080/admin/realms/kia-app/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          email,
          username: email,
          firstName,
          lastName,
          enabled: true,
          emailVerified: true,
          credentials: [
            { type: "password", value: password, temporary: false },
          ],
        }),
      },
    );

    if (!createRes.ok) {
      const err = await createRes.json();
      throw new Error(err.errorMessage ?? "Registration failed");
    }

    // Step 3 — login
    await authService.login(email, password);
  },
};
