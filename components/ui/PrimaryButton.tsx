import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { primaryShadowStyle } from "@/constants/shadows";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  className,
  labelClassName,
  disabled,
  style,
}: Props) {
  const getContainerClasses = () => {
    let classes = "py-4 px-6 rounded-full items-center justify-center ";

    if (variant === "primary") classes += "bg-primary ";
    else if (variant === "secondary")
      classes += "bg-border active:opacity-90 ";
    else if (variant === "ghost")
      classes += "bg-transparent border border-border active:bg-elevated ";

    if (disabled) classes += "opacity-50 ";

    return classes + (className || "");
  };

  const getLabelClasses = () => {
    let classes = "text-base font-manrope-bold ";

    if (variant === "primary") classes += "text-white ";
    else if (variant === "secondary")
      classes += "text-foreground ";
    else if (variant === "ghost") classes += "text-primary ";

    return classes + (labelClassName || "");
  };

  const shadowStyle = variant === "primary" && !disabled ? primaryShadowStyle : undefined;

  return (
    <TouchableOpacity
      className={getContainerClasses()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[shadowStyle, style]}
    >
      <Text className={getLabelClasses()}>{label}</Text>
    </TouchableOpacity>
  );
}
