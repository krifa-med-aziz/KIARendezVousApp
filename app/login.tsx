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
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="px-6 pt-6 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="text-xs font-bold tracking-widest uppercase text-primary text-center mb-6">
          LOGIN
        </Text>

        {/* KIA Service Badge */}
        <View className="items-center mb-8">
          <Text className="text-xs font-bold tracking-widest text-primary bg-primary-soft px-4 py-1.5 rounded-full uppercase">
            KIA SERVICE
          </Text>
        </View>

        {/* Main Heading */}
        <View className="items-center mb-4">
          <Text className="text-4xl font-medium text-text-primary mb-1">
            Drive with
          </Text>
          <Text className="text-4xl font-extrabold text-primary">
            Confidence
          </Text>
        </View>

        {/* Description */}
        <Text className="text-sm text-text-secondary text-center leading-6 mb-10">
          Manage your vehicle's health and{"\n"}
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
          <Text className="text-sm font-semibold text-text-primary">
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
            <Text className="text-sm font-bold text-primary hover:opacity-80">
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
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="p-2"
            >
              {showPassword ? (
                <Eye size={20} color="#9CA3AF" />
              ) : (
                <EyeOff size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          }
        />

        <PrimaryButton
          label="Log In"
          onPress={handleEmailLogin}
          className="mb-8 mt-2"
        />

        {/* Or Continue With Section */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-[1px] bg-border" />
          <Text className="text-xs font-bold tracking-wider uppercase text-text-muted mx-4">
            OR CONTINUE WITH
          </Text>
          <View className="flex-1 h-[1px] bg-border" />
        </View>

        {/* Social Login Section */}
        <ImageBackground
          source={{
            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car-bg-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
          }}
          className="rounded-2xl overflow-hidden mb-8 py-8 px-6 bg-text-primary"
          imageStyle={{ opacity: 0.2 }}
        >
          <View className="flex-row gap-4 justify-center">
            <TouchableOpacity
              className="bg-white/20 border border-white/30 rounded-xl h-14 flex-1 items-center justify-center backdrop-blur-md active:opacity-80"
              onPress={() => handleSocial("Google")}
            >
              <Text className="text-base font-bold text-white">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white/20 border border-white/30 rounded-xl h-14 flex-1 items-center justify-center backdrop-blur-md active:opacity-80"
              onPress={() => handleSocial("Apple")}
            >
              <Text className="text-base font-bold text-white">Apple</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center pb-6">
          <Text className="text-sm font-medium text-text-secondary">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push(routes.signup as any)}>
            <Text className="text-sm font-bold text-primary">
              Create an Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
