import { routes } from "@/constants/routes";
import { Bell, ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type AppHeaderProps = {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  right?: ReactNode;
  /** When set, shows bell and navigates to notifications */
  showNotifications?: boolean;
};

export function AppHeader({
  title,
  onBack,
  showBack = true,
  right,
  showNotifications,
}: AppHeaderProps) {
  const handleBack = onBack ?? (() => router.back());

  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border">
      {showBack ? (
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={handleBack}
        >
          <ChevronLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}

      <Text
        className="flex-1 text-center text-sm font-jakarta-bold tracking-widest text-foreground uppercase"
        numberOfLines={1}
      >
        {title}
      </Text>

      {right ? (
        <View className="min-w-[40px] items-end">{right}</View>
      ) : showNotifications ? (
        <TouchableOpacity
          className="p-1 -mr-1 active:opacity-70"
          onPress={() => router.push(routes.notifications)}
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}
    </View>
  );
}
