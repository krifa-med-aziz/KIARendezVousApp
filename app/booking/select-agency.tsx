import { routes } from "@/constants/routes";
import {
  ArrowLeft,
  Bell,
  Clock,
  List,
  Map as MapIcon,
  MapPin,
  Minus,
  Navigation,
  Plus,
  SlidersHorizontal,
  Star,
} from "lucide-react-native";
import { router } from "expo-router";
import { Stepper } from "@/components/Stepper";
import { AGENCIES } from "@/data/mockData";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectAgencyScreen() {
  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          onPress={() => router.back()}
          className="active:opacity-70 p-1 -ml-1"
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>

        <View className="flex-1 ml-3 items-center">
          <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
            Select Agency
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="active:opacity-70 p-1 -mr-1"
        >
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={2} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map */}
        <View className="h-[320px] bg-background relative border-b border-border">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Booking_%20Select%20Agency%20%28Improved%29-m6igd2nYyViot3cCUImMbSvj4IRZ5N.png",
            }}
            className="absolute w-full h-full -top-12"
          />

          <View className="flex-1 bg-text-primary/5">
            {/* Tooltip */}
            <View className="absolute top-[100px] left-[100px] bg-text-primary px-4 py-2.5 rounded-xl shadow-card">
              <Text className="text-xs text-white font-bold tracking-wide">
                KIA Central Agency
              </Text>
            </View>

            {/* Location */}
            <TouchableOpacity className="absolute right-4 top-40 w-12 h-12 bg-surface rounded-xl items-center justify-center shadow-subtle border border-border active:opacity-80">
              <MapPin size={22} color="#111827" />
            </TouchableOpacity>

            {/* Zoom */}
            <View className="absolute right-4 top-[216px] bg-surface rounded-xl shadow-subtle border border-border overflow-hidden">
              <TouchableOpacity className="w-12 h-12 items-center justify-center active:bg-background">
                <Plus size={20} color="#111827" />
              </TouchableOpacity>
              <View className="h-[1px] bg-border mx-2" />
              <TouchableOpacity className="w-12 h-12 items-center justify-center active:bg-background">
                <Minus size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* Toggle */}
            <View className="absolute bottom-4 left-4 flex-row bg-surface rounded-xl p-1 shadow-subtle border border-border">
              <TouchableOpacity className="flex-row items-center bg-primary px-6 py-2.5 rounded-lg">
                <MapIcon size={16} color="#fff" />
                <Text className="text-white ml-2 text-sm font-bold">Map</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center px-6 py-2.5 rounded-lg active:bg-background">
                <List size={16} color="#6B7280" />
                <Text className="text-text-secondary ml-2 text-sm font-bold">
                  List
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Agencies */}
        <View className="p-6">
          {/* Header */}
          <View className="flex-row justify-between mb-6">
            <View>
              <Text className="text-2xl font-extrabold text-text-primary">
                Nearby Agencies
              </Text>
              <Text className="text-sm font-medium text-text-secondary mt-1">
                Found {AGENCIES.length} KIA service centers nearby
              </Text>
            </View>

            <TouchableOpacity className="p-2 bg-surface rounded-xl border border-border shadow-subtle h-12 w-12 items-center justify-center active:opacity-70">
              <SlidersHorizontal size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* List */}
          {AGENCIES.map((agency) => (
            <View
              key={agency.id}
              className="bg-surface rounded-2xl mb-5 shadow-subtle border border-border"
            >
              <View className="p-5">
                {/* Badge */}
                {agency.highlight && (
                  <View className="flex-row mb-3">
                    <View className="bg-primary px-3 py-1 rounded-md mr-2">
                      <Text className="text-white text-[10px] font-bold tracking-widest uppercase">
                        TOP RATED
                      </Text>
                    </View>
                    <View className="bg-primary-soft border border-primary/20 px-3 py-1 rounded-md">
                      <Text className="text-primary text-[10px] font-bold tracking-widest uppercase">
                        CLOSEST
                      </Text>
                    </View>
                  </View>
                )}

                {/* Info */}
                <View className="flex-row justify-between pt-1">
                  <View className="flex-1 pr-4">
                    {agency.highlight && (
                      <View className="flex-row items-center mb-1.5">
                        <Star size={14} color="#f5a623" fill="#f5a623" />
                        <Text className="ml-1.5 text-sm font-bold text-text-primary">
                          {agency.rating}
                        </Text>
                      </View>
                    )}

                    <Text className="text-xl font-bold text-text-primary mb-1.5">
                      {agency.name}
                    </Text>

                    <Text className="text-sm font-medium text-text-secondary leading-5 pr-2">
                      {agency.address}
                    </Text>
                  </View>

                  <Image
                    source={{
                      uri: agency.image,
                    }}
                    className="w-20 h-20 rounded-xl bg-background border border-border/50"
                  />
                </View>

                {/* Distance */}
                <View className="flex-row mt-4 mb-5 bg-background p-3 rounded-xl border border-border/50">
                  <View className="flex-row items-center mr-6">
                    <Navigation size={16} color="#E60012" />
                    <Text className="ml-2 text-sm font-bold text-primary">
                      {agency.distance}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Clock size={16} color="#6B7280" />
                    <Text className="ml-2 text-sm font-medium text-text-secondary">
                      Open until {agency.closingTime}
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() =>
                      router.push(routes.booking.selectAppointment)
                    }
                    className={`flex-1 h-14 rounded-xl items-center justify-center mr-3 active:opacity-80 transition-all ${
                      agency.highlight
                        ? "bg-primary shadow-card"
                        : "bg-background border border-border"
                    }`}
                  >
                    <Text
                      className={`font-bold text-base ${
                        agency.highlight ? "text-white" : "text-text-primary"
                      }`}
                    >
                      {agency.highlight
                        ? "SELECT THIS AGENCY"
                        : "Select Agency"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="w-14 h-14 bg-background border border-border rounded-xl items-center justify-center active:opacity-70">
                    <MapPin size={22} color="#111827" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
