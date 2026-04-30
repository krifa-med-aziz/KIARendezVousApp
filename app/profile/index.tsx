import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { routes } from "@/constants/routes";
import { cardShadowStyle } from "@/constants/shadows";
import type { AuthUser } from "@/context/AuthContext";
import { getVehicles } from "@/lib/api/kiaApi";
import type { Vehicle } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  Calendar,
  Car,
  ChevronRight,
  Gauge,
  Settings,
  Wrench,
} from "lucide-react-native";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

function displayNameFromEmail(email: string | null): string {
  if (!email) return "Member";
  const local = email.split("@")[0] ?? "Member";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

function displayName(user: AuthUser | null): string {
  if (!user) return "Member";
  if (user.name?.trim()) return user.name.trim();
  if (user.preferredUsername?.trim()) return user.preferredUsername.trim();
  return displayNameFromEmail(user.email);
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getVehicles();
        if (mounted) setVehicles(data);
      } catch {
        if (mounted) setVehicles([]);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const primary = vehicles[0];
  const totalDistance = useMemo(
    () =>
      vehicles.reduce((acc, vehicle) => {
        const mileageStr = vehicle.mileage || "";
        const num = parseInt(mileageStr.replace(/[^0-9]/g, ""), 10) || 0;
        return acc + num;
      }, 0),
    [vehicles],
  );
  const formattedTotalDistance =
    totalDistance > 0 ? `${totalDistance.toLocaleString("en-US")} km` : "—";

  const memberIdShort =
    user?.sub && user.sub.length > 12
      ? `${user.sub.slice(0, 8)}…${user.sub.slice(-4)}`
      : (user?.sub ?? "—");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View className="flex-row items-center justify-center px-6 py-4 bg-white border-b border-border">
        <Text className="text-sm font-jakarta-bold text-foreground tracking-widest uppercase">
          KIA CONNECT
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-8 pb-6">
          <View
            className="bg-white rounded-3xl p-6 border border-border"
            style={cardShadowStyle}
          >
            <Text className="text-2xl font-jakarta-extrabold text-foreground">
              {displayName(user)}
            </Text>
            {user?.email ? (
              <Text className="text-sm font-manrope text-muted mt-2">
                {user.email}
              </Text>
            ) : null}
            <View className="mt-4 pt-4 border-t border-border">
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                Member ID
              </Text>
              <Text className="text-xs font-manrope text-foreground">
                {memberIdShort}
              </Text>
            </View>
            <View className="mt-4 bg-foreground self-start px-4 py-2 rounded-full border border-border">
              <Text className="text-[10px] font-manrope-bold text-white tracking-widest">
                PLATINUM MEMBER
              </Text>
            </View>
          </View>
        </View>

        <Text className="text-[10px] font-manrope-bold tracking-widest text-muted px-6 pb-3 uppercase">
          Vehicle status
        </Text>
        <View className="flex-row px-6 gap-3 mb-8">
          <View
            className="flex-1 bg-white rounded-3xl p-5 border border-border"
            style={cardShadowStyle}
          >
            <Gauge size={20} color="#93001B" strokeWidth={2} />
            <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mt-4 mb-1">
              Total distance
            </Text>
            <Text className="text-lg font-jakarta-extrabold text-foreground">
              {formattedTotalDistance}
            </Text>
          </View>
          <View
            className="flex-1 bg-white rounded-3xl p-5 border border-border"
            style={cardShadowStyle}
          >
            <Wrench size={20} color="#93001B" strokeWidth={2} />
            <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mt-4 mb-1">
              Next service
            </Text>
            <Text className="text-lg font-jakarta-extrabold text-foreground">
              {primary?.createdAt
                ? new Date(primary.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "Schedule"}
            </Text>
          </View>
        </View>

        <Text className="text-[10px] font-manrope-bold tracking-widest text-muted px-6 pb-3 uppercase">
          Management
        </Text>
        <Card className="mx-6" noPadding>
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-border active:bg-elevated rounded-t-3xl"
            onPress={() => router.push("/(main)/vehicles")}
          >
            <Car size={22} color="#1A1C1C" strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              My Vehicles
            </Text>
            <ChevronRight size={20} color="#71717A" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center p-4 active:bg-elevated rounded-b-3xl"
            onPress={() => router.push("/(main)/bookings")}
          >
            <Calendar size={22} color="#1A1C1C" strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Appointment History
            </Text>
            <ChevronRight size={20} color="#71717A" strokeWidth={2} />
          </TouchableOpacity>
        </Card>

        <Text className="text-[10px] font-manrope-bold tracking-widest text-muted px-6 pt-8 pb-3 uppercase">
          App settings
        </Text>
        <Card className="mx-6" noPadding>
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-border active:bg-elevated rounded-t-3xl"
            onPress={() => router.push(routes.notifications)}
          >
            <Bell size={22} color="#1A1C1C" strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Notifications
            </Text>
            <ChevronRight size={20} color="#71717A" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center p-4 active:bg-elevated rounded-b-3xl"
            onPress={() => router.push(routes.settings)}
          >
            <Settings size={22} color="#1A1C1C" strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Settings
            </Text>
            <ChevronRight size={20} color="#71717A" strokeWidth={2} />
          </TouchableOpacity>
        </Card>

        <View className="px-6 mt-8">
          <PrimaryButton
            label="Logout"
            className="w-full rounded-2xl"
            onPress={() => setLogoutOpen(true)}
          />
        </View>
      </ScrollView>

      <ConfirmModal
        visible={logoutOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        destructive
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          signOut();
          router.replace(routes.login);
        }}
      />
    </SafeAreaView>
  );
}
