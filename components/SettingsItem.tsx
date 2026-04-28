import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRight, type LucideIcon } from "lucide-react-native";

type Props = {
  label: string;
  icon: LucideIcon;
  rightElement?: React.ReactNode;
  onPress?: () => void;
};

export function SettingsItem({
  label,
  icon: Icon,
  rightElement,
  onPress,
}: Props) {
  const isPressable = !!onPress;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={!isPressable}
      className={`min-h-[56px] flex-row items-center px-4 ${isPressable ? "active:bg-elevated" : ""}`}
    >
      <View className="w-10 h-10 rounded-2xl bg-elevated border border-border items-center justify-center">
        <Icon size={20} color="#1A1C1C" strokeWidth={2} />
      </View>

      <Text className="flex-1 text-base font-manrope-bold text-foreground ml-4">
        {label}
      </Text>

      {rightElement ?? (
        <ChevronRight size={20} color="#71717A" strokeWidth={2} />
      )}
    </TouchableOpacity>
  );
}

