import { Card } from "@/components/ui/Card";
import { routes } from "@/constants/routes";
import { router } from "expo-router";
import { Bell, Calendar, Car, MapPin, Menu } from "lucide-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          onPress={() => router.push("/(main)/profile")}
          className="active:opacity-70 p-1 -ml-1"
        >
          <Menu size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
          KIA SERVICE
        </Text>
        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="active:opacity-70 p-1 -mr-1"
        >
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="px-6 pt-8 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Action Cards */}
        <View className="flex-row gap-4 mb-10">
          {/* Book Service Card */}
          <TouchableOpacity
            className="flex-1 bg-primary rounded-2xl p-6 justify-center shadow-card active:opacity-90"
            onPress={() => router.push(routes.booking.selectVehicle)}
          >
            <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mb-4">
              <Calendar size={24} color="#fff" />
            </View>
            <Text className="text-xl font-bold text-white mb-1">Book</Text>
            <Text className="text-xl font-bold text-white mb-3">Service</Text>
            <Text className="text-xs font-medium text-white/80 leading-relaxed">
              Schedule{"\n"}maintenance
            </Text>
          </TouchableOpacity>

          {/* Add Vehicle Card */}
          <TouchableOpacity
            className="flex-1 bg-surface rounded-2xl p-6 justify-center border border-border shadow-subtle active:opacity-80"
            onPress={() => router.push(routes.addVehicle)}
          >
            <View className="w-12 h-12 bg-background border border-border rounded-full items-center justify-center mb-4">
              <Car size={24} color="#111827" />
            </View>
            <Text className="text-xl font-bold text-text-primary mb-1">
              Add
            </Text>
            <Text className="text-xl font-bold text-text-primary mb-3">
              Vehicle
            </Text>
            <Text className="text-xs font-medium text-text-secondary leading-relaxed">
              Register{"\n"}new car
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointment Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-3xl font-medium text-text-primary leading-tight">
                Upcoming
              </Text>
              <Text className="text-3xl font-extrabold text-primary leading-tight">
                Appointment
              </Text>
            </View>
            <View className="bg-primary-soft border border-primary/20 px-3 py-1.5 rounded-lg mt-1">
              <Text className="text-[10px] font-extrabold tracking-widest text-primary uppercase">
                IN 3 DAYS
              </Text>
            </View>
          </View>
        </View>

        {/* Appointment Card */}
        <View className="bg-surface rounded-2xl p-6 shadow-card border border-border mb-8">
          {/* Confirmed Badge */}
          <View className="self-end bg-background border border-border px-3 py-1.5 rounded-md mb-4">
            <Text className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">
              CONFIRMED
            </Text>
          </View>

          {/* Appointment Title */}
          <Text className="text-2xl font-extrabold text-text-primary leading-tight mb-1">
            Full Maintenance
          </Text>
          <Text className="text-2xl font-bold text-text-primary leading-tight mb-4">
            Check
          </Text>

          {/* Location */}
          <View className="flex-row items-center gap-3 mb-6 bg-background/50 p-3 rounded-xl border border-border/50">
            <MapPin size={18} color="#E60012" />
            <Text className="text-sm font-bold text-text-secondary">
              KIA Central Agency
            </Text>
          </View>

          {/* Date and Time */}
          <View className="flex-row gap-6 mb-6 pb-6 border-b border-border border-dashed">
            <View className="flex-1">
              <Text className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">
                DATE
              </Text>
              <Text className="text-lg font-bold text-text-primary leading-snug">
                Oct 24,{"\n"}2024
              </Text>
            </View>
            <View className="w-[1px] bg-border" />
            <View className="flex-1">
              <Text className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2">
                TIME
              </Text>
              <Text className="text-lg font-bold text-text-primary leading-snug">
                09:30{"\n"}AM
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-primary rounded-xl h-14 items-center justify-center shadow-subtle active:opacity-80"
              onPress={() => router.push(routes.booking.selectAppointment)}
            >
              <Text className="text-sm font-bold text-white uppercase tracking-wide">
                View Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-background border border-border rounded-xl h-14 items-center justify-center active:opacity-70"
              onPress={() =>
                Alert.alert(
                  "Cancel Appointment",
                  "Are you sure you want to cancel this appointment?",
                  [
                    { text: "No", style: "cancel" },
                    { text: "Yes, Cancel", style: "destructive" },
                  ],
                )
              }
            >
              <Text className="text-sm font-bold text-text-primary uppercase tracking-wide">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
