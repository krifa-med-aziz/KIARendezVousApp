import { Input } from "@/components/ui/Input";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

    console.log("Signup success for:", email);
    signIn(email.trim());
    router.replace(routes.main);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-6 pt-6 pb-10">
        <Text className="text-[11px] font-semibold tracking-[1px] text-primary text-center mb-6">
          CREATE ACCOUNT
        </Text>

        <View className="items-center mb-4">
          <Text className="text-[36px] text-text font-medium">Join the</Text>
          <Text className="text-[36px] text-primary font-bold">KIA Family</Text>
        </View>

        <Text className="text-[14px] font-normal text-textSecondary text-center leading-5 mb-8">
          Get started with managing your vehicle{"\n"}
          and booking services easily.
        </Text>

        <Input
          label="FULL NAME"
          placeholder="Alex Driver"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Input
          label="EMAIL ADDRESS"
          placeholder="alex@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-[11px] font-semibold tracking-[1px] text-text mb-2">
          PASSWORD
        </Text>
        <Input
          label=""
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          containerClassName="mb-6 -mt-4"
          rightElement={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye size={20} color="#666666" />
              ) : (
                <EyeOff size={20} color="#666666" />
              )}
            </TouchableOpacity>
          }
        />

        <Text className="text-[11px] font-semibold tracking-[1px] text-text mb-2">
          CONFIRM PASSWORD
        </Text>
        <Input
          label=""
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          containerClassName="mb-8 -mt-4"
          rightElement={
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <Eye size={20} color="#666666" />
              ) : (
                <EyeOff size={20} color="#666666" />
              )}
            </TouchableOpacity>
          }
        />

        <PrimaryButton
          label="Sign Up →"
          onPress={handleSignup}
          className="mb-6"
        />

        <View className="flex-row justify-center items-center">
          <Text className="text-[14px] font-normal text-textSecondary">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push(routes.login as any)}>
            <Text className="text-[14px] font-semibold text-primary">
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
