/**
 * Environment-based configuration.
 *
 * All runtime URLs are read from Expo public env vars set in your .env file.
 * Fallback values are for LOCAL DEVELOPMENT ONLY — never ship them to production.
 */

/** Backend REST API base URL */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

/** Keycloak OpenID Connect token endpoint */
export const KEYCLOAK_TOKEN_URL =
  process.env.EXPO_PUBLIC_KEYCLOAK_URL ??
  "http://localhost:8080/realms/kia-app/protocol/openid-connect/token";

/** Keycloak OAuth client ID for this mobile app */
export const KEYCLOAK_CLIENT_ID =
  process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID ?? "kia-mobile";

/** expo-secure-store key names */
export const STORAGE_KEYS = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
} as const;
