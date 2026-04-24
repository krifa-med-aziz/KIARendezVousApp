import { routes } from "@/constants/routes";
import {
  ArrowLeft,
  BatteryCharging,
  Calendar,
  CalendarDays,
  Car,
  ChevronRight,
  Droplet,
  Gauge,
  History,
  Wrench,
  Zap,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VehicleDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="flex-row items-center px-6 py-4 bg-background">
        <TouchableOpacity
          className="active:opacity-70 p-1 -ml-1"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#E60012" />
        </TouchableOpacity>
        <Text className="flex-1 text-sm font-bold text-text-primary ml-3 tracking-widest uppercase">
          VEHICLE DETAILS{id ? ` · #${id}` : ""}
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Vehicle Image */}
        <View className="h-[280px] bg-text-primary relative mx-6 rounded-2xl overflow-hidden shadow-subtle mb-6 mt-2">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vehicle%20Details-WBZHAr69OSLSNhArv5SteJex8xq0ws.png",
            }}
            className="w-full h-full absolute top-0"
            resizeMode="cover"
          />
          <View className="flex-1 justify-end p-5 bg-black/10">
            <View className="self-start bg-primary/95 backdrop-blur-md px-4 py-2 rounded-lg">
              <Text className="text-xs font-bold text-white tracking-widest uppercase">
                ELECTRIC PERFORMANCE
              </Text>
            </View>
          </View>
        </View>

        {/* Vehicle Name */}
        <View className="px-6 pb-6">
          <Text className="text-4xl font-extrabold text-text-primary">
            KIA EV6 <Text className="text-primary font-bold">GT-Line</Text>
          </Text>
        </View>

        {/* Info Grid */}
        <View className="flex-row flex-wrap px-6 gap-4">
          <View className="w-[47%] bg-surface rounded-2xl p-5 border border-border shadow-subtle">
            <Car size={24} color="#E60012" />
            <Text className="text-[10px] font-bold text-text-muted tracking-widest mt-4 mb-1 uppercase">
              PLATE NUMBER
            </Text>
            <Text className="text-xl font-bold text-text-primary">
              ABC-1234
            </Text>
          </View>
          <View className="w-[47%] bg-surface rounded-2xl p-5 border border-border shadow-subtle">
            <Gauge size={24} color="#E60012" />
            <Text className="text-[10px] font-bold text-text-muted tracking-widest mt-4 mb-1 uppercase">
              ODOMETER
            </Text>
            <Text className="text-xl font-bold text-text-primary">
              12,450{" "}
              <Text className="text-sm font-medium text-text-secondary">
                km
              </Text>
            </Text>
          </View>
          <View className="w-[47%] bg-surface rounded-2xl p-5 border border-border shadow-subtle">
            <BatteryCharging size={24} color="#E60012" />
            <Text className="text-[10px] font-bold text-text-muted tracking-widest mt-4 mb-1 uppercase">
              BATTERY
            </Text>
            <Text className="text-xl font-bold text-text-primary">84%</Text>
          </View>
          <View className="w-[47%] bg-surface rounded-2xl p-5 border border-border shadow-subtle">
            <History size={24} color="#E60012" />
            <Text className="text-[10px] font-bold text-text-muted tracking-widest mt-4 mb-1 uppercase">
              LAST SERVICE
            </Text>
            <Text className="text-xl font-bold text-text-primary">Oct 12</Text>
          </View>
        </View>

        {/* Vehicle Health */}
        <View className="mx-6 mt-6 bg-surface rounded-2xl p-6 border border-border shadow-subtle">
          <View className="flex-row justify-between items-start mb-6">
            <Text className="text-2xl font-extrabold text-text-primary leading-8">
              Vehicle{"\n"}Health
            </Text>
            <View className="bg-primary-soft px-4 py-2 rounded-xl">
              <Text className="text-xs font-bold text-primary tracking-widest text-center uppercase">
                OPTIMAL
              </Text>
            </View>
          </View>

          <View className="flex-row items-center py-3 border-b border-border/50">
            <View className="w-12 h-12 rounded-xl bg-background justify-center items-center mr-4 border border-border/50">
              <Car size={20} color="#E60012" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-text-primary">
                Tire Pressure
              </Text>
              <Text className="text-sm text-text-secondary mt-0.5">
                All tires balanced
              </Text>
            </View>
            <Text className="text-base font-extrabold text-text-primary">
              36 PSI
            </Text>
          </View>

          <View className="flex-row items-center py-3 mt-1">
            <View className="w-12 h-12 rounded-xl bg-background justify-center items-center mr-4 border border-border/50">
              <Droplet size={20} color="#E60012" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-text-primary">
                Brake Fluid
              </Text>
              <Text className="text-sm text-text-secondary mt-0.5">
                Level 92%
              </Text>
            </View>
            <Text className="text-base font-extrabold text-text-primary">
              Good
            </Text>
          </View>
        </View>

        {/* V2L Ready Card */}
        <View className="mx-6 mt-6 bg-text-primary rounded-2xl p-7 flex-row overflow-hidden min-h-[160px] shadow-card">
          <View className="flex-1 justify-center relative z-10">
            <Text className="text-3xl font-extrabold text-white leading-9 mb-2">
              V2L{"\n"}Ready
            </Text>
            <Text className="text-sm text-white/70 leading-relaxed pr-8">
              Vehicle-to-Load technology is active and ready to power your
              devices.
            </Text>
          </View>
          <View className="absolute -right-4 top-2">
            <Zap size={100} color="rgba(255,255,255,0.1)" strokeWidth={1} />
          </View>
        </View>

        {/* Service Timeline */}
        <View className="px-6 pt-8">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-bold text-text-primary">
              Service Timeline
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-bold text-primary tracking-wider">
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="flex-row items-center bg-surface border border-border shadow-subtle rounded-2xl p-5 mb-4 active:bg-background">
            <View className="items-center mr-5 pr-5 border-r border-border">
              <Text className="text-xs font-bold text-text-muted tracking-widest uppercase">
                OCT
              </Text>
              <Text className="text-3xl font-extrabold text-text-primary mt-1">
                12
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-text-primary mb-1">
                12,000 km Checkup
              </Text>
              <Text className="text-sm text-text-secondary leading-5">
                Full diagnostic, Software update
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Book Service Button */}
        <View className="px-6 pt-4 pb-12">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary h-14 rounded-xl active:opacity-80 shadow-card"
            onPress={() => router.push(routes.booking.selectVehicle)}
          >
            <CalendarDays size={20} color="#fff" />
            <Text className="text-lg font-bold text-white ml-3 tracking-wide">
              BOOK SERVICE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
