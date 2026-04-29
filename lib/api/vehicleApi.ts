import * as SecureStore from "expo-secure-store";
import type { ScanResult } from "@/types/vehicle";

const API_BASE = "http://192.168.100.74:3000";

export async function scanCarteGrise(imageUri: string): Promise<ScanResult> {
  const token = await SecureStore.getItemAsync("access_token");
  if (!token) throw new Error("Authentication token not found");

  const formData = new FormData();
  formData.append("image", {
    uri: imageUri,
    type: "image/jpeg",
    name: "carte-grise.jpg",
  } as any);

  const response = await fetch(`${API_BASE}/vehicles/scan-carte-grise`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to scan carte grise");
  }

  return data;
}

export async function createVehicle(payload: {
  name: string;
  plate: string;
  mileage: string;
  type: string;
  vin?: string;
  brand?: string;
  model?: string;
  dpmc?: string;
  ownerName?: string;
  cin?: string;
}): Promise<any> {
  const token = await SecureStore.getItemAsync("access_token");
  if (!token) throw new Error("Authentication token not found");

  const response = await fetch(`${API_BASE}/vehicles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to register vehicle");
  }

  return data;
}
