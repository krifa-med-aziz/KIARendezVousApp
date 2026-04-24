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
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          onPress={() => router.back()}
          className="active:opacity-70 p-1 -ml-1"
        >
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
            SELECT VEHICLE
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="active:opacity-70 p-1 -mr-1"
        >
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={0} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading Section */}
        <View className="mb-8">
          <Text className="text-4xl font-medium text-text-primary mb-1">
            Which car are we
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Text className="text-4xl font-extrabold text-primary">
              servicing
            </Text>
            <Text className="text-4xl font-medium text-text-primary">
              today?
            </Text>
          </View>
          <Text className="text-sm font-normal text-text-secondary leading-relaxed mt-4">
            Choose a vehicle from your garage to{"\n"}
            continue with the booking process.
          </Text>
        </View>

        {/* Vehicle Cards */}
        {VEHICLES.map((vehicle, index) => (
          <TouchableOpacity
            key={vehicle.id}
            className={`bg-surface rounded-2xl p-5 mb-4 flex-row items-center gap-4 border shadow-subtle active:opacity-80 transition-all ${
              selectedVehicle === index
                ? "border-primary bg-primary-soft/30"
                : "border-border"
            }`}
            onPress={() => setSelectedVehicle(index)}
          >
            {/* Selected Checkmark */}
            {selectedVehicle === index && (
              <View className="absolute top-4 right-4 bg-primary rounded-full p-1 shadow-sm">
                <Check size={14} color="#fff" strokeWidth={3} />
              </View>
            )}

            {/* Vehicle Image */}
            <Image
              source={{ uri: vehicle.image || DEFAULT_VEHICLE_IMAGE }}
              className="w-20 h-20 rounded-xl bg-background border border-border/50"
            />

            {/* Vehicle Info */}
            <View className="flex-1 pr-6">
              <Text className="text-lg font-bold text-text-primary mb-1">
                {vehicle.name}
              </Text>
              <Text className="text-sm font-medium text-text-secondary mb-3">
                {vehicle.plate} • {vehicle.mileage}
              </Text>

              {/* Badges */}
              <View className="flex-row gap-2 flex-wrap">
                <View className="bg-primary-soft rounded-md px-2 py-1">
                  <Text className="text-[10px] font-bold text-primary tracking-widest uppercase">
                    {vehicle.type}
                  </Text>
                </View>
                {vehicle.badge && (
                  <View className="bg-background border border-border rounded-md px-2 py-1">
                    <Text className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">
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
          className="bg-transparent rounded-2xl py-8 px-4 items-center justify-center border-2 border-dashed border-border mb-8 active:opacity-70"
          onPress={() => router.push(routes.addVehicle)}
        >
          <View className="w-12 h-12 bg-surface rounded-full items-center justify-center shadow-subtle mb-3">
            <Plus size={24} color="#E60012" />
          </View>
          <Text className="text-base font-bold text-text-primary">
            Register another vehicle
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          className="bg-primary rounded-xl h-14 items-center justify-center mb-4 active:opacity-80 shadow-card"
          onPress={() => router.push(routes.booking.selectService)}
        >
          <Text className="text-lg font-bold text-white">
            Continue to Service
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
