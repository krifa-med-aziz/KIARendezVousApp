import { routes } from "@/constants/routes";
import { router } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import { Bell, ChevronLeft, CheckCircle2 } from "lucide-react-native";
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
            Select Service
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="active:opacity-70 p-1 -mr-1"
        >
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={1} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6">
          {/* Heading */}
          <View className="flex-row justify-between mb-8">
            <View className="flex-1 pr-4">
              <Text className="text-4xl font-medium text-text-primary leading-tight">
                Maintenance
              </Text>
              <Text className="text-4xl font-extrabold text-primary leading-tight">
                Matters.
              </Text>

              <Text className="text-sm text-text-secondary mt-3 leading-relaxed">
                Keep your KIA performing at its{"\n"}
                peak with certified technician{"\n"}
                support.
              </Text>
            </View>

            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/engine-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
              }}
              className="w-[100px] h-[100px] rounded-2xl bg-border shadow-subtle"
            />
          </View>

          {/* Services */}
          {SERVICES.map((service, index) => {
            const isSelected = selectedService === index;

            return (
              <TouchableOpacity
                key={service.id}
                onPress={() => setSelectedService(index)}
                className={`rounded-2xl p-5 mb-4 relative shadow-subtle border active:opacity-80 transition-all ${
                  isSelected
                    ? "bg-primary-soft border-primary"
                    : "bg-surface border-border"
                }`}
              >
                {/* Recommended */}
                {service.recommended && (
                  <View className="absolute top-4 right-4">
                    <Text className="text-[10px] font-bold tracking-widest text-primary uppercase">
                      RECOMMENDED
                    </Text>
                  </View>
                )}

                <View className="pr-6">
                  <View className="flex-row mb-4 items-start">
                    <View className="w-12 h-12 rounded-full bg-background border border-border items-center justify-center mr-4">
                      {service.icon &&
                        (() => {
                          const IconComponent = (LucideIcons as any)[
                            service.icon
                          ];
                          return IconComponent ? (
                            <IconComponent size={24} color="#E60012" />
                          ) : null;
                        })()}
                    </View>

                    <View className="flex-1 pt-1">
                      <Text className="text-lg font-bold text-text-primary mb-1">
                        {service.title}
                      </Text>
                      <Text className="text-sm text-text-secondary leading-5 pr-4">
                        {service.description}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-lg font-extrabold text-text-primary ml-16">
                    Est. ${service.price}
                  </Text>
                </View>

                {isSelected && (
                  <View className="absolute bottom-5 right-5 bg-surface rounded-full">
                    <CheckCircle2 size={24} color="#E60012" />
                  </View>
                )}
                {!isSelected && service.recommended && (
                  <View className="absolute bottom-5 right-5 w-6 h-6 rounded-full border-2 border-primary/30 justify-center items-center">
                    <Text className="text-xs font-bold text-primary/50">+</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Help */}
          <TouchableOpacity className="items-center py-6 mt-2 active:opacity-70">
            <Text className="text-sm font-bold text-primary tracking-wide">
              Can't find your service?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center px-6 py-5 bg-surface border-t border-border pb-8">
        <View>
          <Text className="text-[10px] font-bold tracking-widest text-text-muted uppercase">
            ESTIMATED TOTAL
          </Text>
          <Text className="text-2xl font-extrabold text-text-primary mt-1">
            ${estimatedTotal.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.booking.selectAgency)}
          className="bg-primary rounded-xl px-10 h-14 justify-center items-center shadow-card active:opacity-80"
        >
          <Text className="text-white font-bold text-lg">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
