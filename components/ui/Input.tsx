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
  return (
    <View className={`mb-6 ${containerClassName || ""}`}>
      {!!label && (
        <Text className="text-sm font-semibold text-text-primary mb-2">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center h-14 bg-background border rounded-xl overflow-hidden ${
          error ? "border-red-500" : "border-border focus:border-primary"
        }`}
      >
        <TextInput
          className={`flex-1 px-4 h-full text-text-primary ${className || ""}`}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {rightElement && (
          <View className="pr-4 justify-center items-center">
            {rightElement}
          </View>
        )}
      </View>
      {error ? (
        <Text className="text-[12px] font-medium text-error mt-1">{error}</Text>
      ) : null}
    </View>
  );
};
