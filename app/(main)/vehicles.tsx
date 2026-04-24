import { routes } from "@/constants/routes";
import { DEFAULT_VEHICLE_IMAGE, VEHICLES } from "@/data/mockData";
import { router } from "expo-router";
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

export default function VehiclesScreen() {
  const handleVehicleOptions = () => {
    Alert.alert("Vehicle Options", "Choose an action", [
      { text: "Edit Details" },
      { text: "Remove Vehicle", style: "destructive" },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          onPress={() => router.push("/(main)")}
          className="p-1 -ml-1 active:opacity-70"
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
          MY GARAGE
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView
        className="px-6 pt-8 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Section Title */}
        <View className="mb-6">
          <Text className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">
            ACTIVE FLEET
          </Text>
          <Text className="text-3xl font-extrabold text-text-primary">
            Your Curated Collection
          </Text>
        </View>

        {/* Vehicle Cards */}
        {VEHICLES.map((vehicle) => (
          <View
            key={vehicle.id}
            className="bg-surface rounded-2xl overflow-hidden mb-6 border border-border shadow-subtle"
          >
            {/* Image Container */}
            <View className="relative w-full h-[220px] bg-background">
              <Image
                source={{ uri: vehicle.image || DEFAULT_VEHICLE_IMAGE }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {vehicle.battery && (
                <View className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-md">
                  <Text className="text-[10px] font-bold text-white tracking-widest uppercase">
                    BATTERY {vehicle.battery}
                  </Text>
                </View>
              )}
            </View>

            {/* Vehicle Info */}
            <View className="p-6">
              <View className="flex-row justify-between items-start mb-6">
                <View>
                  <Text className="text-2xl font-extrabold text-text-primary mb-1">
                    {vehicle.name}
                  </Text>
                  <Text className="text-sm font-bold text-text-secondary tracking-widest uppercase">
                    {vehicle.plate}
                  </Text>
                </View>
                <TouchableOpacity
                  className="p-2 -mr-2 active:opacity-70"
                  onPress={handleVehicleOptions}
                >
                  <MoreVertical size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Service Info */}
              <View className="gap-4 mb-6 pb-6 border-b border-border/50">
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-background border border-border items-center justify-center">
                    <Wrench size={18} color="#6B7280" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                      LAST SERVICE
                    </Text>
                    <Text className="text-sm font-bold text-text-primary">
                      {vehicle.lastService}
                    </Text>
                  </View>
                </View>

                {vehicle.mileage && (
                  <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 rounded-full bg-background border border-border items-center justify-center">
                      <Ruler size={18} color="#6B7280" />
                    </View>
                    <View>
                      <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                        ODOMETER
                      </Text>
                      <Text className="text-sm font-bold text-text-primary">
                        {vehicle.mileage}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Action Button */}
              <TouchableOpacity
                className="bg-primary h-14 rounded-xl items-center justify-center active:opacity-80 shadow-subtle"
                onPress={() =>
                  router.push({
                    pathname: routes.vehicleDetails,
                    params: { id: String(vehicle.id) },
                  })
                }
              >
                <Text className="text-sm font-bold text-white tracking-widest uppercase">
                  VEHICLE STATUS →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Expand Your Garage Section */}
        <View className="bg-surface rounded-2xl p-8 items-center mb-6 border border-border shadow-subtle">
          <View className="w-16 h-16 rounded-full bg-primary-soft items-center justify-center mb-4">
            <Plus size={32} color="#E60012" />
          </View>
          <Text className="text-xl font-extrabold text-text-primary mb-3">
            Expand Your Garage
          </Text>
          <Text className="text-sm font-medium text-text-secondary text-center leading-relaxed mb-6">
            Register a new KIA vehicle to track its health, service history, and
            connected features.
          </Text>
          <TouchableOpacity
            className="bg-background border border-border rounded-xl px-8 h-12 items-center justify-center active:bg-text-secondary/10"
            onPress={() => router.push(routes.addVehicle)}
          >
            <Text className="text-xs font-bold text-text-primary tracking-widest uppercase">
              REGISTER NOW
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-10 right-6 w-16 h-16 rounded-full bg-primary justify-center items-center shadow-card active:opacity-80"
        onPress={() => router.push(routes.addVehicle)}
      >
        <Plus size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
