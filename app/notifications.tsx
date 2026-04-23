import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#f8f8f8]">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-white">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#c41e3a" />
        </TouchableOpacity>
        <Text className="text-[18px] font-semibold text-[#1a1a1a]">
          Notifications
        </Text>
        <TouchableOpacity
          className="p-1"
          onPress={() => router.push("/(main)/profile")}
        >
          <Feather name="settings" size={22} color="#c41e3a" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <Text className="text-[12px] font-semibold text-[#999] tracking-[1px] px-5 pt-6 pb-3">
          TODAY
        </Text>

        {/* Service Confirmed Notification */}
        <View className="mx-5 bg-white rounded-2xl mb-3 overflow-hidden relative">
          <View className="flex-row p-4 pl-5">
            <View className="w-12 h-12 rounded-xl bg-[#fef0f0] justify-center items-center mr-3.5">
              <Feather name="calendar" size={20} color="#c41e3a" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                  Service Confirmed
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[12px] text-[#999]">2H A</Text>
                  <View className="w-2 h-2 rounded-full bg-[#c41e3a] ml-1.5" />
                </View>
              </View>
              <Text className="text-[14px] text-[#666] leading-5">
                Your booking for Oct 24th is set. Our technician is ready for
                your arrival.
              </Text>
            </View>
          </View>
          <View className="absolute left-0 top-0 bottom-0 w-1 bg-[#c41e3a] rounded-tl-2xl rounded-bl-2xl" />
        </View>

        {/* Vehicle Health Alert Notification */}
        <View className="mx-5 bg-white rounded-2xl p-4 flex-row mb-3">
          <View className="w-12 h-12 rounded-xl bg-[#f5f5f5] justify-center items-center mr-3.5">
            <MaterialCommunityIcons name="car-cog" size={22} color="#666" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                Vehicle Health Alert
              </Text>
              <Text className="text-[12px] text-[#bbb]">5H AGO</Text>
            </View>
            <Text className="text-[14px] text-[#666] leading-5">
              It&apos;s time for your EV6&apos;s tire rotation to maintain
              optimal range and safety.
            </Text>
          </View>
        </View>

        {/* Promotional Banner */}
        <View className="mx-5 rounded-[20px] overflow-hidden h-[180px] mb-3">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1449965408869-euj3c9c8f5e6?w=800&h=400&fit=crop",
            }}
            className="w-full h-full absolute"
          />
          <View className="flex-1 bg-black/40 p-5 justify-center">
            <Text className="text-[32px] font-bold text-white mb-2">
              15% OFF
            </Text>
            <Text className="text-[14px] text-white/90 leading-5 mb-4">
              Get 15% off your next full periodic maintenance service at
              authorized centers.
            </Text>
            <TouchableOpacity className="self-start bg-white px-6 py-3 rounded-full">
              <Text className="text-[13px] font-semibold text-[#1a1a1a] tracking-[0.5px]">
                CLAIM REWARD
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Earlier Section */}
        <Text className="text-[12px] font-semibold text-[#999] tracking-[1px] px-5 pt-6 pb-3">
          EARLIER
        </Text>

        {/* Service Completed Notification */}
        <View className="mx-5 bg-white rounded-2xl p-4 flex-row mb-3">
          <View className="w-12 h-12 rounded-3xl bg-[#f8f8f8] justify-center items-center mr-3.5">
            <Feather name="check-circle" size={20} color="#999" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                Service Completed
              </Text>
              <Text className="text-[12px] text-[#bbb]">2D AGO</Text>
            </View>
            <Text className="text-[14px] text-[#666] leading-5">
              Your EV6 was successfully serviced. You can view the full digital
              report now.
            </Text>
          </View>
        </View>

        {/* Welcome Notification */}
        <View className="mx-5 bg-white rounded-2xl p-4 flex-row mb-3">
          <View className="w-12 h-12 rounded-3xl bg-[#f8f8f8] justify-center items-center mr-3.5">
            <MaterialCommunityIcons name="tag-outline" size={20} color="#999" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-[16px] font-semibold text-[#1a1a1a]">
                Welcome to KIA Care
              </Text>
              <Text className="text-[12px] text-[#bbb]">1W AGO</Text>
            </View>
            <Text className="text-[14px] text-[#666] leading-5">
              Thank you for joining the KIA service ecosystem. Explore your
              benefits today.
            </Text>
          </View>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
