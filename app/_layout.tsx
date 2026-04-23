import { AuthProvider } from "@/context/AuthContext";
import "../global.css";
import { Stack } from "expo-router";
import { VehicleProvider } from "@/context/VehicleContext";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <VehicleProvider>
          <AppointmentProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </AppointmentProvider>
        </VehicleProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
