import React from "react";
import { View, ViewProps } from "react-native";
import { cardShadowStyle } from "@/constants/shadows";

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  /** List-style cards (e.g. settings rows) */
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  style,
  noPadding,
  ...props
}: any) => {
  const padding = noPadding ? "" : "p-6 ";
  return (
    <View
      className={`bg-white rounded-3xl ${padding}border border-border mb-4 ${className || ""}`}
      style={[cardShadowStyle, style]}
      {...props}
    >
      {children}
    </View>
  );
};
