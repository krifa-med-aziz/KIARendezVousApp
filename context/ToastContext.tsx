import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export type ToastType = "info" | "success" | "error";

export type ToastPayload = {
  type?: ToastType;
  message: string;
  durationMs?: number;
};

type ToastContextValue = {
  showToast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  }, [opacity]);

  const showToast = useCallback(
    (payload: ToastPayload) => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setType(payload.type ?? "info");
      setMessage(payload.message);
      setVisible(true);
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
      const duration = payload.durationMs ?? 3200;
      hideTimer.current = setTimeout(hide, duration);
    },
    [hide, opacity],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  const bgClass =
    type === "error"
      ? "bg-primary"
      : type === "success"
        ? "bg-foreground"
        : "bg-foreground";

  return (
    <ToastContext.Provider value={value}>
      <View style={styles.wrap}>
        {children}
        {visible ? (
          <Animated.View
            style={[styles.toastHost, { opacity }]}
            pointerEvents="box-none"
          >
            <Pressable onPress={hide}>
              <View className={`rounded-2xl px-4 py-3 border border-border ${bgClass}`}>
                <Text className="text-white text-sm font-manrope leading-snug">
                  {message}
                </Text>
              </View>
            </Pressable>
          </Animated.View>
        ) : null}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, position: "relative" },
  toastHost: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 100,
    zIndex: 9999,
  },
});

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
