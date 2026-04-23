import { routes } from "@/constants/routes";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VehiclesScreen() {
  const vehicles = [
    {
      id: 1,
      name: "KIA EV6 GT-Line",
      plate: "ABC-1234",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kia-ev6-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
      battery: "92%",
      lastService: "Oct 12, 2023",
      odometer: "12,450 km",
      showVehicleStatus: true,
    },
    {
      id: 2,
      name: "KIA Sorento",
      plate: "SUV-9821",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kia-sorento-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
      lastService: "Sep 05, 2023",
      showVehicleStatus: false,
    },
    {
      id: 3,
      name: "KIA Sportage",
      plate: "K-DRIVE-22",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kia-sportage-7FE08IBpgxmG5EtaEREOHtgIkBfx2t.jpg",
      lastService: "Aug 22, 2023",
      showVehicleStatus: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-[#ffffff] border-b border-[#f0f0f0]">
        <TouchableOpacity onPress={() => router.push("/(main)")}>
          <ChevronLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text className="text-[16px] font-bold tracking-[1.5px] text-[#1a1a1a]">
          MY GARAGE
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="px-4 pt-5 pb-10">
        {/* Section Title */}
        <View className="mb-5">
          <Text className="text-[11px] font-semibold tracking-[1px] text-[#999] mb-1">
            ACTIVE FLEET
          </Text>
          <Text className="text-[24px] font-bold text-[#1a1a1a]">
            Your Curated Collection
          </Text>
        </View>

        {/* Vehicle Cards */}
        {vehicles.map((vehicle) => (
          <View
            key={vehicle.id}
            className="bg-[#ffffff] rounded-2xl overflow-hidden mb-5 border border-[#f0f0f0]"
          >
            {/* Image Container */}
            <View className="relative w-full h-[200px]">
              <Image
                source={{ uri: vehicle.image }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {vehicle.battery && (
                <View className="absolute top-3 right-3 bg-[#ffe4e8] px-2.5 py-1.5 rounded-2xl">
                  <Text className="text-[10px] font-bold text-[#c41e3a] tracking-[0.5px]">
                    BATTERY {vehicle.battery}
                  </Text>
                </View>
              )}
            </View>

            {/* Vehicle Info */}
            <View className="p-5">
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-[18px] font-bold text-[#1a1a1a] mb-0.5">
                    {vehicle.name}
                  </Text>
                  <Text className="text-[12px] font-normal text-[#999]">
                    {vehicle.plate}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Vehicle options",
                      "Edit or remove — demo only.",
                    )
                  }
                >
                  <Text className="text-[18px] text-[#999]">⋮</Text>
                </TouchableOpacity>
              </View>

              {/* Service Info */}
              <View className="gap-3 mb-4 pb-4 border-b border-[#f0f0f0]">
                <View className="flex-row items-start gap-3">
                  <Text className="text-[16px] mt-0.5">🔧</Text>
                  <View>
                    <Text className="text-[10px] font-semibold text-[#999] tracking-[0.5px] mb-0.5">
                      LAST SERVICE
                    </Text>
                    <Text className="text-[13px] font-semibold text-[#1a1a1a]">
                      {vehicle.lastService}
                    </Text>
                  </View>
                </View>

                {vehicle.odometer && (
                  <View className="flex-row items-start gap-3">
                    <Text className="text-[16px] mt-0.5">📏</Text>
                    <View>
                      <Text className="text-[10px] font-semibold text-[#999] tracking-[0.5px] mb-0.5">
                        ODOMETER
                      </Text>
                      <Text className="text-[13px] font-semibold text-[#1a1a1a]">
                        {vehicle.odometer}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Action Button */}
              {vehicle.showVehicleStatus ? (
                <TouchableOpacity
                  className="bg-[#c41e3a] rounded-3xl py-3 items-center"
                  onPress={() =>
                    router.push({
                      pathname: routes.vehicleDetails,
                      params: { id: String(vehicle.id) },
                    })
                  }
                >
                  <Text className="text-[13px] font-bold text-[#ffffff] tracking-[0.5px]">
                    VEHICLE STATUS →
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="bg-[#e8e8e8] rounded-3xl py-3 items-center"
                  onPress={() =>
                    router.push({
                      pathname: routes.vehicleDetails,
                      params: { id: String(vehicle.id) },
                    })
                  }
                >
                  <Text className="text-[13px] font-bold text-[#666] tracking-[0.5px]">
                    DETAILS
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Expand Your Garage Section */}
        <View className="bg-[#f5f5f5] rounded-2xl p-6 items-center mb-5">
          <Text className="text-[32px] text-[#c41e3a] mb-3">+</Text>
          <Text className="text-[16px] font-bold text-[#1a1a1a] mb-2">
            Expand Your Garage
          </Text>
          <Text className="text-[13px] font-normal text-[#666] text-center leading-5 mb-4">
            Register a new KIA vehicle to{"\n"}
            track its health, service history,{"\n"}
            and connected features.
          </Text>
          <TouchableOpacity
            className="bg-[#1a1a1a] rounded-3xl px-6 py-2.5"
            onPress={() => router.push(routes.addVehicle)}
          >
            <Text className="text-[12px] font-bold text-[#ffffff] tracking-[0.5px]">
              REGISTER NOW
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-7 right-5 w-14 h-14 rounded-full bg-[#c41e3a] justify-center items-center shadow-[0_2px_4px_rgba(196,30,58,0.3)] elevation-[5]"
        onPress={() => router.push(routes.addVehicle)}
      >
        <Text className="text-[28px] text-[#ffffff] font-light">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
