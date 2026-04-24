import { Input } from "@/components/ui/Input";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Details required", "Please fill in all fields to register.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please ensure both passwords are the same.",
      );
      return;
    }

    signIn(email.trim());
    router.replace(routes.main);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="px-6 pt-8 pb-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-center text-xl font-jakarta-bold text-foreground tracking-wide mb-10">
          KIA SERVICE
        </Text>

        <Text className="text-3xl font-jakarta-extrabold text-foreground mb-3">
          Create your account
        </Text>
        <Text className="text-base font-manrope text-muted leading-6 mb-10">
          Register to track your vehicles and book service appointments.
        </Text>

        <Input
          label="Full name"
          placeholder="Alex Driver"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Input
          label="Email address"
          placeholder="alex@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-xs font-manrope-bold text-muted mb-2 tracking-widest uppercase">
          Password
        </Text>
        <Input
          label=""
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          containerClassName="mb-6 -mt-2"
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

        <Text className="text-xs font-manrope-bold text-muted mb-2 tracking-widest uppercase">
          Confirm password
        </Text>
        <Input
          label=""
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          containerClassName="mb-8 -mt-2"
          rightElement={
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="p-2"
              hitSlop={8}
            >
              {showConfirmPassword ? (
                <Eye size={20} color="#71717A" strokeWidth={2} />
              ) : (
                <EyeOff size={20} color="#71717A" strokeWidth={2} />
              )}
            </TouchableOpacity>
          }
        />

        <PrimaryButton label="Sign up" onPress={handleSignup} className="mb-8" />

        <View className="flex-row justify-center items-center pb-6">
          <Text className="text-sm font-manrope text-muted">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.push(routes.login as any)}
            activeOpacity={0.7}
          >
            <Text className="text-sm font-manrope-bold text-primary">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
