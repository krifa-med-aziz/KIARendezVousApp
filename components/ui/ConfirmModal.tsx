import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive: _destructive,
  confirmDisabled,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center px-6"
        onPress={onCancel}
      >
        <Pressable
          className="bg-white rounded-3xl p-6 border border-border"
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-lg font-jakarta-bold text-foreground mb-2">
            {title}
          </Text>
          <Text className="text-sm font-manrope text-muted leading-relaxed mb-6">
            {message}
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <SecondaryButton label={cancelLabel} onPress={onCancel} />
            </View>
            <View className="flex-1">
              <PrimaryButton
                label={confirmLabel}
                onPress={onConfirm}
                disabled={confirmDisabled}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
