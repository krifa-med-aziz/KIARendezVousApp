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
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="flex-row items-center px-6 py-4 bg-surface border-b border-border">
        <View className="w-8" />
        <Text className="flex-1 text-sm font-bold tracking-widest text-text-primary text-center uppercase">
          Settings
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 pb-12" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Text className="text-[10px] font-bold tracking-widest text-text-muted px-6 pt-8 pb-3 uppercase">
          ACCOUNT
        </Text>
        <Card className="mx-6 p-1">
          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-border/50 active:bg-background rounded-t-xl"
            onPress={() => Alert.alert("Profile", userEmail ?? "Not signed in")}
          >
            <User size={22} color="#111827" />
            <Text className="flex-1 text-base font-bold text-text-primary ml-4">
              Edit Profile
            </Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-border/50 active:bg-background"
            onPress={() =>
              Alert.alert("Security", "Password change dialog would open here.")
            }
          >
            <Lock size={22} color="#111827" />
            <Text className="flex-1 text-base font-bold text-text-primary ml-4">
              Change Password
            </Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 active:bg-background rounded-b-xl border-t-0">
            <Languages size={22} color="#111827" />
            <View className="flex-1 ml-4">
              <Text className="text-base font-bold text-text-primary">
                Language
              </Text>
              <Text className="text-xs font-semibold text-text-muted mt-0.5">
                English (US)
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Notifications Section */}
        <Text className="text-[10px] font-bold tracking-widest text-text-muted px-6 pt-8 pb-3 uppercase">
          NOTIFICATIONS
        </Text>
        <Card className="mx-6 p-1">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-border/50 active:bg-background rounded-t-xl">
            <Bell size={22} color="#111827" />
            <Text className="flex-1 text-base font-bold text-text-primary ml-4">
              Push Notifications
            </Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 active:bg-background rounded-b-xl border-t-0">
            <Mail size={22} color="#111827" />
            <Text className="flex-1 text-base font-bold text-text-primary ml-4">
              Email Alerts
            </Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Security Section */}
        <Text className="text-[10px] font-bold tracking-widest text-text-muted px-6 pt-8 pb-3 uppercase">
          SECURITY
        </Text>
        <Card className="mx-6 p-1">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-border/50 active:bg-background rounded-t-xl">
            <Fingerprint size={22} color="#111827" />
            <Text className="flex-1 text-base font-bold text-text-primary ml-4">
              Biometric Login
            </Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 active:bg-background rounded-b-xl border-t-0">
            <ShieldCheck size={22} color="#111827" />
            <Text className="flex-1 text-base font-bold text-text-primary ml-4">
              Two-Factor Authentication
            </Text>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </Card>

        {/* Sign Out Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center mx-6 mt-10 h-14 rounded-xl border-2 border-primary/20 bg-primary-soft active:opacity-70 transition-all"
          onPress={handleSignOut}
        >
          <LogOut size={20} color="#E60012" />
          <Text className="text-sm font-bold text-primary ml-3 tracking-widest uppercase">
            SIGN OUT
          </Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <Text className="text-[10px] font-bold tracking-widest text-text-muted text-center mt-8 mb-6 uppercase">
          {userEmail ? `${userEmail} · ` : ""}KIA CONNECT V4.12.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
