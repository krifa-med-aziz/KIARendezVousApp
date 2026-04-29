import { routes } from "@/constants/routes";
import {
  cardShadowStyle,
  primaryShadowStyle,
  primaryTileShadowStyle,
  tileShadowStyle,
} from "@/constants/shadows";
import { useBooking } from "@/context/BookingContext";
import { getAgencies, getServices, getVehicles } from "@/lib/api/kiaApi";
import { formatBookingDateLabel } from "@/lib/bookingFormat";
import type { Agency, Service, Vehicle } from "@/lib/types";
import { router } from "expo-router";
import { Bell, CalendarPlus, Car } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    isBookingComplete,
    selectedServiceId,
    selectedAgencyId,
    selectedDate,
    selectedTime,
    selectedVehicleId,
  } = useBooking();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const hasUpcoming = isBookingComplete();

  useEffect(() => {
    if (!hasUpcoming || !selectedServiceId) return;
    let mounted = true;
    const load = async () => {
      try {
        const [vehiclesData, servicesData, agenciesData] = await Promise.all([
          getVehicles(),
          getServices(),
          getAgencies(selectedServiceId),
        ]);
        if (!mounted) return;
        setVehicles(vehiclesData);
        setServices(servicesData);
        setAgencies(agenciesData);
      } catch {
        if (!mounted) return;
        setVehicles([]);
        setServices([]);
        setAgencies([]);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [hasUpcoming, selectedServiceId]);

  const selectedVehicle = useMemo(
    () => vehicles.find((item) => item.id === selectedVehicleId) ?? null,
    [selectedVehicleId, vehicles],
  );
  const selectedService = useMemo(
    () => services.find((item) => item.id === selectedServiceId) ?? null,
    [selectedServiceId, services],
  );
  const selectedAgency = useMemo(
    () => agencies.find((item) => item.id === selectedAgencyId) ?? null,
    [agencies, selectedAgencyId],
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="pt-6 px-6">
          <View className="flex-row items-center justify-between mb-8">
            
            <Text className="text-xl font-jakarta-bold text-foreground tracking-wide">
              KIA SERVICE
            </Text>

            <TouchableOpacity
              className="p-2 relative"
              activeOpacity={0.7}
              onPress={() => router.push(routes.notifications)}
            >
              <Bell size={22} color="#93001B" strokeWidth={2} />
              <View className="absolute w-2 h-2 bg-primary rounded-full -top-1 -right-1" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between mb-10">
            <TouchableOpacity
              onPress={() => router.push(routes.booking.selectVehicle)}
              className="w-[48%] aspect-square rounded-3xl bg-primary p-6 justify-between"
              style={primaryTileShadowStyle}
              activeOpacity={0.9}
            >
              <CalendarPlus size={28} color="#fff" strokeWidth={2} />

              <View>
                <Text className="text-white text-lg font-jakarta-bold">
                  Book Service
                </Text>
                <Text className="text-white text-xs font-manrope opacity-80">
                  Schedule maintenance
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(routes.addVehicle)}
              className="w-[48%] aspect-square rounded-3xl bg-white p-6 justify-between border border-border"
              style={tileShadowStyle}
              activeOpacity={0.9}
            >
              <Car size={28} color="#93001B" strokeWidth={2} />

              <View>
                <Text className="text-foreground text-lg font-jakarta-bold">
                  Add Vehicle
                </Text>
                <Text className="text-muted text-xs font-manrope">
                  Register new car
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mb-8">
            <View className="flex-row justify-between items-end mb-5">
              <Text className="text-2xl font-jakarta-bold text-foreground">
                {hasUpcoming ? "Upcoming Appointment" : "Your garage"}
              </Text>
              {hasUpcoming && (
                <Text className="text-xs font-manrope-bold text-primary tracking-wide">
                  SCHEDULED
                </Text>
              )}
            </View>

            {hasUpcoming ? (
              <View
                className="bg-white rounded-3xl p-6 border border-border"
                style={cardShadowStyle}
              >
                <Badge variant="red">READY TO CONFIRM</Badge>

                <Text className="text-2xl font-jakarta-bold text-foreground mb-2 mt-4">
                  {selectedService?.title}
                </Text>

                <Text className="text-sm font-manrope text-muted mb-6">
                  {selectedAgency?.name} · {selectedVehicle?.name}
                </Text>

                <View className="flex-row justify-between mb-6">
                  <View className="w-[48%] bg-elevated p-4 rounded-2xl">
                    <Text className="text-xs text-label font-manrope-semibold mb-1 tracking-wide uppercase">
                      DATE
                    </Text>
                    <Text className="text-base font-manrope-bold text-foreground">
                      {selectedDate
                        ? formatBookingDateLabel(selectedDate)
                        : "—"}
                    </Text>
                  </View>

                  <View className="w-[48%] bg-elevated p-4 rounded-2xl">
                    <Text className="text-xs text-label font-manrope-semibold mb-1 tracking-wide uppercase">
                      TIME
                    </Text>
                    <Text className="text-base font-manrope-bold text-foreground">
                      {selectedTime ?? "—"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row gap-3">
                  <PrimaryButton
                    label="Continue booking"
                    onPress={() =>
                      router.push(routes.booking.confirmation)
                    }
                    className="flex-1"
                    style={primaryShadowStyle}
                  />
                  <SecondaryButton
                    label="Edit"
                    onPress={() =>
                      router.push(routes.booking.selectVehicle)
                    }
                    className="flex-1"
                  />
                </View>
              </View>
            ) : (
              <View
                className="bg-white rounded-3xl p-6 border border-border"
                style={cardShadowStyle}
              >
                <Text className="text-base font-manrope text-muted leading-relaxed mb-6">
                  You have no appointment in progress. Book a service to see
                  your schedule here.
                </Text>
                <PrimaryButton
                  label="Book service"
                  onPress={() => router.push(routes.booking.selectVehicle)}
                  style={primaryShadowStyle}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
