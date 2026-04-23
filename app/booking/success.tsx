import { routes } from "@/constants/routes";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingSuccessScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity
          className="p-1"
          onPress={() => router.replace(routes.main)}
        >
          <Feather name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text className="text-[16px] font-bold text-[#1a1a1a] tracking-[0.5px]">
          KIA SERVICE
        </Text>
        <TouchableOpacity
          className="p-1"
          onPress={() => router.push(routes.notifications)}
        >
          <Feather name="bell" size={22} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Success Section */}
        <View className="bg-[#f5f3f0] pt-10 pb-12 items-center">
          <View className="w-[100px] h-[100px] rounded-full bg-white justify-center items-center shadow-sm elevation-[4] mb-6">
            <View className="w-16 h-16 rounded-full bg-[#c41e3a] justify-center items-center">
              <MaterialIcons name="check" size={40} color="#fff" />
            </View>
          </View>
          <Text className="text-[28px] font-bold text-[#1a1a1a] mb-3">
            Booking Successful!
          </Text>
          <Text className="text-[15px] text-[#666] text-center leading-[22px]">
            Your service appointment is confirmed.{"\n"}We look forward to
            seeing you.
          </Text>
        </View>

        {/* Booking Summary Card */}
        <View className="mx-5 -mt-6 bg-white rounded-[20px] p-6 shadow-sm elevation-[4]">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-[13px] font-semibold text-[#888] tracking-[1px]">
              BOOKING SUMMARY
            </Text>
            <View className="bg-[#e8f5f0] px-3 py-1.5 rounded-xl">
              <Text className="text-[11px] font-semibold text-[#2a9d6a] tracking-[0.5px]">
                CONFIRMED
              </Text>
            </View>
          </View>

          {/* Vehicle */}
          <View className="flex-row mb-5">
            <View className="w-11 h-11 rounded-[22px] bg-[#f5f5f5] justify-center items-center mr-[14px]">
              <MaterialCommunityIcons name="car-side" size={20} color="#666" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-0.5">
                VEHICLE
              </Text>
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                KIA EV9 GT-Line
              </Text>
              <Text className="text-[13px] text-[#888] mt-0.5">
                Plate: KA 05 MV 2024
              </Text>
            </View>
          </View>

          {/* Service Type */}
          <View className="flex-row mb-5">
            <View className="w-11 h-11 rounded-[22px] bg-[#f5f5f5] justify-center items-center mr-[14px]">
              <MaterialCommunityIcons
                name="wrench-outline"
                size={20}
                color="#666"
              />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-0.5">
                SERVICE TYPE
              </Text>
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                Full Maintenance Check
              </Text>
            </View>
          </View>

          {/* Agency */}
          <View className="flex-row mb-5">
            <View className="w-11 h-11 rounded-[22px] bg-[#f5f5f5] justify-center items-center mr-[14px]">
              <MaterialIcons name="location-on" size={20} color="#666" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-0.5">
                AGENCY
              </Text>
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                KIA Central Agency
              </Text>
              <Text className="text-[13px] text-[#888] mt-0.5">
                Plot 12, Main Street, Downtown
              </Text>
            </View>
          </View>

          {/* Date & Time */}
          <View className="flex-row mb-5">
            <View className="w-11 h-11 rounded-[22px] bg-[#f5f5f5] justify-center items-center mr-[14px]">
              <Feather name="calendar" size={18} color="#666" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-[11px] font-semibold text-[#888] tracking-[0.5px] mb-0.5">
                DATE & TIME
              </Text>
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                Oct 24, 2024 at 09:30 AM
              </Text>
              <Text className="text-[13px] text-[#888] mt-0.5">
                Thursday, Morning Slot
              </Text>
            </View>
          </View>
        </View>

        {/* Loyalty Points Banner */}
        <TouchableOpacity
          className="flex-row items-center mx-5 mt-4 bg-[#fffbf0] rounded-2xl py-4 px-5"
          onPress={() =>
            Alert.alert("Loyalty", "Points would open rewards — demo only.")
          }
        >
          <MaterialIcons name="star" size={20} color="#f5a623" />
          <Text className="flex-1 text-[13px] font-semibold text-[#c41e3a] tracking-[0.5px] ml-3">
            EARNED 250 LOYALTY POINTS
          </Text>
          <Feather name="chevron-right" size={20} color="#c41e3a" />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View className="px-5 pt-6 pb-4">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#c41e3a] py-[18px] rounded-[32px] mb-3"
            onPress={() =>
              Alert.alert(
                "Track service",
                "Live status would open here — demo.",
              )
            }
          >
            <MaterialCommunityIcons name="radar" size={22} color="#fff" />
            <Text className="text-white text-[16px] font-semibold ml-2.5">
              Track Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center bg-white py-[18px] rounded-[32px] border border-[#e8e8e8]"
            onPress={() => router.replace(routes.main)}
          >
            <Text className="text-[#1a1a1a] text-[16px] font-semibold">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
