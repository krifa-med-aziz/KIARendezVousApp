const API_BASE_URL = "http://localhost:3000";
const DEFAULT_AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.dev-signature";

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
};

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }
  if (!headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${DEFAULT_AUTH_TOKEN}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
    });
  } catch (error) {
    throw new ApiError("Network request failed", 0, error);
  }

  let payload: ApiEnvelope<T> | null = null;
  try {
    payload = (await response.json()) as ApiEnvelope<T>;
  } catch {
    payload = null;
  }

  if (!response.ok || !payload?.success) {
    const message =
      payload?.message || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload?.errors);
  }

  if (typeof payload.data === "undefined") {
    throw new ApiError("Malformed API response: missing data", response.status);
  }

  return payload.data;
}

