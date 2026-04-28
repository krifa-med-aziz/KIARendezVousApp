import React from "react";
import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from "react-native";
import { primaryShadowStyle } from "@/constants/shadows";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

type Props = Omit<TouchableOpacityProps, "children"> & {
  label: string;
  variant?: ButtonVariant;
  className?: string;
  labelClassName?: string;
  style?: ViewStyle;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  className = "",
  labelClassName = "",
  disabled,
  style,
  ...rest
}: Props) {
  const container =
    variant === "primary"
      ? "bg-primary py-4 px-6 rounded-full items-center justify-center "
      : variant === "secondary"
        ? "bg-white border border-border py-4 px-6 rounded-full items-center justify-center "
        : variant === "outline"
          ? "bg-transparent border border-border py-4 px-6 rounded-full items-center justify-center "
          : "bg-[#FEE2E2] py-4 px-6 rounded-2xl items-center justify-center ";

  const labelDefault =
    variant === "primary"
      ? "text-white "
      : variant === "danger"
        ? "text-[#B91C1C] "
        : "text-foreground ";

  const shadow =
    variant === "primary" && !disabled ? primaryShadowStyle : undefined;

  return (
    <TouchableOpacity
      className={`${container}${disabled ? "opacity-50 " : ""}${className}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[shadow, style]}
      {...rest}
    >
      <Text
        className={`text-base font-manrope-bold ${labelDefault}${labelClassName}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
