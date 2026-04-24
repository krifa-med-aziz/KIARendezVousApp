import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Bell, Menu, CalendarPlus, Car } from "lucide-react-native";
import { Badge } from "@/components/ui/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  cardShadowStyle,
  primaryShadowStyle,
  primaryTileShadowStyle,
  tileShadowStyle,
} from "@/constants/shadows";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="pt-6 px-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <TouchableOpacity className="p-2" activeOpacity={0.7}>
              <Menu size={22} color="#71717A" strokeWidth={2} />
            </TouchableOpacity>

            <Text className="text-xl font-jakarta-bold text-foreground tracking-wide">
              KIA SERVICE
            </Text>

            <TouchableOpacity className="p-2 relative" activeOpacity={0.7}>
              <Bell size={22} color="#93001B" strokeWidth={2} />
              <View className="absolute w-2 h-2 bg-primary rounded-full -top-1 -right-1" />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-10">
            <TouchableOpacity
              onPress={() => router.push("/bookings")}
              className="w-[48%] aspect-square rounded-3xl bg-primary p-6 justify-between"
              style={primaryTileShadowStyle}
              activeOpacity={0.9}
            >
              <CalendarPlus size={28} color="#fff" strokeWidth={2} />

              <View>
                <Text className="text-white text-lg font-jakarta-bold">
                  Book Service
                </Text>
                <Text className="text-white text-xs font-manrope opacity-80">
                  Schedule maintenance
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/vehicles")}
              className="w-[48%] aspect-square rounded-3xl bg-white p-6 justify-between border border-border"
              style={tileShadowStyle}
              activeOpacity={0.9}
            >
              <Car size={28} color="#93001B" strokeWidth={2} />

              <View>
                <Text className="text-foreground text-lg font-jakarta-bold">
                  Add Vehicle
                </Text>
                <Text className="text-muted text-xs font-manrope">
                  Register new car
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Upcoming Appointment */}
          <View className="mb-8">
            <View className="flex-row justify-between items-end mb-5">
              <Text className="text-2xl font-jakarta-bold text-foreground">
                Upcoming Appointment
              </Text>
              <Text className="text-xs font-manrope-bold text-primary tracking-wide">
                IN 3 DAYS
              </Text>
            </View>

            <View
              className="bg-white rounded-3xl p-6 border border-border"
              style={cardShadowStyle}
            >
              <Badge variant="red">CONFIRMED</Badge>

              <Text className="text-2xl font-jakarta-bold text-foreground mb-2 mt-4">
                Full Maintenance Check
              </Text>

              <Text className="text-sm font-manrope text-muted mb-6">
                KIA Central Agency
              </Text>

              <View className="flex-row justify-between mb-6">
                <View className="w-[48%] bg-elevated p-4 rounded-2xl">
                  <Text className="text-xs text-label font-manrope-semibold mb-1 tracking-wide uppercase">
                    DATE
                  </Text>
                  <Text className="text-base font-manrope-bold text-foreground">
                    Oct 24, 2024
                  </Text>
                </View>

                <View className="w-[48%] bg-elevated p-4 rounded-2xl">
                  <Text className="text-xs text-label font-manrope-semibold mb-1 tracking-wide uppercase">
                    TIME
                  </Text>
                  <Text className="text-base font-manrope-bold text-foreground">
                    09:30 AM
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-3">
                <PrimaryButton
                  label="View Details"
                  onPress={() => router.push("/bookings")}
                  className="flex-1"
                  style={primaryShadowStyle}
                />
                <SecondaryButton
                  label="Cancel"
                  onPress={() => {}}
                  className="flex-1"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
