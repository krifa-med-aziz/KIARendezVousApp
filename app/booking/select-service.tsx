import { routes } from "@/constants/routes";
import { primaryShadowStyle } from "@/constants/shadows";
import { useBooking } from "@/context/BookingContext";
import { router } from "expo-router";
import * as LucideIcons from "lucide-react-native";
import { Bell, ChevronLeft, CheckCircle2 } from "lucide-react-native";
import { Stepper } from "@/components/Stepper";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SERVICES } from "@/data/mockData";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectServiceScreen() {
  const { selectedService, setService } = useBooking();
  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  const estimatedTotal = selectedService?.price ?? 0;

  const onNext = () => {
    if (!selectedService) return;
    router.push(routes.booking.selectAgency);
  };

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
            Select Service
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="active:opacity-70 p-1 -mr-1"
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={1} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6">
          <View className="flex-row justify-between mb-10">
            <View className="flex-1 pr-4">
              <Text className="text-3xl font-jakarta-bold text-foreground leading-tight">
                Maintenance
              </Text>
              <Text className="text-3xl font-jakarta-extrabold text-primary leading-tight">
                matters.
              </Text>

              <Text className="text-sm font-manrope text-muted mt-3 leading-relaxed">
                Keep your KIA performing at its peak with certified technician
                support.
              </Text>
            </View>

            <Image
              source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/engine-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
              }}
              className="w-[100px] h-[100px] rounded-3xl bg-border"
            />
          </View>

          {SERVICES.map((service) => {
            const isSelected = selectedService?.id === service.id;

            return (
              <TouchableOpacity
                key={service.id}
                onPress={() => setService(service)}
                className={`rounded-3xl p-6 mb-4 border ${
                  isSelected
                    ? "bg-badge-red border-primary"
                    : "bg-white border-border"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.06,
                  shadowRadius: 12,
                  elevation: 3,
                }}
                activeOpacity={0.9}
              >
                {service.recommended && (
                  <View className="absolute top-4 right-4">
                    <Text className="text-[10px] font-manrope-bold tracking-widest text-primary uppercase">
                      Recommended
                    </Text>
                  </View>
                )}

                <View className="pr-6">
                  <View className="flex-row mb-4 items-start">
                    <View className="w-12 h-12 rounded-full bg-elevated border border-border items-center justify-center mr-4">
                      {service.icon &&
                        (() => {
                          const IconComponent = (LucideIcons as any)[
                            service.icon
                          ];
                          return IconComponent ? (
                            <IconComponent size={24} color="#93001B" />
                          ) : null;
                        })()}
                    </View>

                    <View className="flex-1 pt-1">
                      <Text className="text-lg font-jakarta-bold text-foreground mb-1">
                        {service.title}
                      </Text>
                      <Text className="text-sm font-manrope text-muted leading-5 pr-4">
                        {service.description}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-lg font-jakarta-extrabold text-foreground ml-16">
                    Est. ${service.price}
                  </Text>
                </View>

                {isSelected && (
                  <View className="absolute bottom-5 right-5 bg-white rounded-full">
                    <CheckCircle2 size={24} color="#93001B" strokeWidth={2} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity className="items-center py-6 mt-2 active:opacity-70">
            <Text className="text-sm font-manrope-bold text-primary tracking-wide">
              Can&apos;t find your service?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center px-6 py-5 bg-white border-t border-border pb-8">
        <View>
          <Text className="text-[10px] font-manrope-bold tracking-widest text-muted uppercase">
            Estimated total
          </Text>
          <Text className="text-2xl font-jakarta-extrabold text-foreground mt-1">
            ${estimatedTotal.toFixed(2)}
          </Text>
        </View>

        <PrimaryButton
          label="Next"
          onPress={onNext}
          disabled={!selectedService}
          className="px-10"
          style={primaryShadowStyle}
        />
      </View>
    </SafeAreaView>
  );
}
