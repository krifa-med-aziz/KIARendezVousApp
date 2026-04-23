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
        <Text className="text-[11px] font-semibold tracking-[1px] text-text mb-2">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center bg-inputBackground rounded-lg overflow-hidden ${
          error ? "border border-error" : ""
        }`}
      >
        <TextInput
          className={`flex-1 px-4 py-[14px] text-[14px] font-normal text-text ${
            className || ""
          }`}
          placeholderTextColor="#999999"
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
