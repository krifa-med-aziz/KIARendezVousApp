import { routes } from "@/constants/routes";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity className="w-10 p-1" onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="text-[17px] font-semibold text-[#1a1a1a]">
            Select Appointment
          </Text>
        </View>

        <View className="w-10" />
      </View>

      <Stepper steps={STEPS} currentStep={3} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Month */}
        <View className="flex-row justify-between px-5 pt-6 pb-5">
          <View>
            <Text className="text-2xl font-bold text-[#1a1a1a]">
              October 2024
            </Text>
            <Text className="text-sm text-gray-400 mt-1">
              Next available: Today, 23 Oct
            </Text>
          </View>

          <TouchableOpacity className="w-11 h-11 rounded-xl border border-gray-200 items-center justify-center">
            <Feather name="calendar" size={20} color="#c41e3a" />
          </TouchableOpacity>
        </View>

        {/* Dates */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {DATES.map((d, i) => {
            const active = d.active;

            return (
              <TouchableOpacity
                key={i}
                className={`w-16 h-[88px] rounded-2xl items-center justify-center mr-3 ${
                  active ? "bg-[#c41e3a]" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-xs mb-1 ${
                    active ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {d.day}
                </Text>

                <Text
                  className={`text-xl font-semibold ${
                    active ? "text-white" : "text-[#1a1a1a]"
                  }`}
                >
                  {d.date}
                </Text>

                {active && (
                  <View className="w-1 h-1 rounded-full bg-white mt-1.5" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Morning */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={18}
              color="#888"
            />
            <Text className="text-xs font-semibold text-gray-400 ml-2 tracking-wide">
              MORNING AVAILABILITY
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {MORNING_TIMES.map((time) => {
              const active = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`w-[48%] h-13 rounded-xl items-center justify-center mb-3 ${
                    active ? "bg-[#c41e3a] rounded-full" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-[15px] ${
                      active ? "text-white font-semibold" : "text-[#1a1a1a]"
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
        <View className="px-5 mb-6">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={18}
              color="#888"
            />
            <Text className="text-xs font-semibold text-gray-400 ml-2 tracking-wide">
              AFTERNOON AVAILABILITY
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {AFTERNOON_TIMES.map((time, i) => {
              const disabled = time === "03:30 PM";

              return (
                <TouchableOpacity
                  key={time}
                  className={`w-[48%] h-13 rounded-xl items-center justify-center mb-3 ${
                    disabled ? "bg-gray-100 opacity-50" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-[15px] ${
                      disabled ? "text-gray-300" : "text-[#1a1a1a]"
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
        <View className="mx-5 mb-6 p-4 bg-[#fef7f7] rounded-2xl flex-row">
          <View className="w-11 h-11 rounded-full bg-white items-center justify-center mr-3">
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color="#c41e3a"
            />
          </View>

          <View className="flex-1">
            <Text className="text-xs font-semibold text-[#c41e3a] mb-1 tracking-wide">
              ESTIMATED DURATION
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              Full Maintenance typically takes 2-3 hours. We recommend dropping
              off 15 mins early.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom */}
      <View className="flex-row items-center justify-between px-5 py-4 border-t border-gray-100 bg-white">
        <View className="flex-1">
          <Text className="text-[11px] text-gray-400 tracking-wide">
            BOOKING SUMMARY
          </Text>
          <Text className="text-base font-semibold text-[#1a1a1a] mt-1">
            Oct 23 · {selectedTime}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.booking.confirmation)}
          className="flex-row items-center bg-[#c41e3a] px-7 py-4 rounded-full"
        >
          <Text className="text-white font-semibold mr-2">Continue</Text>
          <Feather name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
