import React from "react";
import { View, Text } from "react-native";
import { Check } from "lucide-react-native";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <View className="flex-row items-center justify-between w-full px-6 pt-4 pb-6 bg-surface border-b border-border">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <View
            key={step}
            className={`flex-row items-center ${isLast ? "" : "flex-1"}`}
          >
            <View className="items-center">
              <View
                className={`w-6 h-6 rounded-full items-center justify-center border-2 ${
                  isCompleted
                    ? "bg-primary border-primary"
                    : isCurrent
                      ? "bg-surface border-primary"
                      : "bg-surface border-border"
                }`}
              >
                {isCompleted ? (
                  <Check size={12} color="#fff" strokeWidth={3} />
                ) : (
                  <Text
                    className={`text-[10px] font-bold ${
                      isCurrent ? "text-primary" : "text-text-muted"
                    }`}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>

              <Text
                className={`text-[10px] tracking-tight mt-1.5 absolute top-7 w-20 text-center ${
                  isCompleted || isCurrent
                    ? "text-text-primary font-bold"
                    : "text-text-muted font-bold"
                }`}
                numberOfLines={1}
              >
                {step}
              </Text>
            </View>

            {!isLast && (
              <View
                className={`h-[2px] flex-1 mx-2 mt-[-10px] ${
                  isCompleted ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
