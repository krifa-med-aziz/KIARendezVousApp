import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  className,
  labelClassName,
  disabled,
}: Props) {
  const getContainerClasses = () => {
    let classes = "h-14 rounded-xl items-center justify-center ";

    if (variant === "primary") classes += "bg-primary ";
    else if (variant === "secondary")
      classes += "bg-background border border-border ";
    else if (variant === "ghost")
      classes += "bg-transparent border border-border ";

    if (disabled) classes += "opacity-50 ";

    return classes + (className || "");
  };

  const getLabelClasses = () => {
    let classes = "text-lg font-bold ";

    if (variant === "primary") classes += "text-white ";
    else if (variant === "secondary") classes += "text-text-primary ";
    else if (variant === "ghost") classes += "text-primary ";

    return classes + (labelClassName || "");
  };

  return (
    <TouchableOpacity
      className={getContainerClasses()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text className={getLabelClasses()}>{label}</Text>
    </TouchableOpacity>
  );
}
