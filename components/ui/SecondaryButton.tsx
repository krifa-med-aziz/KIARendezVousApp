import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function SecondaryButton({
  label,
  onPress,
  className,
  labelClassName,
  disabled,
  style,
}: Props) {
  return (
    <TouchableOpacity
      className={`py-4 px-6 rounded-full items-center justify-center bg-border active:opacity-90 ${disabled ? "opacity-50 " : ""}${className || ""}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={style}
    >
      <Text
        className={`text-base font-manrope-bold text-foreground ${labelClassName || ""}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
