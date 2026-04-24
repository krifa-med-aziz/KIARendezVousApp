import { routes } from "@/constants/routes";
import { primaryShadowStyle } from "@/constants/shadows";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Sun,
  SunMoon,
} from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Stepper } from "@/components/Stepper";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { DATES, MORNING_TIMES, AFTERNOON_TIMES } from "@/data/mockData";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectAppointmentScreen() {
  const [selectedTime, setSelectedTime] = useState("09:30 AM");

  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="w-10 p-1 -ml-1 active:opacity-70"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
            Select Appointment
          </Text>
        </View>

        <View className="w-10" />
      </View>

      <Stepper steps={STEPS} currentStep={3} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row justify-between px-6 pt-8 pb-6">
          <View>
            <Text className="text-2xl font-jakarta-extrabold text-foreground">
              October 2024
            </Text>
            <Text className="text-sm font-manrope text-muted mt-1">
              Next available: Today, 23 Oct
            </Text>
          </View>

          <TouchableOpacity className="w-12 h-12 rounded-2xl bg-white border border-border items-center justify-center active:opacity-70">
            <Calendar size={20} color="#93001B" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
        >
          {DATES.map((d, i) => {
            const active = d.active;

            return (
              <TouchableOpacity
                key={i}
                className={`w-[72px] py-4 rounded-3xl items-center justify-center border ${
                  active
                    ? "bg-primary border-primary"
                    : "bg-white border-border"
                }`}
                style={
                  active
                    ? primaryShadowStyle
                    : {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 8,
                        elevation: 2,
                      }
                }
                activeOpacity={0.9}
              >
                <Text
                  className={`text-xs font-manrope-bold uppercase tracking-widest mb-2 ${
                    active ? "text-white/80" : "text-label"
                  }`}
                >
                  {d.day}
                </Text>

                <Text
                  className={`text-2xl font-jakarta-extrabold ${
                    active ? "text-white" : "text-foreground"
                  }`}
                >
                  {d.date}
                </Text>

                {active && (
                  <View className="w-1 h-1 rounded-full bg-white mt-2" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="px-6 mb-8">
          <View className="flex-row items-center mb-4">
            <Sun size={18} color="#71717A" strokeWidth={2} />
            <Text className="text-xs font-manrope-bold text-muted ml-2 tracking-widest uppercase">
              Morning availability
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {MORNING_TIMES.map((time) => {
              const active = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`w-[31%] h-12 rounded-full items-center justify-center border ${
                    active
                      ? "bg-primary border-primary"
                      : "bg-white border-border"
                  }`}
                  activeOpacity={0.9}
                >
                  <Text
                    className={`text-sm font-manrope-bold ${
                      active ? "text-white" : "text-foreground"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="px-6 mb-8">
          <View className="flex-row items-center mb-4">
            <SunMoon size={18} color="#71717A" strokeWidth={2} />
            <Text className="text-xs font-manrope-bold text-muted ml-2 tracking-widest uppercase">
              Afternoon availability
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {AFTERNOON_TIMES.map((time) => {
              const disabled = time === "03:30 PM";
              const active = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  disabled={disabled}
                  onPress={() => setSelectedTime(time)}
                  className={`w-[31%] h-12 rounded-full items-center justify-center border ${
                    disabled
                      ? "bg-elevated border-border opacity-50"
                      : active
                        ? "bg-primary border-primary"
                        : "bg-white border-border active:opacity-90"
                  }`}
                >
                  <Text
                    className={`text-sm font-manrope-bold ${
                      disabled
                        ? "text-muted"
                        : active
                          ? "text-white"
                          : "text-foreground"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="mx-6 mb-6 p-5 bg-badge-red rounded-3xl flex-row items-center border border-border">
          <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center mr-4 border border-border">
            <Clock size={24} color="#93001B" strokeWidth={2} />
          </View>

          <View className="flex-1">
            <Text className="text-xs font-manrope-bold text-primary mb-1 tracking-widest uppercase">
              Estimated duration
            </Text>
            <Text className="text-sm font-manrope text-foreground leading-relaxed">
              Full Maintenance typically takes 2-3 hours. We recommend dropping
              off 15 mins early.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between px-6 py-5 border-t border-border bg-white pb-8">
        <View className="flex-1 pr-4">
          <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase">
            Booking summary
          </Text>
          <Text className="text-lg font-jakarta-extrabold text-foreground mt-1">
            Oct 23 · {selectedTime}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.booking.confirmation)}
          className="flex-row items-center bg-primary h-14 px-8 rounded-full active:opacity-90"
          style={primaryShadowStyle}
        >
          <Text className="text-white font-manrope-bold text-lg mr-2">
            Continue
          </Text>
          <ArrowRight size={20} color="#fff" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
