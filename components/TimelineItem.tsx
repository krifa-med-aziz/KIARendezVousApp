import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  isActive: boolean;
  isDone: boolean;
  isLast: boolean;
};

export function TimelineItem({
  title,
  isActive,
  isDone,
  isLast,
}: Props) {
  const dotActive = isActive || isDone;
  return (
    <View className="flex-row">
      <View className="w-8 items-center">
        <View
          className={`w-4 h-4 rounded-full border-2 ${
            isActive
              ? "bg-primary border-primary"
              : isDone
                ? "bg-primary border-primary"
                : "bg-white border-border"
          }`}
        />
        {!isLast && (
          <View
            className={`w-0.5 h-12 mt-1 ${
              dotActive && !isActive ? "bg-primary/35" : "bg-border"
            }`}
          />
        )}
      </View>
      <View className={`flex-1 ${isLast ? "" : "pb-2"}`}>
        <Text
          className={`text-base font-jakarta-bold ${
            isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted"
          }`}
        >
          {title}
        </Text>
        {isActive && (
          <Text className="text-xs font-manrope-bold text-primary tracking-widest uppercase mt-1">
            Active
          </Text>
        )}
      </View>
    </View>
  );
}
