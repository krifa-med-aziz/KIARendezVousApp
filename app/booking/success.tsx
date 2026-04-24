import { routes } from "@/constants/routes";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Car,
  Check,
  ChevronRight,
  MapPin,
  Radar,
  Star,
  Wrench,
} from "lucide-react-native";
import { router } from "expo-router";
import { Stepper } from "@/components/Stepper";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingSuccessScreen() {
  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          className="active:opacity-70 p-1 -ml-1"
          onPress={() => router.replace(routes.main)}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
          KIA SERVICE
        </Text>
        <TouchableOpacity
          className="active:opacity-70 p-1 -mr-1"
          onPress={() => router.push(routes.notifications)}
        >
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={5} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Success Section */}
        <View className="bg-primary/5 pt-12 pb-16 items-center px-6 border-b border-border">
          <View className="w-24 h-24 rounded-full bg-surface justify-center items-center shadow-card mb-6 border border-primary/20">
            <View className="w-16 h-16 rounded-full bg-primary justify-center items-center shadow-subtle">
              <Check size={36} color="#fff" strokeWidth={3} />
            </View>
          </View>
          <Text className="text-3xl font-extrabold text-text-primary mb-3 text-center">
            Booking Successful!
          </Text>
          <Text className="text-base text-text-secondary text-center leading-relaxed font-medium">
            Your service appointment is confirmed.{"\n"}We look forward to
            seeing you.
          </Text>
        </View>

        {/* Booking Summary Card */}
        <View className="mx-6 -mt-8 bg-surface rounded-2xl p-6 shadow-card border border-border z-10">
          <View className="flex-row justify-between items-center mb-6 border-b border-border pb-4">
            <Text className="text-xs font-bold text-text-primary tracking-widest uppercase">
              BOOKING SUMMARY
            </Text>
            <View className="bg-[#e8f5f0] border border-[#2a9d6a]/20 px-3 py-1.5 rounded-md">
              <Text className="text-[10px] font-bold text-[#2a9d6a] tracking-widest uppercase">
                CONFIRMED
              </Text>
            </View>
          </View>

          {/* Vehicle */}
          <View className="flex-row mb-6">
            <View className="w-12 h-12 rounded-xl bg-background border border-border justify-center items-center mr-4">
              <Car size={20} color="#6B7280" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                VEHICLE
              </Text>
              <Text className="text-base font-bold text-text-primary">
                KIA EV9 GT-Line
              </Text>
              <Text className="text-sm font-medium text-text-secondary mt-0.5">
                Plate: KA 05 MV 2024
              </Text>
            </View>
          </View>

          {/* Service Type */}
          <View className="flex-row mb-6">
            <View className="w-12 h-12 rounded-xl bg-background border border-border justify-center items-center mr-4">
              <Wrench size={20} color="#6B7280" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                SERVICE TYPE
              </Text>
              <Text className="text-base font-bold text-text-primary">
                Full Maintenance Check
              </Text>
            </View>
          </View>

          {/* Agency */}
          <View className="flex-row mb-6">
            <View className="w-12 h-12 rounded-xl bg-background border border-border justify-center items-center mr-4">
              <MapPin size={20} color="#6B7280" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                AGENCY
              </Text>
              <Text className="text-base font-bold text-text-primary">
                KIA Central Agency
              </Text>
              <Text className="text-sm font-medium text-text-secondary mt-0.5">
                Plot 12, Main Street, Downtown
              </Text>
            </View>
          </View>

          {/* Date & Time */}
          <View className="flex-row">
            <View className="w-12 h-12 rounded-xl bg-background border border-border justify-center items-center mr-4">
              <Calendar size={20} color="#6B7280" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                DATE & TIME
              </Text>
              <Text className="text-base font-bold text-text-primary">
                Oct 24, 2024 at 09:30 AM
              </Text>
              <Text className="text-sm font-medium text-text-secondary mt-0.5">
                Thursday, Morning Slot
              </Text>
            </View>
          </View>
        </View>

        {/* Loyalty Points Banner */}
        <TouchableOpacity
          className="flex-row items-center mx-6 mt-6 bg-[#fffbf0] border border-[#f5a623]/20 rounded-2xl p-5 shadow-subtle active:opacity-80"
          onPress={() =>
            Alert.alert("Loyalty", "Points would open rewards — demo only.")
          }
        >
          <View className="bg-white p-2 rounded-full shadow-sm">
            <Star size={20} color="#f5a623" fill="#f5a623" />
          </View>
          <Text className="flex-1 text-xs font-bold text-text-primary tracking-widest uppercase ml-4">
            EARNED{" "}
            <Text className="text-primary font-extrabold text-sm">250</Text>{" "}
            LOYALTY POINTS
          </Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View className="px-6 pt-8 pb-12">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary h-14 rounded-xl mb-4 shadow-card active:opacity-80 transition-all"
            onPress={() =>
              Alert.alert(
                "Track service",
                "Live status would open here — demo.",
              )
            }
          >
            <Radar size={22} color="#fff" />
            <Text className="text-white text-lg font-bold ml-3">
              Track Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-center bg-surface h-14 rounded-xl border border-border shadow-subtle active:bg-background transition-all"
            onPress={() => router.replace(routes.main)}
          >
            <Text className="text-text-primary text-base font-bold tracking-wide">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
