import { routes } from "@/constants/routes";
import {
  cardShadowStyle,
  primaryShadowStyle,
  primaryTileShadowStyle,
  tileShadowStyle,
} from "@/constants/shadows";
import { useAppointments } from "@/context/AppointmentsContext";
import { useBooking } from "@/context/BookingContext";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Badge } from "@/components/ui/Badge";
import {
  formatAppointmentDateDisplay,
  nextUpcomingAppointment,
} from "@/lib/appointmentFilters";
import {
  getAgencies,
  getServices,
  getVehicles,
} from "@/lib/api/kiaApi";
import { formatBookingDateLabel } from "@/lib/bookingFormat";
import type { Agency, Appointment, Service, Vehicle } from "@/lib/types";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Bell, CalendarPlus, Car, ChevronRight } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_VEHICLE_IMAGE =
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80";

function useUpcomingRow(appointment: Appointment | null) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!appointment) {
      setVehicle(null);
      setService(null);
      setAgency(null);
      return;
    }
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const [vehicles, services, agencies] = await Promise.all([
          getVehicles(),
          getServices(),
          getAgencies(appointment.serviceId),
        ]);
        if (!mounted) return;
        setVehicle(vehicles.find((v) => v.id === appointment.vehicleId) ?? null);
        setService(services.find((s) => s.id === appointment.serviceId) ?? null);
        setAgency(agencies.find((a) => a.id === appointment.agencyId) ?? null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [appointment?.id, appointment?.vehicleId, appointment?.serviceId]);

  return { vehicle, service, agency, loading };
}

export default function HomeScreen() {
  const {
    isBookingComplete,
    selectedServiceId,
    selectedAgencyId,
    selectedDate,
    selectedTime,
    selectedVehicleId,
  } = useBooking();
  const { appointments, isLoading: apptLoading, refresh } = useAppointments();
  const upcoming = useMemo(
    () => nextUpcomingAppointment(appointments),
    [appointments],
  );
  const { vehicle, service, agency, loading: upcomingJoinLoading } =
    useUpcomingRow(upcoming);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [draftVehicles, setDraftVehicles] = useState<Vehicle[]>([]);
  const [draftServices, setDraftServices] = useState<Service[]>([]);
  const [draftAgencies, setDraftAgencies] = useState<Agency[]>([]);
  const draftComplete = isBookingComplete();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  useEffect(() => {
    let mounted = true;
    getVehicles().then((v) => {
      if (mounted) setVehicles(v);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!draftComplete || !selectedServiceId) {
      setDraftVehicles([]);
      setDraftServices([]);
      setDraftAgencies([]);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const [v, s, a] = await Promise.all([
          getVehicles(),
          getServices(),
          getAgencies(selectedServiceId),
        ]);
        if (!mounted) return;
        setDraftVehicles(v);
        setDraftServices(s);
        setDraftAgencies(a);
      } catch {
        if (mounted) {
          setDraftVehicles([]);
          setDraftServices([]);
          setDraftAgencies([]);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [draftComplete, selectedServiceId]);

  const draftVehicle = useMemo(
    () => draftVehicles.find((x) => x.id === selectedVehicleId) ?? null,
    [draftVehicles, selectedVehicleId],
  );
  const draftService = useMemo(
    () => draftServices.find((x) => x.id === selectedServiceId) ?? null,
    [draftServices, selectedServiceId],
  );
  const draftAgency = useMemo(
    () => draftAgencies.find((x) => x.id === selectedAgencyId) ?? null,
    [draftAgencies, selectedAgencyId],
  );

  const previewVehicles = vehicles.slice(0, 3);

  const upcomingDateLabel = upcoming
    ? formatAppointmentDateDisplay(upcoming)
    : "";
  const upcomingTimeLabel = upcoming?.time ?? "";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
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

          <View className="flex-row justify-between mb-8">
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

          {(apptLoading || upcomingJoinLoading) && upcoming ? (
            <LoadingIndicator message="Loading schedule…" />
          ) : null}

          {upcoming ? (
            <View className="mb-8">
              <View className="flex-row justify-between items-end mb-5">
                <Text className="text-2xl font-jakarta-bold text-foreground">
                  Upcoming appointment
                </Text>
                <Text className="text-xs font-manrope-bold text-primary tracking-wide">
                  CONFIRMED
                </Text>
              </View>
              <View
                className="bg-white rounded-3xl p-6 border border-border"
                style={cardShadowStyle}
              >
                <Badge variant="red">SCHEDULED</Badge>
                <Text className="text-2xl font-jakarta-bold text-foreground mb-2 mt-4">
                  {service?.title ?? "Service appointment"}
                </Text>
                <Text className="text-sm font-manrope text-muted mb-6">
                  {agency?.name ?? "Agency"} · {vehicle?.name ?? "Your vehicle"}
                </Text>
                <View className="flex-row justify-between mb-4">
                  <View className="w-[48%] bg-elevated p-4 rounded-2xl">
                    <Text className="text-xs text-label font-manrope-semibold mb-1 tracking-wide uppercase">
                      DATE
                    </Text>
                    <Text className="text-base font-manrope-bold text-foreground">
                      {upcomingDateLabel}
                    </Text>
                  </View>
                  <View className="w-[48%] bg-elevated p-4 rounded-2xl">
                    <Text className="text-xs text-label font-manrope-semibold mb-1 tracking-wide uppercase">
                      TIME
                    </Text>
                    <Text className="text-base font-manrope-bold text-foreground">
                      {upcomingTimeLabel || "—"}
                    </Text>
                  </View>
                </View>
                <SecondaryButton
                  label="View all bookings"
                  onPress={() => router.push("/(main)/bookings")}
                  className="w-full"
                />
              </View>
            </View>
          ) : null}

          {draftComplete ? (
            <View className="mb-8">
              <View className="flex-row justify-between items-end mb-5">
                <Text className="text-2xl font-jakarta-bold text-foreground">
                  Booking in progress
                </Text>
                <Text className="text-xs font-manrope-bold text-primary tracking-wide">
                  DRAFT
                </Text>
              </View>
              <View
                className="bg-white rounded-3xl p-6 border border-border"
                style={cardShadowStyle}
              >
                <Badge variant="red">READY TO CONFIRM</Badge>
                <Text className="text-2xl font-jakarta-bold text-foreground mb-2 mt-4">
                  {draftService?.title}
                </Text>
                <Text className="text-sm font-manrope text-muted mb-6">
                  {draftAgency?.name} · {draftVehicle?.name}
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
                    onPress={() => router.push(routes.booking.confirmation)}
                    className="flex-1"
                    style={primaryShadowStyle}
                  />
                  <SecondaryButton
                    label="Edit"
                    onPress={() => router.push(routes.booking.selectVehicle)}
                    className="flex-1"
                  />
                </View>
              </View>
            </View>
          ) : !upcoming ? (
            <View className="mb-8">
              <Text className="text-2xl font-jakarta-bold text-foreground mb-5">
                Your garage
              </Text>
              <View
                className="bg-white rounded-3xl p-6 border border-border"
                style={cardShadowStyle}
              >
                <Text className="text-base font-manrope text-muted leading-relaxed mb-6">
                  You have no upcoming appointment. Book a service to see your
                  schedule here.
                </Text>
                <PrimaryButton
                  label="Book service"
                  onPress={() => router.push(routes.booking.selectVehicle)}
                  style={primaryShadowStyle}
                />
              </View>
            </View>
          ) : null}

          <View className="mb-4 flex-row justify-between items-end">
            <Text className="text-xl font-jakarta-bold text-foreground">
              Vehicles
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(main)/vehicles")}
              className="flex-row items-center active:opacity-70"
            >
              <Text className="text-xs font-manrope-bold text-primary tracking-widest uppercase mr-1">
                See all
              </Text>
              <ChevronRight size={16} color="#93001B" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-6 pl-6"
            contentContainerStyle={{ paddingRight: 24, gap: 12 }}
          >
            {previewVehicles.length === 0 && !vehicles.length ? (
              <Text className="text-sm font-manrope text-muted pl-0 pr-6">
                Add a vehicle to see it here.
              </Text>
            ) : (
              previewVehicles.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  onPress={() =>
                    router.push({
                      pathname: routes.vehicleDetails,
                      params: { id: String(v.id) },
                    })
                  }
                  className="w-40 rounded-2xl overflow-hidden bg-white border border-border"
                  style={cardShadowStyle}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{
                      uri:
                        v.image && !v.image.startsWith("../")
                          ? v.image
                          : DEFAULT_VEHICLE_IMAGE,
                    }}
                    className="h-24 w-full bg-elevated"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text
                      className="text-sm font-jakarta-bold text-foreground"
                      numberOfLines={1}
                    >
                      {v.name}
                    </Text>
                    <Text
                      className="text-[10px] font-manrope-bold text-muted uppercase mt-1"
                      numberOfLines={1}
                    >
                      {v.plate}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
