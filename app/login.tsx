import { Input } from "@/components/ui/Input";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Details required", "Please enter your email and password to continue.");
      return;
    }
    try {
      await signIn(email.trim(), password);
      router.replace(routes.main);
    } catch (err: any) {
      Alert.alert("Login failed", err.message ?? "Please check your credentials.");
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="px-6 pt-8 pb-12"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-center text-xl font-jakarta-bold text-foreground tracking-wide mb-10">
          KIA SERVICE
        </Text>

        <Text className="text-3xl font-jakarta-extrabold text-foreground mb-3">
          Welcome back
        </Text>
        <Text className="text-base font-manrope text-muted leading-6 mb-10">
          Sign in to manage your vehicle and book service in one place.
        </Text>

        <Input
          label="Email address"
          placeholder="alex@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="flex-row justify-between items-center mb-2 -mt-2">
          <Text className="text-xs font-manrope-bold text-muted tracking-widest uppercase">
            Password
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Reset password",
                "We would email you a reset link — demo only.",
              )
            }
            activeOpacity={0.7}
          >
            <Text className="text-sm font-manrope-bold text-primary">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <Input
          label=""
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          containerClassName="mb-8 -mt-2"
          rightElement={
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="p-2"
              hitSlop={8}
            >
              {showPassword ? (
                <Eye size={20} color="#71717A" strokeWidth={2} />
              ) : (
                <EyeOff size={20} color="#71717A" strokeWidth={2} />
              )}
            </TouchableOpacity>
          }
        />

        <PrimaryButton
          label="Log in"
          onPress={handleEmailLogin}
          className="mb-8"
        />

        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-px bg-border" />
          <Text className="text-xs font-manrope-bold text-muted tracking-widest uppercase mx-4">
            Or continue with
          </Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        <View className="flex-row gap-3 mb-10">
          <TouchableOpacity
            className="flex-1 py-4 rounded-full bg-border items-center opacity-40"
            disabled
          >
            <Text className="text-base font-manrope-bold text-foreground">
              Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 py-4 rounded-full bg-border items-center opacity-40"
            disabled
          >
            <Text className="text-base font-manrope-bold text-foreground">
              Apple
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center pb-6">
          <Text className="text-sm font-manrope text-muted">
            Don&apos;t have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.push(routes.signup as any)}
            activeOpacity={0.7}
          >
            <Text className="text-sm font-manrope-bold text-primary">
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
