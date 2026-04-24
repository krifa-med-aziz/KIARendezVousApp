import React from "react";
import { Text, View } from "react-native";

type Variant = "red" | "neutral";

type Props = {
  children: string;
  variant?: Variant;
  className?: string;
};

export function Badge({ children, variant = "red", className }: Props) {
  const wrap =
    variant === "red"
      ? "bg-badge-red"
      : "bg-elevated border border-border";
  const label =
    variant === "red" ? "text-primary" : "text-muted";

  return (
    <View className={`self-start px-3 py-1 rounded-full ${wrap} ${className || ""}`}>
      <Text
        className={`text-[10px] font-manrope-bold tracking-widest uppercase ${label}`}
      >
        {children}
      </Text>
    </View>
  );
}
