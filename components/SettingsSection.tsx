import React from "react";
import { View, Text } from "react-native";
import { cardShadowStyle } from "@/constants/shadows";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function SettingsSection({ title, children, className = "" }: Props) {
  return (
    <View className={`mb-8 ${className}`}>
      <Text className="text-[10px] font-manrope-bold tracking-widest text-muted px-6 pb-3 uppercase">
        {title}
      </Text>
      <View
        className="mx-6 bg-white rounded-2xl border border-border overflow-hidden"
        style={cardShadowStyle}
      >
        {children}
      </View>
    </View>
  );
}

