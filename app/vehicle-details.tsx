import { routes } from "@/constants/routes";
import { cardShadowStyle, primaryShadowStyle } from "@/constants/shadows";
import {
  ArrowLeft,
  BatteryCharging,
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
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="active:opacity-70 p-1 -ml-1"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="flex-1 text-sm font-jakarta-bold text-foreground ml-3 tracking-widest uppercase">
          Vehicle details{id ? ` · #${id}` : ""}
        </Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View
          className="h-[280px] bg-foreground relative mx-6 rounded-3xl overflow-hidden mb-6 mt-6 border border-border"
          style={cardShadowStyle}
        >
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vehicle%20Details-WBZHAr69OSLSNhArv5SteJex8xq0ws.png",
            }}
            className="w-full h-full absolute top-0"
            resizeMode="cover"
          />
          <View className="flex-1 justify-end p-5 bg-foreground/10">
            <View className="self-start bg-primary px-4 py-2 rounded-full">
              <Text className="text-xs font-manrope-bold text-white tracking-widest uppercase">
                Electric performance
              </Text>
            </View>
          </View>
        </View>

        <View className="px-6 pb-6">
          <Text className="text-3xl font-jakarta-extrabold text-foreground">
            KIA EV6{" "}
            <Text className="text-primary font-jakarta-bold">GT-Line</Text>
          </Text>
        </View>

        <View className="flex-row flex-wrap px-6 gap-4">
          <View
            className="w-[47%] bg-white rounded-3xl p-5 border border-border"
            style={cardShadowStyle}
          >
            <Car size={24} color="#93001B" strokeWidth={2} />
            <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
              Plate number
            </Text>
            <Text className="text-xl font-jakarta-bold text-foreground">
              ABC-1234
            </Text>
          </View>
          <View
            className="w-[47%] bg-white rounded-3xl p-5 border border-border"
            style={cardShadowStyle}
          >
            <Gauge size={24} color="#93001B" strokeWidth={2} />
            <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
              Odometer
            </Text>
            <Text className="text-xl font-jakarta-bold text-foreground">
              12,450{" "}
              <Text className="text-sm font-manrope text-muted">km</Text>
            </Text>
          </View>
          <View
            className="w-[47%] bg-white rounded-3xl p-5 border border-border"
            style={cardShadowStyle}
          >
            <BatteryCharging size={24} color="#93001B" strokeWidth={2} />
            <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
              Battery
            </Text>
            <Text className="text-xl font-jakarta-bold text-foreground">84%</Text>
          </View>
          <View
            className="w-[47%] bg-white rounded-3xl p-5 border border-border"
            style={cardShadowStyle}
          >
            <History size={24} color="#93001B" strokeWidth={2} />
            <Text className="text-[10px] font-manrope-bold text-label tracking-widest mt-4 mb-1 uppercase">
              Last service
            </Text>
            <Text className="text-xl font-jakarta-bold text-foreground">Oct 12</Text>
          </View>
        </View>

        <View
          className="mx-6 mt-6 bg-white rounded-3xl p-6 border border-border"
          style={cardShadowStyle}
        >
          <View className="flex-row justify-between items-start mb-6">
            <Text className="text-2xl font-jakarta-extrabold text-foreground leading-8">
              Vehicle{"\n"}health
            </Text>
            <View className="bg-badge-red px-4 py-2 rounded-full border border-border">
              <Text className="text-xs font-manrope-bold text-primary tracking-widest text-center uppercase">
                Optimal
              </Text>
            </View>
          </View>

          <View className="flex-row items-center py-3 border-b border-border">
            <View className="w-12 h-12 rounded-2xl bg-elevated justify-center items-center mr-4 border border-border">
              <Car size={20} color="#93001B" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-jakarta-bold text-foreground">
                Tire Pressure
              </Text>
              <Text className="text-sm font-manrope text-muted mt-0.5">
                All tires balanced
              </Text>
            </View>
            <Text className="text-base font-jakarta-extrabold text-foreground">
              36 PSI
            </Text>
          </View>

          <View className="flex-row items-center py-3 mt-1">
            <View className="w-12 h-12 rounded-2xl bg-elevated justify-center items-center mr-4 border border-border">
              <Droplet size={20} color="#93001B" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-jakarta-bold text-foreground">
                Brake Fluid
              </Text>
              <Text className="text-sm font-manrope text-muted mt-0.5">
                Level 92%
              </Text>
            </View>
            <Text className="text-base font-jakarta-extrabold text-foreground">
              Good
            </Text>
          </View>
        </View>

        <View
          className="mx-6 mt-6 bg-foreground rounded-3xl p-7 flex-row overflow-hidden min-h-[160px] border border-border"
          style={cardShadowStyle}
        >
          <View className="flex-1 justify-center relative z-10">
            <Text className="text-3xl font-jakarta-extrabold text-white leading-9 mb-2">
              V2L{"\n"}ready
            </Text>
            <Text className="text-sm font-manrope text-white/80 leading-relaxed pr-8">
              Vehicle-to-Load technology is active and ready to power your
              devices.
            </Text>
          </View>
          <View className="absolute -right-4 top-2">
            <Zap size={100} color="rgba(255,255,255,0.12)" strokeWidth={1} />
          </View>
        </View>

        <View className="px-6 pt-8">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-jakarta-bold text-foreground">
              Service timeline
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-sm font-manrope-bold text-primary tracking-wider">
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="flex-row items-center bg-white border border-border rounded-3xl p-5 mb-4 active:bg-elevated"
            style={cardShadowStyle}
          >
            <View className="items-center mr-5 pr-5 border-r border-border">
              <Text className="text-xs font-manrope-bold text-label tracking-widest uppercase">
                OCT
              </Text>
              <Text className="text-3xl font-jakarta-extrabold text-foreground mt-1">
                12
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-jakarta-bold text-foreground mb-1">
                12,000 km Checkup
              </Text>
              <Text className="text-sm font-manrope text-muted leading-5">
                Full diagnostic, Software update
              </Text>
            </View>
            <ChevronRight size={20} color="#71717A" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View className="px-6 pt-4 pb-12">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary h-14 rounded-full active:opacity-90"
            style={primaryShadowStyle}
            onPress={() => router.push(routes.booking.selectVehicle)}
          >
            <CalendarDays size={20} color="#fff" strokeWidth={2} />
            <Text className="text-lg font-manrope-bold text-white ml-3 tracking-wide">
              BOOK SERVICE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
