import { View } from "react-native";

type SkeletonProps = {
  className?: string;
};

/** Simple pulse placeholder block. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <View className={`rounded-2xl bg-elevated ${className}`} />
  );
}
