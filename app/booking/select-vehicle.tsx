import { routes } from "@/constants/routes";
import { router } from "expo-router";
import { Bell, ChevronLeft, Plus, Check } from "lucide-react-native";
import { useState } from "react";
import { Stepper } from "@/components/Stepper";
import { DEFAULT_VEHICLE_IMAGE, VEHICLES } from "@/data/mockData";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectVehicleScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState(0);

  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-[#f0f0f0]">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-[14px] font-bold tracking-[1.5px] text-[#1a1a1a]">
            SELECT VEHICLE
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push(routes.notifications)}>
          <Bell size={24} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={0} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 32,
        }}
      >
        {/* Heading Section */}
        <View className="mb-8">
          <Text className="text-[28px] font-semibold text-[#1a1a1a] leading-8">
            Which car are we
          </Text>
          <View className="flex-row flex-wrap gap-1">
            <Text className="text-[28px] font-bold text-[#c41e3a] leading-8">
              servicing
            </Text>
            <Text className="text-[28px] font-semibold text-[#1a1a1a] leading-8">
              today?
            </Text>
          </View>
          <Text className="text-[14px] font-normal text-[#666] leading-5 mt-3">
            Choose a vehicle from your garage to{"\n"}
            continue with the booking process.
          </Text>
        </View>

        {/* Vehicle Cards */}
        {VEHICLES.map((vehicle, index) => (
          <TouchableOpacity
            key={vehicle.id}
            className={`bg-white rounded-[20px] p-4 mb-4 flex-row items-center gap-4 border-2 ${
              selectedVehicle === index
                ? "border-[#c41e3a]"
                : "border-[#f0f0f0]"
            }`}
            onPress={() => setSelectedVehicle(index)}
          >
            {/* Selected Checkmark */}
            {selectedVehicle === index && (
              <View className="absolute top-3 right-3 bg-white rounded-full p-0.5">
                <Check size={24} color="#c41e3a" fill="#c41e3a" />
              </View>
            )}

            {/* Vehicle Image */}
            <Image
              source={{ uri: vehicle.image || DEFAULT_VEHICLE_IMAGE }}
              className="w-20 h-20 rounded-xl bg-[#e8e8e8]"
            />

            {/* Vehicle Info */}
            <View className="flex-1">
              <Text className="text-[16px] font-bold text-[#1a1a1a] mb-1">
                {vehicle.name}
              </Text>
              <Text className="text-[12px] font-normal text-[#666] mb-2.5">
                {vehicle.plate} • {vehicle.mileage}
              </Text>

              {/* Badges */}
              <View className="flex-row gap-2 flex-wrap">
                <View className="bg-[#ffe4e8] rounded px-2 py-1">
                  <Text className="text-[10px] font-bold text-[#c41e3a] tracking-[0.5px]">
                    {vehicle.type}
                  </Text>
                </View>
                {vehicle.badge && (
                  <View className="bg-[#f0f0f0] rounded px-2 py-1">
                    <Text className="text-[10px] font-bold text-[#666] tracking-[0.5px]">
                      {vehicle.badge}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Register Another Vehicle */}
        <TouchableOpacity
          className="bg-white rounded-2xl py-8 px-4 items-center justify-center border-2 border-dashed border-[#e8e8e8] mb-6"
          onPress={() => router.push(routes.addVehicle)}
        >
          <Plus size={28} color="#c41e3a" />
          <Text className="text-[16px] font-semibold text-[#1a1a1a] mt-3">
            Register another vehicle
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          className="bg-[#c41e3a] rounded-[28px] py-4 items-center mb-3"
          onPress={() => router.push(routes.booking.selectService)}
        >
          <Text className="text-[16px] font-bold text-white">
            Continue to Service →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
