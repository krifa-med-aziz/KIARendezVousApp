import { Input } from "@/components/ui/Input";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Details required",
        "Please enter your email and password to continue.",
      );
      return;
    }
    signIn(email.trim());
    router.replace(routes.main);
  };

  const handleSocial = (provider: string) => {
    signIn(`${provider.toLowerCase()}@kia.app`);
    router.replace(routes.main);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-6 pt-6 pb-12">
        {/* Header */}
        <Text className="text-[11px] font-semibold tracking-[0.5px] uppercase text-primary text-center mb-6">
          LOGIN
        </Text>

        {/* KIA Service Badge */}
        <View className="items-center mb-8">
          <Text className="text-[12px] font-semibold tracking-[1.5px] text-primary bg-primaryLight px-3 py-1 rounded-sm">
            KIA SERVICE
          </Text>
        </View>

        {/* Main Heading */}
        <View className="items-center mb-4">
          <Text className="text-[32px] font-medium leading-[40px] tracking-[-0.5px] text-text">
            Drive with
          </Text>
          <Text className="text-[32px] font-bold leading-[40px] tracking-[-0.5px] text-primary">
            Confidence
          </Text>
        </View>

        {/* Description */}
        <Text className="text-[14px] text-textSecondary text-center leading-5 mb-10">
          Manage your vehicle&apos;s health and{"\n"}
          book services with ease.
        </Text>

        {/* Email Field */}
        <Input
          label="EMAIL ADDRESS"
          placeholder="alex@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Field */}
        <View className="flex-row justify-between items-center mb-1.5">
          <Text className="text-[11px] font-semibold tracking-[0.5px] text-textSecondary">
            PASSWORD
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Reset password",
                "We would email you a reset link — demo only.",
              )
            }
          >
            <Text className="text-[12px] font-medium tracking-[0.5px] uppercase text-primary">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
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

        <PrimaryButton
          label="Log In →"
          onPress={handleEmailLogin}
          className="mb-6"
        />

        {/* Or Continue With Section */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-[1px] bg-border" />
          <Text className="text-[11px] font-semibold tracking-[0.5px] uppercase text-textMuted mx-3">
            OR CONTINUE WITH
          </Text>
          <View className="flex-1 h-[1px] bg-border" />
        </View>

        {/* Social Login Section */}
        <ImageBackground
          source={{
            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car-bg-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
          }}
          className="rounded-xl overflow-hidden mb-6 py-10 px-6 bg-[#e8e8e8]"
          imageStyle={{ opacity: 0.3 }}
        >
          <View className="flex-row gap-3 justify-center">
            <TouchableOpacity
              className="bg-[rgba(100,100,100,0.6)] rounded-xl px-8 py-3 min-w-[120px] items-center"
              onPress={() => handleSocial("Google")}
            >
              <Text className="text-[14px] font-semibold text-surface">
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[rgba(100,100,100,0.6)] rounded-xl px-8 py-3 min-w-[120px] items-center"
              onPress={() => handleSocial("Apple")}
            >
              <Text className="text-[14px] font-semibold text-surface">
                Apple
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-[14px] text-textSecondary">
            Don&apos;t have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push(routes.signup as any)}>
            <Text className="text-[14px] font-semibold text-primary">
              Create an Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
