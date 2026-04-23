import React from "react";
import { View, ViewProps } from "react-native";

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}: any) => {
  return (
    <View
      className={`bg-surface rounded-2xl p-4 mb-4 shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.05)] ${className || ""}`}
      {...props}
    >
      {children}
    </View>
  );
};
