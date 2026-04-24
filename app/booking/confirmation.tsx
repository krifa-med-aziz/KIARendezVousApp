import { routes } from "@/constants/routes";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Settings,
  MapPin,
} from "lucide-react-native";
import { router } from "expo-router";
import { Stepper } from "@/components/Stepper";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingConfirmationScreen() {
  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="flex-row items-center px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          className="p-1 active:opacity-70 -ml-1"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>

        <Text className="flex-1 text-center mr-6 text-sm font-bold tracking-widest text-text-primary uppercase">
          Booking Summary
        </Text>
      </View>

      <Stepper steps={STEPS} currentStep={4} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Vehicle */}
        <View className="mx-6 mt-6 mb-6 h-[220px] rounded-2xl overflow-hidden bg-text-primary shadow-card">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Booking_%20Confirmation-S9V8yXvXqlOZnLitigyrtEvRM2JBS0.png",
            }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />

          <View className="flex-1 justify-end p-6 bg-black/40">
            <View className="bg-primary/90 backdrop-blur-sm self-start px-3 py-1.5 rounded-md mb-2">
              <Text className="text-[10px] font-bold text-white tracking-widest uppercase">
                YOUR SELECTED VEHICLE
              </Text>
            </View>
            <Text className="text-3xl font-extrabold text-white">
              KIA EV6 GT
            </Text>
          </View>
        </View>

        {/* Receipt Concept Card */}
        <View className="mx-6 bg-surface rounded-2xl shadow-card border border-border overflow-hidden">
          {/* Info Card */}
          <View className="p-6 border-b border-dashed border-border">
            <View className="flex-row items-center mb-4">
              <Settings size={20} color="#E60012" />
              <Text className="ml-auto text-xs text-text-muted font-bold tracking-widest uppercase">
                SERVICE TYPE
              </Text>
            </View>

            <Text className="text-xl font-bold text-text-primary mb-1.5">
              Full Maintenance
            </Text>
            <Text className="text-sm font-medium text-text-secondary leading-5">
              Complete diagnostic & performance check
            </Text>
          </View>

          {/* Location */}
          <View className="p-6 border-b border-dashed border-border bg-background/50">
            <View className="flex-row items-center mb-4">
              <MapPin size={20} color="#E60012" />
              <Text className="ml-auto text-xs text-text-muted font-bold tracking-widest uppercase">
                LOCATION
              </Text>
            </View>

            <Text className="text-xl font-bold text-text-primary mb-1.5">
              KIA Central
            </Text>
            <Text className="text-sm font-medium text-text-secondary leading-5">
              Industrial Area, Sector 4
            </Text>
          </View>

          {/* Schedule */}
          <View className="p-6 border-b border-border">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-xs font-bold text-primary tracking-widest uppercase">
                SCHEDULE
              </Text>
              <Calendar size={18} color="#E60012" />
            </View>

            <View className="flex-row items-center">
              <View className="w-[80px] items-center pr-5 border-r border-border">
                <Text className="text-4xl font-extrabold text-primary">24</Text>
                <Text className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">
                  OCT
                </Text>
              </View>

              <View className="flex-1 pl-5">
                <Text className="text-lg font-bold text-text-primary mb-1.5">
                  Thursday, 09:30 AM
                </Text>
                <Text className="text-sm font-medium text-text-secondary leading-5">
                  Estimated duration: 3-4 hours
                </Text>
              </View>
            </View>
          </View>

          {/* Cost */}
          <View className="p-6 bg-background flex-row justify-between items-center">
            <View>
              <Text className="text-xs text-text-muted font-bold tracking-widest uppercase">
                ESTIMATED COST
              </Text>
              <Text className="text-sm font-medium text-text-secondary mt-1.5">
                Labor & Standard Spare Parts
              </Text>
            </View>

            <Text className="text-3xl font-extrabold text-text-primary">
              $284.00
            </Text>
          </View>
        </View>

        {/* Terms */}
        <View className="mx-6 mt-6 mb-8 flex-row items-start bg-primary-soft/50 rounded-xl p-5 border border-primary/10">
          <View className="mr-4 mt-0.5">
            <CheckCircle2 size={20} color="#E60012" />
          </View>

          <Text className="flex-1 text-sm text-text-primary leading-relaxed font-medium">
            By confirming, you agree to our{" "}
            <Text className="text-primary font-bold">Service Terms</Text>.
            {"\n\n"}
            <Text className="text-text-secondary">
              You can reschedule or cancel free of charge up to 24 hours before
              the appointment.
            </Text>
          </Text>
        </View>

        {/* Actions */}
        <View className="px-6 pb-6">
          <TouchableOpacity
            onPress={() => router.push(routes.booking.success)}
            className="bg-primary h-14 rounded-xl items-center justify-center mb-4 shadow-card active:opacity-80 transition-all focus:scale-95"
          >
            <Text className="text-white text-lg font-bold">
              Confirm Booking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace(routes.main)}
            className="items-center py-4 active:opacity-70"
          >
            <Text className="text-text-secondary text-xs font-bold tracking-widest uppercase">
              CANCEL & RETURN TO HOME
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
