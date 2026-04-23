import { Card } from "@/components/ui/Card";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { userEmail, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-surface">
        <View className="w-8" />
        <Text className="flex-1 text-[18px] font-medium text-text text-center">
          Settings
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 pb-10" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Text className="text-[11px] font-semibold tracking-[1px] text-textSecondary px-6 pt-6 pb-3">
          ACCOUNT
        </Text>
        <Card className="mx-4 p-2 px-3">
          <TouchableOpacity
            className="flex-row items-center py-4 border-b border-inputBackground"
            onPress={() => Alert.alert("Profile", userEmail ?? "Not signed in")}
          >
            <Feather name="user" size={22} color="#1a1a1a" />
            <Text className="flex-1 text-[16px] font-normal text-text ml-4">
              Edit Profile
            </Text>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-4 border-b border-inputBackground"
            onPress={() =>
              Alert.alert("Security", "Password change — demo only.")
            }
          >
            <Feather name="lock" size={22} color="#1a1a1a" />
            <Text className="flex-1 text-[16px] font-normal text-text ml-4">
              Change Password
            </Text>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b-0">
            <MaterialIcons name="translate" size={22} color="#1a1a1a" />
            <View className="flex-1 ml-4">
              <Text className="text-[16px] font-normal text-text">
                Language
              </Text>
              <Text className="text-[12px] font-medium text-textMuted mt-0.5">
                English (US)
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>
        </Card>

        {/* Notifications Section */}
        <Text className="text-[11px] font-semibold tracking-[1px] text-textSecondary px-6 pt-6 pb-3">
          NOTIFICATIONS
        </Text>
        <Card className="mx-4 p-2 px-3">
          <TouchableOpacity className="flex-row items-center py-4 border-b border-inputBackground">
            <Feather name="bell" size={22} color="#1a1a1a" />
            <Text className="flex-1 text-[16px] font-normal text-text ml-4">
              Push Notifications
            </Text>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b-0">
            <Feather name="at-sign" size={22} color="#1a1a1a" />
            <Text className="flex-1 text-[16px] font-normal text-text ml-4">
              Email Alerts
            </Text>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>
        </Card>

        {/* Security Section */}
        <Text className="text-[11px] font-semibold tracking-[1px] text-textSecondary px-6 pt-6 pb-3">
          SECURITY
        </Text>
        <Card className="mx-4 p-2 px-3">
          <TouchableOpacity className="flex-row items-center py-4 border-b border-inputBackground">
            <MaterialCommunityIcons
              name="fingerprint"
              size={22}
              color="#1a1a1a"
            />
            <Text className="flex-1 text-[16px] font-normal text-text ml-4">
              Biometric Login
            </Text>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b-0">
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={22}
              color="#1a1a1a"
            />
            <Text className="flex-1 text-[16px] font-normal text-text ml-4">
              Two-Factor Authentication
            </Text>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>
        </Card>

        {/* Sign Out Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center mx-4 mt-8 py-4 rounded-full border border-primary bg-surface"
          onPress={() => {
            signOut();
            router.replace(routes.login);
          }}
        >
          <Feather name="log-out" size={20} color="#c41e3a" />
          <Text className="text-[14px] font-semibold text-primary ml-2.5 tracking-[0.5px]">
            SIGN OUT
          </Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <Text className="text-[12px] font-medium text-textMuted text-center mt-6">
          {userEmail ? `${userEmail} · ` : ""}KIA CONNECT V4.12.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
