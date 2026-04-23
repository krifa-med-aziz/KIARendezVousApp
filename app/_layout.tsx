import { AuthProvider } from "@/context/AuthContext";
import "../global.css";
import { Stack } from "expo-router";
import { VehicleProvider } from "@/context/VehicleContext";
import { AppointmentProvider } from "@/context/AppointmentContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <AppointmentProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AppointmentProvider>
      </VehicleProvider>
    </AuthProvider>
  );
}
