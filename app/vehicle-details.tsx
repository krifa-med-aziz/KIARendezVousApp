import { routes } from "@/constants/routes";
import { cardShadowStyle, primaryShadowStyle } from "@/constants/shadows";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { getVehicles } from "@/lib/api/kiaApi";
import { paramFirst, parsePositiveInt } from "@/lib/routeParams";
import type { Vehicle } from "@/lib/types";
import {
  ArrowLeft,
  BatteryCharging,
  CalendarDays,
  Car,
  Gauge,
  History,
  Wrench,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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

export default function VehicleDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const vehicleId = parsePositiveInt(paramFirst(id));
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicleId === null) {
      setVehicle(null);
      setIsLoading(false);
      setError("Invalid vehicle");
      return;
    }
    let mounted = true;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const list = await getVehicles();
        if (!mounted) return;
        const v = list.find((x) => x.id === vehicleId) ?? null;
        setVehicle(v);
        if (!v) setError("Vehicle not found");
      } catch (e) {
        if (mounted) {
          setVehicle(null);
          setError(e instanceof Error ? e.message : "Failed to load vehicle");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [vehicleId]);

  const heroUri = useMemo(() => {
    if (!vehicle?.image || vehicle.image.startsWith("../")) {
      return DEFAULT_VEHICLE_IMAGE;
    }
    return vehicle.image;
  }, [vehicle?.image]);

  const lastServiceLabel = useMemo(() => {
    if (vehicle?.lastService) return vehicle.lastService;
    if (vehicle?.createdAt) {
      return new Date(vehicle.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return "—";
  }, [vehicle?.createdAt, vehicle?.lastService]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View className="flex-row items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="active:opacity-70 p-1 -ml-1"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="flex-1 text-sm font-jakarta-bold text-foreground ml-3 tracking-widest uppercase">
          Vehicle details
          {vehicleId !== null ? ` · #${vehicleId}` : ""}
        </Text>
        <View className="w-8" />
      </View>

      {isLoading ? (
        <LoadingIndicator message="Loading vehicle…" />
      ) : error || !vehicle ? (
        <View className="px-6 pt-8">
          <Text className="text-base font-manrope text-primary">{error}</Text>
          <TouchableOpacity
            className="mt-6 bg-primary h-12 rounded-full justify-center items-center"
            onPress={() => router.push("/(main)/vehicles")}
          >
            <Text className="text-white font-manrope-bold">Back to garage</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View
            className="h-[280px] bg-foreground relative mx-6 rounded-3xl overflow-hidden mb-6 mt-6 border border-border"
            style={cardShadowStyle}
          >
            <Image
              source={{ uri: heroUri }}
              className="w-full h-full absolute top-0"
              resizeMode="cover"
            />
            <View className="flex-1 justify-end p-5 bg-foreground/10">
              {vehicle.badge ? (
                <View className="self-start bg-primary px-4 py-2 rounded-full">
                  <Text className="text-xs font-manrope-bold text-white tracking-widest uppercase">
                    {vehicle.badge}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View className="px-6 pb-6">
            <Text className="text-3xl font-jakarta-extrabold text-foreground">
              {vehicle.name}
            </Text>
            <Text className="text-sm font-manrope text-muted mt-1">
              {vehicle.type}
            </Text>
          </View>

          <View className="flex-row flex-wrap px-6 gap-4">
            <View
              className="w-[47%] bg-white rounded-3xl p-5 border border-border"
              style={cardShadowStyle}
            >
              <Car size={24} color="#93001B" strokeWidth={2} />
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
                Plate number
              </Text>
              <Text className="text-xl font-jakarta-bold text-foreground">
                {vehicle.plate}
              </Text>
            </View>
            <View
              className="w-[47%] bg-white rounded-3xl p-5 border border-border"
              style={cardShadowStyle}
            >
              <Gauge size={24} color="#93001B" strokeWidth={2} />
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
                Odometer
              </Text>
              <Text className="text-xl font-jakarta-bold text-foreground">
                {vehicle.mileage || "—"}{" "}
                <Text className="text-sm font-manrope text-muted">km</Text>
              </Text>
            </View>
            <View
              className="w-[47%] bg-white rounded-3xl p-5 border border-border"
              style={cardShadowStyle}
            >
              <BatteryCharging size={24} color="#93001B" strokeWidth={2} />
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
                Battery
              </Text>
              <Text className="text-xl font-jakarta-bold text-foreground">
                {vehicle.battery ?? "—"}
              </Text>
            </View>
            <View
              className="w-[47%] bg-white rounded-3xl p-5 border border-border"
              style={cardShadowStyle}
            >
              <History size={24} color="#93001B" strokeWidth={2} />
              <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
                Last service
              </Text>
              <Text className="text-xl font-jakarta-bold text-foreground">
                {lastServiceLabel}
              </Text>
            </View>
          </View>

          <View
            className="mx-6 mt-6 bg-white rounded-3xl p-6 border border-border"
            style={cardShadowStyle}
          >
            <View className="flex-row justify-between items-start mb-4">
              <Text className="text-2xl font-jakarta-extrabold text-foreground leading-8">
                Vehicle{"\n"}health
              </Text>
              <View className="bg-badge-red px-4 py-2 rounded-full border border-border">
                <Text className="text-xs font-manrope-bold text-primary tracking-widest text-center uppercase">
                  Overview
                </Text>
              </View>
            </View>
            <View className="flex-row items-center py-3 border-b border-border">
              <View className="w-12 h-12 rounded-2xl bg-elevated justify-center items-center mr-4 border border-border">
                <Wrench size={20} color="#93001B" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-jakarta-bold text-foreground">
                  VIN
                </Text>
                <Text className="text-sm font-manrope text-muted mt-0.5">
                  {vehicle.vin ?? "Not on file"}
                </Text>
              </View>
            </View>
          </View>

          <View className="px-6 pt-8 pb-12">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-primary h-14 rounded-full active:opacity-90"
              style={primaryShadowStyle}
              onPress={() => router.push(routes.booking.selectVehicle)}
            >
              <CalendarDays size={20} color="#fff" strokeWidth={2} />
              <Text className="text-lg font-manrope-bold text-white ml-3 tracking-wide">
                BOOK SERVICE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
