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
    let classes = "rounded-full py-4 px-6 items-center justify-center ";

    if (variant === "primary") classes += "bg-primary ";
    else if (variant === "secondary") classes += "bg-inputBackground ";
    else if (variant === "ghost")
      classes += "bg-transparent border border-border ";

    if (disabled) classes += "opacity-50 ";

    return classes + (className || "");
  };

  const getLabelClasses = () => {
    let classes = "text-[16px] font-semibold ";

    if (variant === "primary") classes += "text-surface ";
    else if (variant === "secondary") classes += "text-text ";
    else if (variant === "ghost") classes += "text-primary ";

    return classes + (labelClassName || "");
  };

  return (
    <TouchableOpacity
      className={getContainerClasses()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text className={getLabelClasses()}>{label}</Text>
    </TouchableOpacity>
  );
}
