import { TimelineItem } from "@/components/TimelineItem";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { routes } from "@/constants/routes";
import { cardShadowStyle, primaryShadowStyle } from "@/constants/shadows";
import { getAgencies, getServices, getVehicles } from "@/lib/api/kiaApi";
import { paramFirst, parsePositiveInt } from "@/lib/routeParams";
import { formatBookingDateLabel, weekdayFromIso } from "@/lib/bookingFormat";
import type { Agency, BookingDateOption, Service, Vehicle } from "@/lib/types";
import { ArrowLeft, Building2, Calendar, Car } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STEPS = [
  "Appointment Confirmed",
  "Vehicle Received",
  "Service In Progress",
  "Quality Check",
  "Ready for Pickup",
] as const;

const ACTIVE_INDEX = 2;

export default function ServiceTrackingScreen() {
  const params = useLocalSearchParams<{
    appointmentId?: string | string[];
    vehicleId?: string | string[];
    serviceId?: string | string[];
    agencyId?: string | string[];
    date?: string | string[];
    time?: string | string[];
  }>();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const vehicleId = parsePositiveInt(paramFirst(params.vehicleId));
  const serviceId = parsePositiveInt(paramFirst(params.serviceId));
  const agencyId = parsePositiveInt(paramFirst(params.agencyId));
  const dateStr = paramFirst(params.date);
  const timeStr = paramFirst(params.time);
  const hasContext =
    vehicleId !== null &&
    serviceId !== null &&
    agencyId !== null &&
    !!dateStr &&
    !!timeStr;

  useEffect(() => {
    if (!hasContext) return;
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [vehiclesData, servicesData, agenciesData] = await Promise.all([
          getVehicles(),
          getServices(),
          getAgencies(serviceId),
        ]);
        if (!mounted) return;
        setVehicles(vehiclesData);
        setServices(servicesData);
        setAgencies(agenciesData);
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load details",
          );
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [hasContext, serviceId]);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === vehicleId) ?? null,
    [vehicleId, vehicles],
  );
  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId) ?? null,
    [serviceId, services],
  );
  const selectedAgency = useMemo(
    () => agencies.find((agency) => agency.id === agencyId) ?? null,
    [agencies, agencyId],
  );
  const selectedDate = useMemo<BookingDateOption | null>(() => {
    if (!dateStr) return null;
    const date = new Date(`${dateStr}T12:00:00`);
    return {
      id: dateStr,
      day: weekdayFromIso(dateStr).slice(0, 3).toUpperCase(),
      date: String(date.getDate()),
      monthLabel: date.toLocaleDateString("en-US", { month: "long" }),
      year: date.getFullYear(),
    };
  }, [dateStr]);
  const selectedTime = timeStr ?? null;

  const contactAgency = () => {
    setContactOpen(true);
  };

  const phone = "tel:+18005550199";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="flex-1 text-center mr-8 text-lg font-jakarta-bold text-foreground">
          Service Tracking
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading && hasContext && (
          <Text className="mx-6 mt-4 text-sm font-manrope text-muted">
            Loading appointment details...
          </Text>
        )}
        {error && hasContext && (
          <Text className="mx-6 mt-4 text-sm font-manrope text-primary">
            {error}
          </Text>
        )}

        {!hasContext ? (
          <View
            className="mx-6 mt-8 p-6 bg-white rounded-3xl border border-border"
            style={cardShadowStyle}
          >
            <Text className="text-base font-manrope text-muted text-center leading-relaxed">
              No active service to track. Book an appointment to see live
              progress here.
            </Text>
            <PrimaryButton
              label="Book service"
              onPress={() => router.push(routes.booking.selectVehicle)}
              className="mt-6"
              style={primaryShadowStyle}
            />
          </View>
        ) : (
          <>
            <View
              className="mx-6 mt-6 bg-white rounded-3xl p-6 border border-border"
              style={cardShadowStyle}
            >
              <Text className="text-[10px] font-manrope-bold text-primary tracking-widest uppercase mb-4">
                Active service
              </Text>
              <View className="flex-row items-start gap-3 mb-4">
                <View className="w-11 h-11 rounded-2xl bg-badge-red items-center justify-center border border-border">
                  <Car size={22} color="#93001B" strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-jakarta-extrabold text-foreground">
                    {selectedVehicle?.name}
                  </Text>
                  <Text className="text-sm font-manrope text-muted mt-1">
                    {selectedService?.title ?? "—"}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2 mb-2">
                <Building2 size={16} color="#71717A" strokeWidth={2} />
                <Text className="text-sm font-manrope-bold text-foreground flex-1">
                  {selectedAgency?.name}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Calendar size={16} color="#71717A" strokeWidth={2} />
                <Text className="text-sm font-manrope text-muted">
                  {selectedDate && formatBookingDateLabel(selectedDate)}
                  {selectedDate && selectedTime ? " · " : ""}
                  {selectedTime}
                  {selectedDate ? ` · ${weekdayFromIso(selectedDate.id)}` : ""}
                </Text>
              </View>
            </View>

            <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase px-6 mt-10 mb-4">
              Progress
            </Text>
            <View
              className="mx-6 bg-white rounded-3xl p-6 border border-border"
              style={cardShadowStyle}
            >
              {STEPS.map((title, index) => (
                <TimelineItem
                  key={title}
                  title={title}
                  isActive={index === ACTIVE_INDEX}
                  isDone={index < ACTIVE_INDEX}
                  isLast={index === STEPS.length - 1}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {hasContext && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-border px-6 pt-4 pb-8 gap-3">
          <PrimaryButton
            label="Contact Agency"
            onPress={contactAgency}
            style={primaryShadowStyle}
          />
          <SecondaryButton
            label="View Appointment Details"
            onPress={() => router.replace(routes.bookings)}
          />
        </View>
      )}

      <ConfirmModal
        visible={contactOpen}
        title="Contact agency"
        message={`Call ${selectedAgency?.name ?? "your service center"}?`}
        confirmLabel="Call"
        cancelLabel="Cancel"
        onCancel={() => setContactOpen(false)}
        onConfirm={() => {
          setContactOpen(false);
          Linking.openURL(phone);
        }}
      />
    </SafeAreaView>
  );
}
