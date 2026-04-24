import { routes } from "@/constants/routes";
import {
  Bell,
  Calendar,
  ChevronLeft,
  Clock,
  History,
} from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingsScreen() {
  const [listTab, setListTab] = useState<"upcoming" | "completed" | "canceled">(
    "upcoming",
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={() => router.push("/(main)")}
        >
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
          Booking History
        </Text>
        <TouchableOpacity
          className="p-1 -mr-1 active:opacity-70"
          onPress={() => router.push(routes.notifications)}
        >
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View className="bg-surface">
        {/* Tab Bar */}
        <View className="flex-row px-6 py-4 gap-3 bg-surface border-b border-border/50">
          <TouchableOpacity
            className={
              listTab === "upcoming"
                ? "px-5 py-2.5 rounded-xl bg-primary shadow-subtle"
                : "px-5 py-2.5 rounded-xl bg-background border border-border"
            }
            onPress={() => setListTab("upcoming")}
          >
            <Text
              className={
                listTab === "upcoming"
                  ? "text-white text-xs font-bold tracking-widest uppercase"
                  : "text-text-secondary text-xs font-bold tracking-widest uppercase"
              }
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              listTab === "completed"
                ? "px-5 py-2.5 rounded-xl bg-primary shadow-subtle"
                : "px-5 py-2.5 rounded-xl bg-background border border-border"
            }
            onPress={() => setListTab("completed")}
          >
            <Text
              className={
                listTab === "completed"
                  ? "text-white text-xs font-bold tracking-widest uppercase"
                  : "text-text-secondary text-xs font-bold tracking-widest uppercase"
              }
            >
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              listTab === "canceled"
                ? "px-5 py-2.5 rounded-xl bg-primary shadow-subtle"
                : "px-5 py-2.5 rounded-xl bg-background border border-border"
            }
            onPress={() => setListTab("canceled")}
          >
            <Text
              className={
                listTab === "canceled"
                  ? "text-white text-xs font-bold tracking-widest uppercase"
                  : "text-text-secondary text-xs font-bold tracking-widest uppercase"
              }
            >
              Canceled
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {listTab !== "upcoming" ? (
          <View className="px-6 py-12 items-center">
            <History size={48} color="#D1D5DB" className="mb-4" />
            <Text className="text-base text-text-secondary text-center leading-relaxed">
              No {listTab} bookings in this demo.{"\n"}Switch to Upcoming to see
              sample data.
            </Text>
          </View>
        ) : null}

        {listTab === "upcoming" ? (
          <View className="p-6">
            {/* Booking Card 1 */}
            <View className="bg-surface border border-border rounded-2xl p-6 shadow-subtle mb-6">
              <View className="flex-row mb-6">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200&h=200&fit=crop",
                  }}
                  className="w-20 h-20 rounded-xl bg-background"
                />
                <View className="flex-1 ml-4 justify-center">
                  <View className="self-end bg-background border border-border px-3 py-1.5 rounded-md mb-2">
                    <Text className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">
                      CONFIRMED
                    </Text>
                  </View>
                  <Text className="text-lg font-bold text-text-primary mb-1">
                    Full Periodic Service
                  </Text>
                  <Text className="text-xs font-bold text-text-muted uppercase tracking-widest">
                    KIA EV9 • GT-Line
                  </Text>
                </View>
              </View>

              <View className="flex-row bg-background/50 rounded-xl p-4 mb-6 border border-border/50">
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-background border border-border rounded-full justify-center items-center mr-3">
                    <Calendar size={18} color="#E60012" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                      DATE
                    </Text>
                    <Text className="text-sm font-bold text-text-primary">
                      Oct 24, 2023
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-background border border-border rounded-full justify-center items-center mr-3">
                    <Clock size={18} color="#6B7280" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                      TIME
                    </Text>
                    <Text className="text-sm font-bold text-text-primary">
                      09:30 AM
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 bg-primary h-14 rounded-xl items-center justify-center active:opacity-80 shadow-subtle"
                  onPress={() => router.push(routes.booking.selectAppointment)}
                >
                  <Text className="text-sm text-white font-bold tracking-widest uppercase">
                    Reschedule
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-[0.7] bg-background border border-border h-14 rounded-xl items-center justify-center active:bg-text-secondary/10"
                  onPress={() =>
                    Alert.alert(
                      "Cancel booking",
                      "Are you sure you want to cancel this booking?",
                      [
                        { text: "No", style: "cancel" },
                        { text: "Yes, Cancel", style: "destructive" },
                      ],
                    )
                  }
                >
                  <Text className="text-text-primary text-sm font-bold tracking-widest uppercase">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Booking Card 2 */}
            <View className="bg-surface border border-border rounded-2xl p-6 shadow-subtle">
              <View className="flex-row mb-6">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=200&h=200&fit=crop",
                  }}
                  className="w-20 h-20 rounded-xl bg-background"
                />
                <View className="flex-1 ml-4 justify-center">
                  <View className="self-end bg-background border border-border px-3 py-1.5 rounded-md mb-2">
                    <Text className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">
                      IN QUEUE
                    </Text>
                  </View>
                  <Text className="text-lg font-bold text-text-primary mb-1">
                    Brake Inspection
                  </Text>
                  <Text className="text-xs font-bold text-text-muted uppercase tracking-widest">
                    KIA Sportage • 2022
                  </Text>
                </View>
              </View>

              <View className="flex-row bg-background/50 rounded-xl p-4 mb-6 border border-border/50">
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-background border border-border rounded-full justify-center items-center mr-3">
                    <Calendar size={18} color="#E60012" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                      DATE
                    </Text>
                    <Text className="text-sm font-bold text-text-primary">
                      Nov 02, 2023
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-background border border-border rounded-full justify-center items-center mr-3">
                    <Clock size={18} color="#6B7280" />
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">
                      TIME
                    </Text>
                    <Text className="text-sm font-bold text-text-primary">
                      14:00 PM
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  className="flex-1 bg-primary h-14 rounded-xl items-center justify-center active:opacity-80 shadow-subtle"
                  onPress={() => router.push(routes.booking.selectAppointment)}
                >
                  <Text className="text-sm text-white font-bold tracking-widest uppercase">
                    Reschedule
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-[0.7] bg-background border border-border h-14 rounded-xl items-center justify-center active:bg-text-secondary/10"
                  onPress={() =>
                    Alert.alert(
                      "Cancel booking",
                      "Are you sure you want to cancel this booking?",
                      [
                        { text: "No", style: "cancel" },
                        { text: "Yes, Cancel", style: "destructive" },
                      ],
                    )
                  }
                >
                  <Text className="text-text-primary text-sm font-bold tracking-widest uppercase">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {/* Scroll Hint */}
        <View className="items-center py-8 opacity-50">
          <History size={32} color="#9CA3AF" />
          <Text className="text-xs font-medium text-text-muted mt-3">
            Scroll down to view past service insights
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
