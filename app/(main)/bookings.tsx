import { Badge } from "@/components/ui/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { routes } from "@/constants/routes";
import { cardShadowStyle } from "@/constants/shadows";
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
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={() => router.push("/(main)")}
        >
          <ChevronLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
          Booking History
        </Text>
        <TouchableOpacity
          className="p-1 -mr-1 active:opacity-70"
          onPress={() => router.push(routes.notifications)}
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View className="bg-white border-b border-border">
        <View className="flex-row px-6 py-4 gap-3">
          {(
            [
              ["upcoming", "Upcoming"],
              ["completed", "Completed"],
              ["canceled", "Canceled"],
            ] as const
          ).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              className={`px-5 py-2.5 rounded-full border ${
                listTab === key
                  ? "bg-primary border-primary"
                  : "bg-elevated border-border"
              }`}
              onPress={() => setListTab(key)}
              style={listTab === key ? cardShadowStyle : undefined}
            >
              <Text
                className={`text-xs font-manrope-bold tracking-widest uppercase ${
                  listTab === key ? "text-white" : "text-muted"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {listTab !== "upcoming" ? (
          <View className="px-6 py-12 items-center">
            <History size={48} color="#71717A" strokeWidth={1.5} />
            <Text className="text-base font-manrope text-muted text-center leading-relaxed mt-4">
              No {listTab} bookings in this demo.{"\n"}Switch to Upcoming to
              see sample data.
            </Text>
          </View>
        ) : null}

        {listTab === "upcoming" ? (
          <View className="p-6">
            <View
              className="bg-white border border-border rounded-3xl p-6 mb-6"
              style={cardShadowStyle}
            >
              <View className="flex-row mb-6">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200&h=200&fit=crop",
                  }}
                  className="w-20 h-20 rounded-2xl bg-elevated"
                />
                <View className="flex-1 ml-4 justify-center">
                  <View className="self-end mb-2">
                    <Badge variant="red">CONFIRMED</Badge>
                  </View>
                  <Text className="text-lg font-jakarta-bold text-foreground mb-1">
                    Full Periodic Service
                  </Text>
                  <Text className="text-xs font-manrope-bold text-muted uppercase tracking-widest">
                    KIA EV9 • GT-Line
                  </Text>
                </View>
              </View>

              <View className="flex-row bg-elevated rounded-2xl p-4 mb-6 border border-border">
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-white border border-border rounded-full justify-center items-center mr-3">
                    <Calendar size={18} color="#93001B" strokeWidth={2} />
                  </View>
                  <View>
                    <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                      DATE
                    </Text>
                    <Text className="text-sm font-manrope-bold text-foreground">
                      Oct 24, 2023
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-white border border-border rounded-full justify-center items-center mr-3">
                    <Clock size={18} color="#71717A" strokeWidth={2} />
                  </View>
                  <View>
                    <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                      TIME
                    </Text>
                    <Text className="text-sm font-manrope-bold text-foreground">
                      09:30 AM
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <PrimaryButton
                    label="Reschedule"
                    onPress={() =>
                      router.push(routes.booking.selectAppointment)
                    }
                    className="w-full"
                  />
                </View>
                <View className="flex-[0.85]">
                  <SecondaryButton
                    label="Cancel"
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
                    className="w-full"
                  />
                </View>
              </View>
            </View>

            <View
              className="bg-white border border-border rounded-3xl p-6"
              style={cardShadowStyle}
            >
              <View className="flex-row mb-6">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=200&h=200&fit=crop",
                  }}
                  className="w-20 h-20 rounded-2xl bg-elevated"
                />
                <View className="flex-1 ml-4 justify-center">
                  <View className="self-end mb-2">
                    <Badge variant="neutral">IN QUEUE</Badge>
                  </View>
                  <Text className="text-lg font-jakarta-bold text-foreground mb-1">
                    Brake Inspection
                  </Text>
                  <Text className="text-xs font-manrope-bold text-muted uppercase tracking-widest">
                    KIA Sportage • 2022
                  </Text>
                </View>
              </View>

              <View className="flex-row bg-elevated rounded-2xl p-4 mb-6 border border-border">
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-white border border-border rounded-full justify-center items-center mr-3">
                    <Calendar size={18} color="#93001B" strokeWidth={2} />
                  </View>
                  <View>
                    <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                      DATE
                    </Text>
                    <Text className="text-sm font-manrope-bold text-foreground">
                      Nov 02, 2023
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-white border border-border rounded-full justify-center items-center mr-3">
                    <Clock size={18} color="#71717A" strokeWidth={2} />
                  </View>
                  <View>
                    <Text className="text-[10px] font-manrope-bold text-label tracking-widest uppercase mb-1">
                      TIME
                    </Text>
                    <Text className="text-sm font-manrope-bold text-foreground">
                      14:00 PM
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <PrimaryButton
                    label="Reschedule"
                    onPress={() =>
                      router.push(routes.booking.selectAppointment)
                    }
                    className="w-full"
                  />
                </View>
                <View className="flex-[0.85]">
                  <SecondaryButton
                    label="Cancel"
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
                    className="w-full"
                  />
                </View>
              </View>
            </View>
          </View>
        ) : null}

        <View className="items-center py-8 opacity-60">
          <History size={32} color="#71717A" strokeWidth={2} />
          <Text className="text-xs font-manrope-medium text-muted mt-3 text-center px-6">
            Scroll down to view past service insights
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
