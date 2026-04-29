import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { routes } from "@/constants/routes";
import { cardShadowStyle } from "@/constants/shadows";
import { getVehicles } from "@/lib/api/kiaApi";
import type { Vehicle } from "@/lib/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Plus,
  Ruler,
  Wrench,
} from "lucide-react-native";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_VEHICLE_IMAGE =
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80";

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVehicles();
        if (mounted) setVehicles(data);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load vehicles");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleVehicleOptions = () => {
    Alert.alert("Vehicle Options", "Choose an action", [
      { text: "Edit Details" },
      { text: "Remove Vehicle", style: "destructive" },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          onPress={() => router.push("/(main)")}
          className="p-1 -ml-1 active:opacity-70"
        >
          <ArrowLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
          My Garage
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView
        className="px-6 pt-8 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <Text className="text-[10px] font-manrope-bold tracking-widest text-muted uppercase mb-2">
            Active fleet
          </Text>
          <Text className="text-2xl font-jakarta-extrabold text-foreground">
            Your vehicles
          </Text>
        </View>

        {isLoading && (
          <Text className="text-sm font-manrope text-muted mb-6">
            Loading vehicles...
          </Text>
        )}
        {error && (
          <Text className="text-sm font-manrope text-primary mb-6">{error}</Text>
        )}

        {vehicles.map((vehicle) => (
          <View
            key={vehicle.id}
            className="bg-white rounded-3xl overflow-hidden mb-8 border border-border"
            style={cardShadowStyle}
          >
            <View className="relative w-full h-[220px] bg-elevated">
              <Image
                source={{ uri: vehicle.image || DEFAULT_VEHICLE_IMAGE }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {!!vehicle.battery && (
                <View className="absolute top-4 right-4 bg-primary px-3 py-1.5 rounded-full">
                  <Text className="text-[10px] font-manrope-bold text-white tracking-widest uppercase">
                    BATTERY {vehicle.battery}
                  </Text>
                </View>
              )}
            </View>

            <View className="p-6">
              <View className="flex-row justify-between items-start mb-6">
                <View>
                  <Text className="text-2xl font-jakarta-extrabold text-foreground mb-1">
                    {vehicle.name}
                  </Text>
                  <Text className="text-sm font-manrope-bold text-muted tracking-widest uppercase">
                    {vehicle.plate}
                  </Text>
                </View>
                <TouchableOpacity
                  className="p-2 -mr-2 active:opacity-70"
                  onPress={handleVehicleOptions}
                >
                  <MoreVertical size={24} color="#71717A" strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <View className="gap-4 mb-6 pb-6 border-b border-border">
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-elevated border border-border items-center justify-center">
                    <Wrench size={18} color="#71717A" strokeWidth={2} />
                  </View>
                  <View>
                    <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                      LAST SERVICE
                    </Text>
                    <Text className="text-sm font-manrope-bold text-foreground">
                      {vehicle.createdAt
                        ? new Date(vehicle.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "—"}
                    </Text>
                  </View>
                </View>

                {vehicle.mileage && (
                  <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 rounded-full bg-elevated border border-border items-center justify-center">
                      <Ruler size={18} color="#71717A" strokeWidth={2} />
                    </View>
                    <View>
                      <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                        ODOMETER
                      </Text>
                      <Text className="text-sm font-manrope-bold text-foreground">
                        {vehicle.mileage}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <PrimaryButton
                label="Vehicle status"
                onPress={() =>
                  router.push({
                    pathname: routes.vehicleDetails,
                    params: { id: String(vehicle.id) },
                  })
                }
                className="w-full"
              />
            </View>
          </View>
        ))}

        <View
          className="bg-white rounded-3xl p-8 items-center mb-6 border border-border"
          style={cardShadowStyle}
        >
          <View className="w-16 h-16 rounded-full bg-badge-red items-center justify-center mb-4">
            <Plus size={32} color="#93001B" strokeWidth={2} />
          </View>
          <Text className="text-xl font-jakarta-extrabold text-foreground mb-3 text-center">
            Expand your garage
          </Text>
          <Text className="text-sm font-manrope text-muted text-center leading-relaxed mb-6">
            Register a new KIA vehicle to track its health, service history, and
            connected features.
          </Text>
          <SecondaryButton
            label="Register now"
            onPress={() => router.push(routes.addVehicle)}
            className="w-full"
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-10 right-6 w-16 h-16 rounded-full bg-primary justify-center items-center active:opacity-90"
        style={{
          shadowColor: "#93001B",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.28,
          shadowRadius: 16,
          elevation: 8,
        }}
        onPress={() => router.push(routes.addVehicle)}
      >
        <Plus size={28} color="#fff" strokeWidth={2} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
