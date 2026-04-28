import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { routes } from "@/constants/routes";
import { cardShadowStyle } from "@/constants/shadows";
import { VEHICLES } from "@/data/mockData";
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
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AVATAR_URI =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80";

function displayNameFromEmail(email: string | null): string {
  if (!email) return "Member";
  const local = email.split("@")[0] ?? "Member";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

export default function ProfileScreen() {
  const { userEmail, signOut } = useAuth();
  const primary = VEHICLES[0];

  const totalDistance = VEHICLES.reduce((acc, vehicle) => {
    const mileageStr = vehicle.mileage || "";
    const num = parseInt(mileageStr.replace(/[^0-9]/g, ""), 10) || 0;
    return acc + num;
  }, 0);
  const formattedTotalDistance =
    totalDistance > 0 ? `${totalDistance.toLocaleString("en-US")} km` : "—";

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          signOut();
          router.replace(routes.login);
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

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
        <View className="items-center px-6 pt-8 pb-6">
          <View
            className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-elevated"
            style={cardShadowStyle}
          >
            <Image
              source={{ uri: AVATAR_URI }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-jakarta-extrabold text-foreground mt-5">
            {displayNameFromEmail(userEmail)}
          </Text>
          <View className="mt-3 bg-foreground px-4 py-2 rounded-full border border-border">
            <Text className="text-[10px] font-manrope-bold text-white tracking-widest">
              PLATINUM MEMBER
            </Text>
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
              {primary?.lastService ?? "Schedule"}
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
          <Button
            label="Logout"
            variant="danger"
            className="w-full rounded-2xl"
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
