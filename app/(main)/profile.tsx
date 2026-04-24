import { Card } from "@/components/ui/Card";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  ChevronRight,
  Fingerprint,
  Languages,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react-native";
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ICON_COLOR = "#1A1C1C";
const CHEVRON = "#71717A";

export default function ProfileScreen() {
  const { userEmail, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
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

      <View className="flex-row items-center px-6 py-4 bg-white border-b border-border">
        <View className="w-8" />
        <Text className="flex-1 text-center text-sm font-jakarta-bold text-foreground tracking-widest uppercase">
          Settings
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 pb-12" showsVerticalScrollIndicator={false}>
        <Text className="text-[10px] font-manrope-bold tracking-widest text-muted px-6 pt-8 pb-3 uppercase">
          Account
        </Text>
        <Card className="mx-6" noPadding>
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-border active:bg-elevated rounded-t-3xl"
            onPress={() => Alert.alert("Profile", userEmail ?? "Not signed in")}
          >
            <User size={22} color={ICON_COLOR} strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Edit Profile
            </Text>
            <ChevronRight size={20} color={CHEVRON} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-border active:bg-elevated"
            onPress={() =>
              Alert.alert("Security", "Password change dialog would open here.")
            }
          >
            <Lock size={22} color={ICON_COLOR} strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Change Password
            </Text>
            <ChevronRight size={20} color={CHEVRON} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 active:bg-elevated rounded-b-3xl">
            <Languages size={22} color={ICON_COLOR} strokeWidth={2} />
            <View className="flex-1 ml-4">
              <Text className="text-base font-manrope-bold text-foreground">
                Language
              </Text>
              <Text className="text-xs font-manrope-semibold text-muted mt-0.5">
                English (US)
              </Text>
            </View>
            <ChevronRight size={20} color={CHEVRON} strokeWidth={2} />
          </TouchableOpacity>
        </Card>

        <Text className="text-[10px] font-manrope-bold tracking-widest text-muted px-6 pt-8 pb-3 uppercase">
          Notifications
        </Text>
        <Card className="mx-6" noPadding>
          <TouchableOpacity className="flex-row items-center p-4 border-b border-border active:bg-elevated rounded-t-3xl">
            <Bell size={22} color={ICON_COLOR} strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Push Notifications
            </Text>
            <ChevronRight size={20} color={CHEVRON} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 active:bg-elevated rounded-b-3xl">
            <Mail size={22} color={ICON_COLOR} strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Email Alerts
            </Text>
            <ChevronRight size={20} color={CHEVRON} strokeWidth={2} />
          </TouchableOpacity>
        </Card>

        <Text className="text-[10px] font-manrope-bold tracking-widest text-muted px-6 pt-8 pb-3 uppercase">
          Security
        </Text>
        <Card className="mx-6" noPadding>
          <TouchableOpacity className="flex-row items-center p-4 border-b border-border active:bg-elevated rounded-t-3xl">
            <Fingerprint size={22} color={ICON_COLOR} strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Biometric Login
            </Text>
            <ChevronRight size={20} color={CHEVRON} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 active:bg-elevated rounded-b-3xl">
            <ShieldCheck size={22} color={ICON_COLOR} strokeWidth={2} />
            <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
              Two-Factor Authentication
            </Text>
            <ChevronRight size={20} color={CHEVRON} strokeWidth={2} />
          </TouchableOpacity>
        </Card>

        <TouchableOpacity
          className="flex-row items-center justify-center mx-6 mt-10 py-4 rounded-full border border-border bg-white active:opacity-90"
          onPress={handleSignOut}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <LogOut size={20} color="#93001B" strokeWidth={2} />
          <Text className="text-sm font-manrope-bold text-primary ml-3 tracking-widest uppercase">
            Sign out
          </Text>
        </TouchableOpacity>

        <Text className="text-[10px] font-manrope-bold tracking-widest text-muted text-center mt-8 mb-6 uppercase">
          {userEmail ? `${userEmail} · ` : ""}KIA CONNECT V4.12.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
