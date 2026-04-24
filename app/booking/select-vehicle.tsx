import { routes } from "@/constants/routes";
import { primaryShadowStyle } from "@/constants/shadows";
import { router } from "expo-router";
import { Bell, ChevronLeft, Plus, Check } from "lucide-react-native";
import { useState } from "react";
import { Stepper } from "@/components/Stepper";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { DEFAULT_VEHICLE_IMAGE, VEHICLES } from "@/data/mockData";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectVehicleScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState(0);

  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          onPress={() => router.back()}
          className="active:opacity-70 p-1 -ml-1"
        >
          <ChevronLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
            Select Vehicle
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="active:opacity-70 p-1 -mr-1"
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
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
        <View className="mb-10">
          <Text className="text-3xl font-jakarta-bold text-foreground mb-1">
            Which car are we
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Text className="text-3xl font-jakarta-extrabold text-primary">
              servicing
            </Text>
            <Text className="text-3xl font-jakarta-bold text-foreground">
              today?
            </Text>
          </View>
          <Text className="text-sm font-manrope text-muted leading-relaxed mt-4">
            Choose a vehicle from your garage to continue with the booking
            process.
          </Text>
        </View>

        {VEHICLES.map((vehicle, index) => (
          <TouchableOpacity
            key={vehicle.id}
            className={`bg-white rounded-3xl p-5 mb-4 flex-row items-center gap-4 border ${
              selectedVehicle === index
                ? "border-primary bg-badge-red/40"
                : "border-border"
            }`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 3,
            }}
            onPress={() => setSelectedVehicle(index)}
            activeOpacity={0.9}
          >
            {selectedVehicle === index && (
              <View className="absolute top-4 right-4 bg-primary rounded-full p-1">
                <Check size={14} color="#fff" strokeWidth={3} />
              </View>
            )}

            <Image
              source={{ uri: vehicle.image || DEFAULT_VEHICLE_IMAGE }}
              className="w-20 h-20 rounded-2xl bg-elevated border border-border"
            />

            <View className="flex-1 pr-6">
              <Text className="text-lg font-jakarta-bold text-foreground mb-1">
                {vehicle.name}
              </Text>
              <Text className="text-sm font-manrope text-muted mb-3">
                {vehicle.plate} • {vehicle.mileage}
              </Text>

              <View className="flex-row gap-2 flex-wrap">
                <View className="bg-badge-red rounded-full px-3 py-1">
                  <Text className="text-[10px] font-manrope-bold text-primary tracking-widest uppercase">
                    {vehicle.type}
                  </Text>
                </View>
                {vehicle.badge && (
                  <View className="bg-elevated border border-border rounded-full px-3 py-1">
                    <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase">
                      {vehicle.badge}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          className="bg-transparent rounded-3xl py-8 px-4 items-center justify-center border-2 border-dashed border-border mb-8 active:opacity-70"
          onPress={() => router.push(routes.addVehicle)}
        >
          <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3 border border-border">
            <Plus size={24} color="#93001B" strokeWidth={2} />
          </View>
          <Text className="text-base font-manrope-bold text-foreground">
            Register another vehicle
          </Text>
        </TouchableOpacity>

        <PrimaryButton
          label="Continue to service"
          onPress={() => router.push(routes.booking.selectService)}
          className="mb-4"
          style={primaryShadowStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
