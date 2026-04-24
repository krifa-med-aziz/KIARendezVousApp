import { routes } from "@/constants/routes";
import { cardShadowStyle, primaryShadowStyle } from "@/constants/shadows";
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
import { Badge } from "@/components/ui/Badge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
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
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="active:opacity-70 p-1 -ml-1"
          onPress={() => router.replace(routes.main)}
        >
          <ArrowLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
          KIA SERVICE
        </Text>
        <TouchableOpacity
          className="active:opacity-70 p-1 -mr-1"
          onPress={() => router.push(routes.notifications)}
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={5} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-badge-red/50 pt-12 pb-16 items-center px-6 border-b border-border">
          <View
            className="w-24 h-24 rounded-full bg-white justify-center items-center mb-6 border border-border"
            style={cardShadowStyle}
          >
            <View
              className="w-16 h-16 rounded-full bg-primary justify-center items-center"
              style={primaryShadowStyle}
            >
              <Check size={36} color="#fff" strokeWidth={3} />
            </View>
          </View>
          <Text className="text-3xl font-jakarta-extrabold text-foreground mb-3 text-center">
            Booking successful!
          </Text>
          <Text className="text-base font-manrope text-muted text-center leading-relaxed">
            Your service appointment is confirmed.{"\n"}We look forward to
            seeing you.
          </Text>
        </View>

        <View
          className="mx-6 -mt-8 bg-white rounded-3xl p-6 border border-border z-10"
          style={cardShadowStyle}
        >
          <View className="flex-row justify-between items-center mb-6 border-b border-border pb-4">
            <Text className="text-xs font-manrope-bold text-foreground tracking-widest uppercase">
              Booking summary
            </Text>
            <Badge variant="red">CONFIRMED</Badge>
          </View>

          <View className="flex-row mb-6">
            <View className="w-12 h-12 rounded-2xl bg-elevated border border-border justify-center items-center mr-4">
              <Car size={20} color="#71717A" strokeWidth={2} />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                Vehicle
              </Text>
              <Text className="text-base font-jakarta-bold text-foreground">
                KIA EV9 GT-Line
              </Text>
              <Text className="text-sm font-manrope text-muted mt-0.5">
                Plate: KA 05 MV 2024
              </Text>
            </View>
          </View>

          <View className="flex-row mb-6">
            <View className="w-12 h-12 rounded-2xl bg-elevated border border-border justify-center items-center mr-4">
              <Wrench size={20} color="#71717A" strokeWidth={2} />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                Service type
              </Text>
              <Text className="text-base font-jakarta-bold text-foreground">
                Full Maintenance Check
              </Text>
            </View>
          </View>

          <View className="flex-row mb-6">
            <View className="w-12 h-12 rounded-2xl bg-elevated border border-border justify-center items-center mr-4">
              <MapPin size={20} color="#71717A" strokeWidth={2} />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                Agency
              </Text>
              <Text className="text-base font-jakarta-bold text-foreground">
                KIA Central Agency
              </Text>
              <Text className="text-sm font-manrope text-muted mt-0.5">
                Plot 12, Main Street, Downtown
              </Text>
            </View>
          </View>

          <View className="flex-row">
            <View className="w-12 h-12 rounded-2xl bg-elevated border border-border justify-center items-center mr-4">
              <Calendar size={20} color="#71717A" strokeWidth={2} />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                Date & time
              </Text>
              <Text className="text-base font-jakarta-bold text-foreground">
                Oct 24, 2024 at 09:30 AM
              </Text>
              <Text className="text-sm font-manrope text-muted mt-0.5">
                Thursday, Morning Slot
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center mx-6 mt-6 bg-elevated border border-border rounded-3xl p-5 active:opacity-90"
          style={cardShadowStyle}
          onPress={() =>
            Alert.alert("Loyalty", "Points would open rewards — demo only.")
          }
        >
          <View className="bg-white p-2 rounded-full border border-border">
            <Star size={20} color="#93001B" fill="#93001B" strokeWidth={2} />
          </View>
          <Text className="flex-1 text-xs font-manrope-bold text-foreground tracking-widest uppercase ml-4">
            Earned{" "}
            <Text className="text-primary font-jakarta-extrabold text-sm">
              250
            </Text>{" "}
            loyalty points
          </Text>
          <ChevronRight size={20} color="#71717A" strokeWidth={2} />
        </TouchableOpacity>

        <View className="px-6 pt-8 pb-12 gap-4">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary h-14 rounded-full active:opacity-90"
            style={primaryShadowStyle}
            onPress={() =>
              Alert.alert(
                "Track service",
                "Live status would open here — demo.",
              )
            }
          >
            <Radar size={22} color="#fff" strokeWidth={2} />
            <Text className="text-white text-lg font-manrope-bold ml-3">
              Track service
            </Text>
          </TouchableOpacity>
          <SecondaryButton
            label="Back to home"
            onPress={() => router.replace(routes.main)}
            className="w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
