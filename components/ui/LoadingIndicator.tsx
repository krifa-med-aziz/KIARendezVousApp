import { ActivityIndicator, Text, View } from "react-native";

type LoadingIndicatorProps = {
  message?: string;
  className?: string;
};

export function LoadingIndicator({
  message,
  className = "",
}: LoadingIndicatorProps) {
  return (
    <View className={`items-center justify-center py-8 ${className}`}>
      <ActivityIndicator size="large" color="#93001B" />
      {message ? (
        <Text className="text-sm font-manrope text-muted mt-4 text-center px-6">
          {message}
        </Text>
      ) : null}
    </View>
  );
}
