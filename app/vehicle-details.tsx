import { routes } from "@/constants/routes";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VehicleDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-white">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#c41e3a" />
        </TouchableOpacity>
        <Text className="flex-1 text-[14px] font-semibold text-[#1a1a1a] ml-3 tracking-[0.5px]">
          VEHICLE DETAILS{id ? ` · #${id}` : ""}
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Vehicle Image */}
        <View className="h-[280px] bg-[#1a1a1a] relative">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vehicle%20Details-WBZHAr69OSLSNhArv5SteJex8xq0ws.png",
            }}
            className="w-full h-[350px] absolute -top-5"
            resizeMode="cover"
          />
          <View className="flex-1 justify-end p-5">
            <View className="self-start bg-[#c41e3a] px-3.5 py-2 rounded">
              <Text className="text-[11px] font-semibold text-white tracking-[0.5px]">
                ELECTRIC PERFORMANCE
              </Text>
            </View>
          </View>
        </View>

        {/* Vehicle Name */}
        <View className="px-5 pt-5 pb-4">
          <Text className="text-[32px] font-bold text-[#1a1a1a]">
            KIA EV6 <Text className="text-[#c41e3a]">GT-Line</Text>
          </Text>
        </View>

        {/* Info Grid */}
        <View className="flex-row flex-wrap px-4 gap-3">
          <View className="w-[48%] bg-white rounded-2xl p-4 border border-[#f0f0f0]">
            <MaterialCommunityIcons
              name="card-text-outline"
              size={24}
              color="#c41e3a"
            />
            <Text className="text-[11px] font-medium text-[#888] tracking-[0.5px] mt-3 mb-1">
              PLATE NUMBER
            </Text>
            <Text className="text-[20px] font-bold text-[#1a1a1a]">
              ABC-1234
            </Text>
          </View>
          <View className="w-[48%] bg-white rounded-2xl p-4 border border-[#f0f0f0]">
            <MaterialCommunityIcons
              name="speedometer"
              size={24}
              color="#c41e3a"
            />
            <Text className="text-[11px] font-medium text-[#888] tracking-[0.5px] mt-3 mb-1">
              ODOMETER
            </Text>
            <Text className="text-[20px] font-bold text-[#1a1a1a]">
              12,450{" "}
              <Text className="text-[14px] font-medium text-[#888]">km</Text>
            </Text>
          </View>
          <View className="w-[48%] bg-white rounded-2xl p-4 border border-[#f0f0f0]">
            <MaterialCommunityIcons
              name="battery-charging-80"
              size={24}
              color="#c41e3a"
            />
            <Text className="text-[11px] font-medium text-[#888] tracking-[0.5px] mt-3 mb-1">
              BATTERY
            </Text>
            <Text className="text-[20px] font-bold text-[#1a1a1a]">84%</Text>
          </View>
          <View className="w-[48%] bg-white rounded-2xl p-4 border border-[#f0f0f0]">
            <MaterialCommunityIcons name="history" size={24} color="#c41e3a" />
            <Text className="text-[11px] font-medium text-[#888] tracking-[0.5px] mt-3 mb-1">
              LAST SERVICE
            </Text>
            <Text className="text-[20px] font-bold text-[#1a1a1a]">
              Oct 12, 2023
            </Text>
          </View>
        </View>

        {/* Vehicle Health */}
        <View className="mx-4 mt-4 bg-white rounded-2xl p-5 border border-[#f0f0f0]">
          <View className="flex-row justify-between items-start mb-5">
            <Text className="text-[22px] font-bold text-[#1a1a1a] leading-7">
              Vehicle{"\n"}Health
            </Text>
            <View className="bg-[#c41e3a] px-4 py-2.5 rounded-lg">
              <Text className="text-[12px] font-bold text-white text-center leading-4">
                OPTIMAL{"\n"}CONDITION
              </Text>
            </View>
          </View>

          <View className="flex-row items-center py-3">
            <View className="w-11 h-11 rounded-xl bg-[#fef5f5] justify-center items-center mr-3.5">
              <MaterialCommunityIcons name="tire" size={22} color="#c41e3a" />
            </View>
            <View className="flex-1">
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                Tire Pressure
              </Text>
              <Text className="text-[13px] text-[#888] mt-0.5">
                All tires balanced
              </Text>
            </View>
            <Text className="text-[16px] font-bold text-[#1a1a1a]">36 PSI</Text>
          </View>

          <View className="flex-row items-center py-3">
            <View className="w-11 h-11 rounded-xl bg-[#fef5f5] justify-center items-center mr-3.5">
              <MaterialCommunityIcons
                name="car-brake-fluid-level"
                size={22}
                color="#c41e3a"
              />
            </View>
            <View className="flex-1">
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                Brake Fluid
              </Text>
              <Text className="text-[13px] text-[#888] mt-0.5">Level 92%</Text>
            </View>
            <Text className="text-[16px] font-bold text-[#1a1a1a]">Good</Text>
          </View>
        </View>

        {/* V2L Ready Card */}
        <View className="mx-4 mt-4 bg-[#4a4a4a] rounded-2xl p-6 flex-row overflow-hidden min-h-[160px]">
          <View className="flex-1 justify-center">
            <Text className="text-[32px] font-bold text-white leading-9 mb-3">
              V2L{"\n"}Ready
            </Text>
            <Text className="text-[13px] text-white/70 leading-[18px]">
              Vehicle-to-Load technology is active and ready to power your
              devices.
            </Text>
          </View>
          <View className="absolute right-5 top-5">
            <FontAwesome5 name="bolt" size={48} color="rgba(255,255,255,0.2)" />
          </View>
        </View>

        {/* Service Timeline */}
        <View className="px-4 pt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[20px] font-bold text-[#1a1a1a]">
              Service Timeline
            </Text>
            <TouchableOpacity>
              <Text className="text-[13px] font-semibold text-[#c41e3a] tracking-[0.5px]">
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="flex-row items-center bg-[#f8f8f8] rounded-2xl p-4">
            <View className="items-center mr-4 pr-4 border-r border-[#e8e8e8]">
              <Text className="text-[12px] font-medium text-[#888]">OCT</Text>
              <Text className="text-[24px] font-bold text-[#1a1a1a]">12</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                12,000 km Checkup
              </Text>
              <Text className="text-[13px] text-[#888] mt-0.5">
                Full diagnostic, Software update
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Book Service Button */}
        <View className="px-4 pt-6 pb-8">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#c41e3a] py-4 rounded-full"
            onPress={() => router.push(routes.booking.selectVehicle)}
          >
            <Feather name="calendar" size={20} color="#fff" />
            <Text className="text-[15px] font-bold text-white ml-2.5 tracking-[1px]">
              BOOK SERVICE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
