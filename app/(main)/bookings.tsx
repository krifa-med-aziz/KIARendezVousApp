import { routes } from "@/constants/routes";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingsScreen() {
  const [listTab, setListTab] = useState<"upcoming" | "completed" | "canceled">(
    "upcoming",
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f8f8f8]">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-white">
        <TouchableOpacity
          className="p-1"
          onPress={() => router.push("/(main)")}
        >
          <Feather name="arrow-left" size={24} color="#c41e3a" />
        </TouchableOpacity>
        <Text className="text-[18px] font-semibold text-[#1a1a1a]">
          Booking History
        </Text>
        <TouchableOpacity
          className="p-1"
          onPress={() => router.push(routes.notifications)}
        >
          <Feather name="bell" size={22} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      {/* Tab Bar */}
      <View className="flex-row px-5 pb-5 gap-2 bg-white">
        <TouchableOpacity
          className={
            listTab === "upcoming"
              ? "px-6 py-3 rounded-full bg-[#c41e3a]"
              : "px-6 py-3 rounded-full bg-white"
          }
          onPress={() => setListTab("upcoming")}
        >
          <Text
            className={
              listTab === "upcoming"
                ? "text-white text-[14px] font-medium"
                : "text-[#666] text-[14px] font-medium"
            }
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={
            listTab === "completed"
              ? "px-6 py-3 rounded-full bg-[#c41e3a]"
              : "px-6 py-3 rounded-full bg-white"
          }
          onPress={() => setListTab("completed")}
        >
          <Text
            className={
              listTab === "completed"
                ? "text-white text-[14px] font-medium"
                : "text-[#666] text-[14px] font-medium"
            }
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={
            listTab === "canceled"
              ? "px-6 py-3 rounded-full bg-[#c41e3a]"
              : "px-6 py-3 rounded-full bg-white"
          }
          onPress={() => setListTab("canceled")}
        >
          <Text
            className={
              listTab === "canceled"
                ? "text-white text-[14px] font-medium"
                : "text-[#666] text-[14px] font-medium"
            }
          >
            Canceled
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {listTab !== "upcoming" ? (
          <View className="px-6 py-8">
            <Text className="text-[14px] text-[#888] text-center leading-5">
              No {listTab} bookings in this demo. Switch to Upcoming to see
              sample data.
            </Text>
          </View>
        ) : null}

        {listTab === "upcoming" ? (
          <>
            {/* Booking Card 1 */}
            <View className="mx-5 mt-5 bg-white rounded-2xl p-5 shadow-sm elevation-[2]">
              <View className="flex-row mb-4">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200&h=200&fit=crop",
                  }}
                  className="w-[72px] h-[72px] rounded-xl bg-[#f0f0f0]"
                />
                <View className="flex-1 ml-3.5 justify-center">
                  <View className="self-end bg-[#fef0f0] px-2.5 py-1 rounded-lg mb-1">
                    <Text className="text-[10px] font-semibold text-[#c41e3a] tracking-[0.5px]">
                      CONFIRMED
                    </Text>
                  </View>
                  <Text className="text-[18px] font-semibold text-[#1a1a1a] mb-0.5">
                    Full Periodic Service
                  </Text>
                  <Text className="text-[14px] text-[#888]">
                    KIA EV9 • GT-Line
                  </Text>
                </View>
              </View>

              <View className="flex-row bg-[#fafafa] rounded-xl p-3.5 mb-4">
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 justify-center items-center mr-2">
                    <Feather name="calendar" size={16} color="#c41e3a" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-medium text-[#888] tracking-[0.5px]">
                      DATE
                    </Text>
                    <Text className="text-[14px] font-semibold text-[#1a1a1a] mt-0.5">
                      Oct 24, 2023
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 justify-center items-center mr-2">
                    <Feather name="clock" size={16} color="#888" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-medium text-[#888] tracking-[0.5px]">
                      TIME
                    </Text>
                    <Text className="text-[14px] font-semibold text-[#1a1a1a] mt-0.5">
                      09:30 AM
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 bg-[#c41e3a] py-3.5 rounded-full items-center"
                  onPress={() => router.push(routes.booking.selectAppointment)}
                >
                  <Text className="text-white text-[14px] font-semibold">
                    Reschedule
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-[0.6] bg-[#f0f0f0] py-3.5 rounded-full items-center"
                  onPress={() =>
                    Alert.alert("Cancel booking", "Demo only — no change made.")
                  }
                >
                  <Text className="text-[#1a1a1a] text-[14px] font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Booking Card 2 */}
            <View className="mx-5 mt-5 bg-white rounded-2xl p-5 shadow-sm elevation-[2]">
              <View className="flex-row mb-4">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=200&h=200&fit=crop",
                  }}
                  className="w-[72px] h-[72px] rounded-xl bg-[#f0f0f0]"
                />
                <View className="flex-1 ml-3.5 justify-center">
                  <View className="self-end bg-[#f5f5f5] px-2.5 py-1 rounded-lg mb-1">
                    <Text className="text-[10px] font-semibold text-[#888] tracking-[0.5px]">
                      IN QUEUE
                    </Text>
                  </View>
                  <Text className="text-[18px] font-semibold text-[#1a1a1a] mb-0.5">
                    Brake Inspection
                  </Text>
                  <Text className="text-[14px] text-[#888]">
                    KIA Sportage • 2022
                  </Text>
                </View>
              </View>

              <View className="flex-row bg-[#fafafa] rounded-xl p-3.5 mb-4">
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 justify-center items-center mr-2 border border-[#e8e8e8] rounded-md">
                    <Feather name="calendar" size={16} color="#c41e3a" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-medium text-[#888] tracking-[0.5px]">
                      DATE
                    </Text>
                    <Text className="text-[14px] font-semibold text-[#1a1a1a] mt-0.5">
                      Nov 02, 2023
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center flex-1">
                  <View className="w-8 h-8 justify-center items-center mr-2">
                    <Feather name="clock" size={16} color="#888" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-medium text-[#888] tracking-[0.5px]">
                      TIME
                    </Text>
                    <Text className="text-[14px] font-semibold text-[#1a1a1a] mt-0.5">
                      14:00 PM
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 bg-[#c41e3a] py-3.5 rounded-full items-center"
                  onPress={() => router.push(routes.booking.selectAppointment)}
                >
                  <Text className="text-white text-[14px] font-semibold">
                    Reschedule
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-[0.6] bg-[#f0f0f0] py-3.5 rounded-full items-center"
                  onPress={() =>
                    Alert.alert("Cancel booking", "Demo only — no change made.")
                  }
                >
                  <Text className="text-[#1a1a1a] text-[14px] font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}

        {/* Scroll Hint */}
        <View className="items-center py-12">
          <MaterialCommunityIcons name="history" size={32} color="#ccc" />
          <Text className="text-[14px] text-[#bbb] mt-3">
            Scroll down to view past service insights
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
