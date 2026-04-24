import { routes } from "@/constants/routes";
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
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          className="w-10 p-1 -ml-1 active:opacity-70"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
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
        {/* Month */}
        <View className="flex-row justify-between px-6 pt-8 pb-6">
          <View>
            <Text className="text-3xl font-extrabold text-text-primary">
              October 2024
            </Text>
            <Text className="text-sm font-medium text-text-secondary mt-1">
              Next available: Today, 23 Oct
            </Text>
          </View>

          <TouchableOpacity className="w-12 h-12 rounded-xl bg-surface border border-border items-center justify-center shadow-subtle active:opacity-70">
            <Calendar size={20} color="#E60012" />
          </TouchableOpacity>
        </View>

        {/* Dates */}
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
                className={`w-[72px] py-4 rounded-2xl items-center justify-center border transition-all ${
                  active
                    ? "bg-primary border-primary shadow-card"
                    : "bg-surface border-border shadow-subtle"
                }`}
              >
                <Text
                  className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                    active ? "text-white/80" : "text-text-muted"
                  }`}
                >
                  {d.day}
                </Text>

                <Text
                  className={`text-2xl font-extrabold ${
                    active ? "text-white" : "text-text-primary"
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

        {/* Morning */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center mb-4">
            <Sun size={18} color="#9CA3AF" />
            <Text className="text-xs font-bold text-text-muted ml-2 tracking-widest uppercase">
              MORNING AVAILABILITY
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {MORNING_TIMES.map((time) => {
              const active = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`w-[31%] h-12 rounded-xl items-center justify-center border active:opacity-80 transition-all ${
                    active
                      ? "bg-primary border-primary shadow-card"
                      : "bg-surface border-border shadow-subtle"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      active ? "text-white" : "text-text-primary"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Afternoon */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center mb-4">
            <SunMoon size={18} color="#9CA3AF" />
            <Text className="text-xs font-bold text-text-muted ml-2 tracking-widest uppercase">
              AFTERNOON AVAILABILITY
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {AFTERNOON_TIMES.map((time, i) => {
              const disabled = time === "03:30 PM";
              const active = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  disabled={disabled}
                  onPress={() => setSelectedTime(time)}
                  className={`w-[31%] h-12 rounded-xl items-center justify-center border transition-all ${
                    disabled
                      ? "bg-background border-border/50 opacity-50"
                      : active
                        ? "bg-primary border-primary shadow-card"
                        : "bg-surface border-border shadow-subtle active:opacity-80"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      disabled
                        ? "text-text-muted"
                        : active
                          ? "text-white"
                          : "text-text-primary"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Duration */}
        <View className="mx-6 mb-6 p-5 bg-primary-soft rounded-2xl flex-row items-center">
          <View className="w-12 h-12 rounded-xl bg-surface items-center justify-center mr-4 shadow-subtle border border-border/50">
            <Clock size={24} color="#E60012" />
          </View>

          <View className="flex-1">
            <Text className="text-xs font-bold text-primary mb-1 tracking-widest uppercase">
              ESTIMATED DURATION
            </Text>
            <Text className="text-sm text-text-primary leading-relaxed font-medium">
              Full Maintenance typically takes 2-3 hours. We recommend dropping
              off 15 mins early.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between px-6 py-5 border-t border-border bg-surface pb-8">
        <View className="flex-1 pr-4">
          <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
            BOOKING SUMMARY
          </Text>
          <Text className="text-lg font-extrabold text-text-primary mt-1">
            Oct 23 · {selectedTime}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.booking.confirmation)}
          className="flex-row items-center bg-primary h-14 px-8 rounded-xl active:opacity-80 shadow-card"
        >
          <Text className="text-white font-bold text-lg mr-2">Continue</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
