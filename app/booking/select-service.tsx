import { routes } from "@/constants/routes";
import { router } from "expo-router";
import { Bell, ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { Stepper } from "@/components/Stepper";
import { SERVICES } from "@/data/mockData";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectServiceScreen() {
  const [selectedService, setSelectedService] = useState(0);

  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  const estimatedTotal = SERVICES[selectedService].price;

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-sm font-semibold text-[#1a1a1a]">
            Select Service
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push(routes.notifications)}>
          <Bell size={24} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={1} />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="px-4 pt-5">
          {/* Heading */}
          <View className="flex-row justify-between mb-8">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-[#1a1a1a] leading-9">
                Maintenance
              </Text>
              <Text className="text-3xl font-bold text-[#1a1a1a] leading-9">
                Matters.
              </Text>

              <Text className="text-xs text-gray-500 mt-3 leading-4">
                Keep your KIA performing at its{"\n"}
                peak with certified technician{"\n"}
                support.
              </Text>
            </View>

            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/engine-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
              }}
              className="w-[100px] h-[100px] rounded-xl bg-gray-200"
            />
          </View>

          {/* Services */}
          {SERVICES.map((service, index) => {
            const isSelected = selectedService === index;

            return (
              <TouchableOpacity
                key={service.id}
                onPress={() => setSelectedService(index)}
                className={`rounded-2xl p-4 mb-3 relative ${
                  isSelected ? "bg-[#ffe4e8]" : "bg-gray-100"
                }`}
              >
                {/* Recommended */}
                {service.recommended && (
                  <View className="absolute top-3 right-3">
                    <Text className="text-[10px] font-bold tracking-wide text-[#c41e3a]">
                      RECOMMENDED
                    </Text>
                  </View>
                )}

                <View className="pr-6">
                  <View className="flex-row justify-between mb-3">
                    <View className="flex-row gap-3 flex-1">
                      <Text className="text-2xl">{service.icon}</Text>

                      <View className="flex-1">
                        <Text className="text-base font-bold text-[#1a1a1a] mb-1">
                          {service.title}
                        </Text>
                        <Text className="text-xs text-gray-500 leading-4">
                          {service.description}
                        </Text>
                      </View>
                    </View>

                    {!service.recommended && (
                      <View className="w-5 h-5 rounded-full border-2 border-[#c41e3a]" />
                    )}
                  </View>

                  <Text className="text-sm font-bold text-[#1a1a1a]">
                    Est. ${service.price}
                  </Text>
                </View>

                {service.recommended && (
                  <View className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#c41e3a]/10 justify-center items-center">
                    <Text className="text-xl text-[#c41e3a]">⊕</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Help */}
          <TouchableOpacity className="items-center py-5">
            <Text className="text-sm font-semibold text-[#c41e3a]">
              Can&apos;t find your service? →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center px-4 py-4 bg-[#fafafa] border-t border-gray-100">
        <View>
          <Text className="text-[11px] font-semibold tracking-wide text-gray-400">
            ESTIMATED TOTAL
          </Text>
          <Text className="text-2xl font-bold text-[#1a1a1a] mt-0.5">
            ${estimatedTotal.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.booking.selectAgency)}
          className="bg-[#c41e3a] rounded-full px-8 py-3.5"
        >
          <Text className="text-white font-bold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
