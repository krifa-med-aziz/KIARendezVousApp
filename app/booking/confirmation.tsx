import { routes } from "@/constants/routes";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingConfirmationScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#f8f8f8]">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-white">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#c41e3a" />
        </TouchableOpacity>

        <Text className="flex-1 ml-3 text-lg font-semibold text-[#1a1a1a]">
          Booking Summary
        </Text>

        <View className="bg-[#c41e3a] px-3 py-1.5 rounded-full">
          <Text className="text-white text-xs font-semibold">STEP 5/5</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Vehicle */}
        <View className="m-4 h-[200px] rounded-2xl overflow-hidden bg-black">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Booking_%20Confirmation-S9V8yXvXqlOZnLitigyrtEvRM2JBS0.png",
            }}
            className="absolute w-full h-full"
          />

          <View className="flex-1 justify-end p-5 bg-black/30">
            <Text className="text-xs text-white/70 tracking-wide mb-1">
              YOUR SELECTED VEHICLE
            </Text>
            <Text className="text-2xl font-bold text-white">KIA EV6 GT</Text>
          </View>
        </View>

        {/* Info Card */}
        <View className="mx-4 mb-3 bg-white rounded-2xl p-5">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="cog-outline"
              size={24}
              color="#c41e3a"
            />
            <Text className="ml-auto text-[11px] text-gray-400 font-semibold tracking-wide">
              SERVICE TYPE
            </Text>
          </View>

          <Text className="text-xl font-semibold text-[#1a1a1a] mb-1">
            Full Maintenance
          </Text>
          <Text className="text-sm text-gray-400">
            Complete diagnostic & performance check
          </Text>
        </View>

        {/* Location */}
        <View className="mx-4 mb-3 bg-white rounded-2xl p-5">
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="location-on" size={24} color="#c41e3a" />
            <Text className="ml-auto text-[11px] text-gray-400 font-semibold tracking-wide">
              LOCATION
            </Text>
          </View>

          <Text className="text-xl font-semibold text-[#1a1a1a] mb-1">
            KIA Central
          </Text>
          <Text className="text-sm text-gray-400">
            Industrial Area, Sector 4
          </Text>
        </View>

        {/* Schedule */}
        <View className="mx-4 mb-3 bg-white rounded-2xl p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[11px] font-semibold text-[#c41e3a] tracking-wide">
              SCHEDULE
            </Text>
            <Feather name="calendar" size={18} color="#c41e3a" />
          </View>

          <View className="flex-row items-center">
            <View className="w-[70px] items-center pr-5 border-r border-gray-100">
              <Text className="text-3xl font-semibold text-[#c41e3a]">24</Text>
              <Text className="text-sm text-gray-400 -mt-1">OCT</Text>
            </View>

            <View className="flex-1 pl-5">
              <Text className="text-lg font-semibold text-[#1a1a1a] mb-1">
                Thursday, 09:30 AM
              </Text>
              <Text className="text-sm text-gray-400">
                Estimated duration: 3-4 hours
              </Text>
            </View>
          </View>
        </View>

        {/* Cost */}
        <View className="mx-4 mt-2 mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-[11px] text-gray-400 font-semibold tracking-wide">
              ESTIMATED COST
            </Text>
            <Text className="text-sm text-gray-400 mt-1">
              Labor & Standard Spare Parts
            </Text>
          </View>

          <Text className="text-3xl font-semibold text-[#1a1a1a]">$284.00</Text>
        </View>

        {/* Terms */}
        <View className="mx-4 mb-6 flex-row bg-white rounded-2xl p-4">
          <View className="mr-3 mt-1">
            <MaterialIcons name="check-circle" size={20} color="#c41e3a" />
          </View>

          <Text className="flex-1 text-sm text-gray-600 leading-5">
            By confirming, you agree to our{" "}
            <Text className="text-[#c41e3a] font-medium">Service Terms</Text>.
            {"\n"}
            You can reschedule or cancel free of charge up to 24 hours before
            the appointment.
          </Text>
        </View>

        {/* Actions */}
        <View className="px-4 pb-8">
          <TouchableOpacity
            onPress={() => router.push(routes.booking.success)}
            className="bg-[#c41e3a] py-5 rounded-full items-center mb-4"
          >
            <Text className="text-white text-base font-semibold">
              Confirm Booking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace(routes.main)}
            className="items-center py-2"
          >
            <Text className="text-[#1a1a1a] text-xs font-semibold tracking-wide">
              CANCEL & RETURN TO HOME
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
