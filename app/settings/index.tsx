import { SettingsItem } from "@/components/SettingsItem";
import { SettingsSection } from "@/components/SettingsSection";
import { Button } from "@/components/ui/Button";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Lock,
  Mail,
  Moon,
  User,
} from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const logout = () => {
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

  const switchRight = (value: boolean, onValueChange: (v: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#E4E4E7", true: "#93001B" }}
      thumbColor="#FFFFFF"
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={() => router.back()}
        >
          <ChevronRight
            size={24}
            color="#93001B"
            strokeWidth={2}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
        <Text className="flex-1 text-center mr-6 text-sm font-jakarta-bold text-foreground tracking-widest uppercase">
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 18, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="Account">
          <SettingsItem
            label="Edit Profile"
            icon={User}
            onPress={() => router.push(routes.profileEdit)}
          />
          <View className="h-px bg-border mx-4" />
          <SettingsItem
            label="Change Password"
            icon={Lock}
            onPress={() => router.push(routes.settingsPassword)}
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsItem
            label="Push Notifications"
            icon={Bell}
            rightElement={switchRight(pushEnabled, setPushEnabled)}
          />
          <View className="h-px bg-border mx-4" />
          <SettingsItem
            label="Email Notifications"
            icon={Mail}
            rightElement={switchRight(emailEnabled, setEmailEnabled)}
          />
        </SettingsSection>

        <SettingsSection title="App Preferences">
          <SettingsItem
            label="Dark Mode"
            icon={Moon}
            rightElement={switchRight(darkMode, setDarkMode)}
          />
          <View className="h-px bg-border mx-4" />
          <SettingsItem
            label="Language"
            icon={Globe}
            onPress={() => Alert.alert("Language", "Coming soon.")}
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem
            label="Help Center"
            icon={HelpCircle}
            onPress={() => Alert.alert("Help Center", "Coming soon.")}
          />
          <View className="h-px bg-border mx-4" />
          <SettingsItem
            label="Contact Us"
            icon={Mail}
            onPress={() => Alert.alert("Contact Us", "support@kia.app")}
          />
        </SettingsSection>

        <SettingsSection title="Danger Zone">
          <View className="p-4">
            <Button
              label="Logout"
              variant="danger"
              className="w-full"
              onPress={logout}
            />
          </View>
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

