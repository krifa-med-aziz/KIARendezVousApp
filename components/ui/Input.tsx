import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

export interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  containerClassName,
  rightElement,
  ...props
}) => {
  const hasError = !!error;
  return (
    <View className={`mb-5 ${containerClassName || ""}`}>
      {!!label && (
        <Text className="text-xs font-manrope-bold text-muted mb-2 tracking-widest uppercase">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center min-h-[56px] border rounded-2xl overflow-hidden px-4 ${
          hasError
            ? "border-primary bg-badge-red/60"
            : "border-border bg-white"
        }`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <TextInput
          className={`flex-1 py-4 text-base text-foreground font-manrope ${className || ""}`}
          placeholderTextColor="#71717A"
          {...props}
        />
        {rightElement && (
          <View className="pl-2 justify-center items-center">{rightElement}</View>
        )}
      </View>
      {hasError ? (
        <Text className="text-xs font-manrope-semibold text-primary mt-1.5 ml-0.5">
          {error}
        </Text>
      ) : null}
    </View>
  );
};
