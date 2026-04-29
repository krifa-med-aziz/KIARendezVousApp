import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { routes } from "@/constants/routes";
import { authService } from "@/services/authService";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyOtp() {
  const { phone, email, password } = useLocalSearchParams<{
    phone: string;
    email: string;
    password: string;
  }>();
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert("Invalid code", "Enter the 6-digit code.");
      return;
    }
    try {
      if (!phone || !email || !password) {
        throw new Error("Missing parameters for verification.");
      }
      await authService.verifyOtp(phone, code);
      await authService.login(email, password);
      router.replace(routes.main);
    } catch (err: any) {
      Alert.alert("Verification failed", err.message ?? "Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      if (!phone || !email || !password) {
        throw new Error("Missing parameters for resending OTP.");
      }
      await authService.register(email, password, "", "", phone);
      Alert.alert("Success", "Code resent.");
    } catch (err: any) {
      Alert.alert("Resend failed", err.message ?? "Could not resend the code.");
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView className="px-6 pt-8" keyboardShouldPersistTaps="handled">
        <Text className="text-3xl font-jakarta-extrabold text-foreground mb-3">
          Verify your number
        </Text>
        <Text className="text-base font-manrope text-muted mb-10">
          Enter the 6-digit code sent to {phone}
        </Text>

        <TextInput
          value={code}
          onChangeText={(t) => setCode(t.replace(/\D/g, "").slice(0, 6))}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="······"
          placeholderTextColor="#71717A"
          className="text-center tracking-[10px] text-2xl font-jakarta-extrabold bg-white border border-border rounded-xl py-4 mb-6 shadow-sm"
          style={{ letterSpacing: 24 }}
        />

        <PrimaryButton label="Verify" onPress={handleVerify} className="mb-6" />

        <View className="flex-row items-center justify-center">
          <Text className="text-sm font-manrope text-muted mr-1">
            Didn't receive the code?
          </Text>
          <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
            <Text className="text-sm font-manrope-bold text-primary">
              Resend code
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
