import { Card } from "@/components/ui/Card";
import { routes } from "@/constants/routes";
import { router } from "expo-router";
import { Bell, MapPin, Menu } from "lucide-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-surface border-b border-border">
        <TouchableOpacity onPress={() => router.push("/(main)/profile")}>
          <Menu size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold tracking-[1px] text-text">
          KIA SERVICE
        </Text>
        <TouchableOpacity onPress={() => router.push(routes.notifications)}>
          <Bell size={24} color="#c41e3a" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4 pt-6 pb-10">
        {/* Action Cards */}
        <View className="flex-row gap-3 mb-10">
          {/* Book Service Card */}
          <TouchableOpacity
            className="flex-1 bg-primary rounded-2xl p-6 justify-center"
            activeOpacity={0.9}
            onPress={() => router.push(routes.booking.selectVehicle)}
          >
            <Text className="text-[32px] mb-3">📅</Text>
            <Text className="text-[18px] font-bold text-surface">Book</Text>
            <Text className="text-[18px] font-bold text-surface">Service</Text>
            <Text className="text-[12px] font-medium text-surface opacity-90">
              Schedule
            </Text>
            <Text className="text-[12px] font-medium text-surface opacity-90">
              maintenance
            </Text>
          </TouchableOpacity>

          {/* Add Vehicle Card */}
          <TouchableOpacity
            className="flex-1 bg-surface rounded-2xl p-6 justify-center border border-border"
            activeOpacity={0.9}
            onPress={() => router.push(routes.addVehicle)}
          >
            <Text className="text-[32px] mb-3">🚗</Text>
            <Text className="text-[18px] font-bold text-text">Add</Text>
            <Text className="text-[18px] font-bold text-text">Vehicle</Text>
            <Text className="text-[12px] font-medium text-textMuted">
              Register new car
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointment Section */}
        <View className="mb-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-[28px] font-semibold text-text leading-[32px]">
                Upcoming
              </Text>
              <Text className="text-[28px] font-semibold text-text leading-[32px]">
                Appointment
              </Text>
            </View>
            <View className="bg-inputBackground px-3 py-2 rounded-md">
              <Text className="text-[11px] font-semibold tracking-[1px] text-primary">
                IN 3
              </Text>
              <Text className="text-[11px] font-semibold tracking-[1px] text-primary">
                DAYS
              </Text>
            </View>
          </View>
        </View>

        {/* Appointment Card */}
        <Card className="p-6 mb-0">
          {/* Confirmed Badge */}
          <View className="self-end bg-primaryLight px-3 py-1.5 rounded-sm mb-4">
            <Text className="text-[10px] font-semibold tracking-[1px] text-primary">
              CONFIRMED
            </Text>
          </View>

          {/* Appointment Title */}
          <Text className="text-[28px] font-semibold text-text leading-[32px] mb-2">
            Full Maintenance
          </Text>
          <Text className="text-[28px] font-semibold text-text leading-[32px] mb-2">
            Check
          </Text>

          {/* Location */}
          <View className="flex-row items-center gap-2 mb-6">
            <MapPin size={16} color="#c41e3a" />
            <Text className="text-[14px] font-medium text-textSecondary">
              KIA Central Agency
            </Text>
          </View>

          {/* Date and Time */}
          <View className="flex-row gap-4 mb-6 pb-6 border-b border-border">
            <View className="flex-1">
              <Text className="text-[12px] font-medium tracking-[0.5px] text-textMuted mb-1.5">
                DATE
              </Text>
              <Text className="text-[16px] font-bold text-text leading-5">
                Oct 24,
              </Text>
              <Text className="text-[16px] font-bold text-text leading-5">
                2024
              </Text>
            </View>
            <View className="w-[1px] bg-border" />
            <View className="flex-1">
              <Text className="text-[12px] font-medium tracking-[0.5px] text-textMuted mb-1.5">
                TIME
              </Text>
              <Text className="text-[16px] font-bold text-text leading-5">
                09:30 AM
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-primary rounded-xl py-3.5 items-center"
              onPress={() => router.push(routes.booking.selectAppointment)}
            >
              <Text className="text-[14px] font-semibold text-surface">
                View Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-inputBackground rounded-xl py-3.5 items-center"
              onPress={() =>
                Alert.alert(
                  "Cancel appointment",
                  "Cancellation would be confirmed here — demo only.",
                )
              }
            >
              <Text className="text-[14px] font-semibold text-text">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
