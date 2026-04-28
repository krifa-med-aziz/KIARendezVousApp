import { routes } from "@/constants/routes";
import { ChevronRight, Lock } from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function PasswordSettingsScreen() {
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
          Change Password
        </Text>
      </View>

      <View className="flex-1 px-6 pt-10">
        <View className="bg-white rounded-2xl border border-border p-6">
          <View className="w-12 h-12 rounded-2xl bg-badge-red border border-border items-center justify-center mb-4">
            <Lock size={22} color="#93001B" strokeWidth={2} />
          </View>
          <Text className="text-lg font-jakarta-extrabold text-foreground mb-2">
            Coming soon
          </Text>
          <Text className="text-sm font-manrope text-muted leading-relaxed">
            Password management will be available in a future update.
          </Text>

          <TouchableOpacity
            className="mt-6 items-center py-4 rounded-full bg-primary active:opacity-90"
            onPress={() => router.replace(routes.settings)}
          >
            <Text className="text-white font-manrope-bold text-base">
              Back to Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

