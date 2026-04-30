import { Badge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { routes } from "@/constants/routes";
import { cardShadowStyle } from "@/constants/shadows";
import { useAppointments } from "@/context/AppointmentsContext";
import { useToast } from "@/context/ToastContext";
import {
  appointmentTab,
  formatAppointmentDateDisplay,
  type AppointmentListTab,
} from "@/lib/appointmentFilters";
import { cancelAppointment, getAgencies, getServices, getVehicles } from "@/lib/api/kiaApi";
import type { Agency, Appointment, Service, Vehicle } from "@/lib/types";
import {
  Bell,
  Calendar,
  ChevronLeft,
  Clock,
  History,
} from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
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

type Row = Appointment & {
  vehicle: Vehicle | null;
  service: Service | null;
  agency: Agency | null;
};

export default function BookingsScreen() {
  const [listTab, setListTab] = useState<AppointmentListTab>("upcoming");
  const { appointments, isLoading, error, refresh } = useAppointments();
  const { showToast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [joinLoading, setJoinLoading] = useState(false);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [cancelBusy, setCancelBusy] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  useEffect(() => {
    if (!appointments.length) {
      setRows([]);
      return;
    }
    let mounted = true;
    const load = async () => {
      setJoinLoading(true);
      try {
        const [vehicles, services] = await Promise.all([
          getVehicles(),
          getServices(),
        ]);
        const serviceIds = [...new Set(appointments.map((a) => a.serviceId))];
        const agencyLists = await Promise.all(
          serviceIds.map((sid) => getAgencies(sid)),
        );
        const agencyByKey = new Map<string, Agency>();
        serviceIds.forEach((sid, i) => {
          for (const ag of agencyLists[i] ?? []) {
            agencyByKey.set(`${sid}:${ag.id}`, ag);
          }
        });
        if (!mounted) return;
        const next: Row[] = appointments.map((a) => ({
          ...a,
          vehicle: vehicles.find((v) => v.id === a.vehicleId) ?? null,
          service: services.find((s) => s.id === a.serviceId) ?? null,
          agency: agencyByKey.get(`${a.serviceId}:${a.agencyId}`) ?? null,
        }));
        setRows(next);
      } catch {
        if (mounted) {
          setRows(
            appointments.map((a) => ({
              ...a,
              vehicle: null,
              service: null,
              agency: null,
            })),
          );
        }
      } finally {
        if (mounted) setJoinLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [appointments]);

  const filtered = useMemo(
    () => rows.filter((r) => appointmentTab(r) === listTab),
    [rows, listTab],
  );

  const onConfirmCancel = async () => {
    if (cancelId === null) return;
    setCancelBusy(true);
    try {
      await cancelAppointment(cancelId);
      showToast({ type: "success", message: "Booking canceled." });
      setCancelId(null);
      await refresh();
    } catch (e) {
      showToast({
        type: "error",
        message: e instanceof Error ? e.message : "Could not cancel booking",
      });
    } finally {
      setCancelBusy(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={() => router.push("/(main)")}
        >
          <ChevronLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
          Booking History
        </Text>
        <TouchableOpacity
          className="p-1 -mr-1 active:opacity-70"
          onPress={() => router.push(routes.notifications)}
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View className="bg-white border-b border-border">
        <View className="flex-row px-6 py-4 gap-3">
          {(
            [
              ["upcoming", "Upcoming"],
              ["completed", "Completed"],
              ["canceled", "Canceled"],
            ] as const
          ).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              className={`px-5 py-2.5 rounded-full border ${
                listTab === key
                  ? "bg-primary border-primary"
                  : "bg-elevated border-border"
              }`}
              onPress={() => setListTab(key)}
              style={listTab === key ? cardShadowStyle : undefined}
            >
              <Text
                className={`text-xs font-manrope-bold tracking-widest uppercase ${
                  listTab === key ? "text-white" : "text-muted"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {(isLoading || joinLoading) && (
        <LoadingIndicator message="Loading appointments…" />
      )}
      {error && !isLoading ? (
        <Text className="px-6 pt-4 text-sm font-manrope text-primary">{error}</Text>
      ) : null}

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {!isLoading && !joinLoading && !filtered.length ? (
          <View className="px-6 py-12 items-center">
            <History size={48} color="#71717A" strokeWidth={1.5} />
            <Text className="text-base font-manrope text-muted text-center leading-relaxed mt-4">
              No {listTab} bookings yet.{"\n"}
              Book a service from the Home tab.
            </Text>
          </View>
        ) : null}

        <View className="p-6">
          {filtered.map((item) => {
            const img =
              item.vehicle?.image &&
              !item.vehicle.image.startsWith("../")
                ? item.vehicle.image
                : DEFAULT_VEHICLE_IMAGE;
            const canCancel =
              listTab === "upcoming" &&
              !String(item.status || "").toLowerCase().includes("cancel");

            return (
              <View
                key={item.id}
                className="bg-white border border-border rounded-3xl p-6 mb-6"
                style={cardShadowStyle}
              >
                <View className="flex-row mb-6">
                  <Image
                    source={{ uri: img }}
                    className="w-20 h-20 rounded-2xl bg-elevated"
                  />
                  <View className="flex-1 ml-4 justify-center">
                    <View className="self-end mb-2">
                      <Badge
                        variant={
                          listTab === "canceled"
                            ? "neutral"
                            : listTab === "completed"
                              ? "neutral"
                              : "red"
                        }
                      >
                        {(item.status || "CONFIRMED").toUpperCase()}
                      </Badge>
                    </View>
                    <Text className="text-lg font-jakarta-bold text-foreground mb-1">
                      {item.service?.title ?? "Service"}
                    </Text>
                    <Text className="text-xs font-manrope-bold text-muted uppercase tracking-widest">
                      {item.vehicle?.name ?? "Vehicle"} · {item.vehicle?.plate ?? "—"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row bg-elevated rounded-2xl p-4 mb-6 border border-border">
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 bg-white border border-border rounded-full justify-center items-center mr-3">
                      <Calendar size={18} color="#93001B" strokeWidth={2} />
                    </View>
                    <View>
                      <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                        DATE
                      </Text>
                      <Text className="text-sm font-manrope-bold text-foreground">
                        {formatAppointmentDateDisplay(item)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 bg-white border border-border rounded-full justify-center items-center mr-3">
                      <Clock size={18} color="#71717A" strokeWidth={2} />
                    </View>
                    <View>
                      <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                        TIME
                      </Text>
                      <Text className="text-sm font-manrope-bold text-foreground">
                        {item.time || "—"}
                      </Text>
                    </View>
                  </View>
                </View>

                {item.agency?.name ? (
                  <Text className="text-xs font-manrope text-muted mb-4">
                    {item.agency.name}
                  </Text>
                ) : null}

                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <PrimaryButton
                      label="Reschedule"
                      onPress={() =>
                        router.push(routes.booking.selectAppointment)
                      }
                      className="w-full"
                    />
                  </View>
                  <View className="flex-[0.85]">
                    <SecondaryButton
                      label="Cancel"
                      onPress={() => {
                        if (canCancel) setCancelId(item.id);
                        else
                          showToast({
                            type: "info",
                            message: "This booking cannot be canceled here.",
                          });
                      }}
                      className="w-full"
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View className="items-center py-8 opacity-60">
          <History size={32} color="#71717A" strokeWidth={2} />
          <Text className="text-xs font-manrope-medium text-muted mt-3 text-center px-6">
            Pull to focus tab — list updates when you return to this screen
          </Text>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={cancelId !== null}
        title="Cancel booking"
        message="Are you sure you want to cancel this booking?"
        confirmLabel={cancelBusy ? "Canceling…" : "Yes, cancel"}
        cancelLabel="No"
        destructive
        confirmDisabled={cancelBusy}
        onCancel={() => !cancelBusy && setCancelId(null)}
        onConfirm={onConfirmCancel}
      />
    </SafeAreaView>
  );
}
