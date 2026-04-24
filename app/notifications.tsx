import { Badge } from "@/components/ui/Badge";
import { cardShadowStyle } from "@/constants/shadows";
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Settings,
  Tag,
  Wrench,
} from "lucide-react-native";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
          Notifications
        </Text>
        <TouchableOpacity
          className="p-1 -mr-1 active:opacity-70"
          onPress={() => router.push("/(main)/profile")}
        >
          <Settings size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase px-6 pt-8 pb-4">
          Today
        </Text>

        <View
          className="mx-6 bg-white rounded-3xl mb-4 overflow-hidden border border-border relative"
          style={cardShadowStyle}
        >
          <View className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-10" />
          <View className="flex-row p-5 pl-5">
            <View className="w-12 h-12 rounded-2xl bg-badge-red justify-center items-center mr-4">
              <CalendarCheck size={20} color="#93001B" strokeWidth={2} />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1.5">
                <Text className="text-base font-jakarta-bold text-foreground">
                  Service confirmed
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase">
                    2H AGO
                  </Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-primary ml-2" />
                </View>
              </View>
              <Text className="text-sm font-manrope text-muted leading-relaxed">
                Your booking for Oct 24th is set. Our technician is ready for
                your arrival.
              </Text>
            </View>
          </View>
        </View>

        <View
          className="mx-6 bg-white rounded-3xl p-4 flex-row mb-4 border border-border"
          style={cardShadowStyle}
        >
          <View className="w-12 h-12 rounded-2xl bg-elevated border border-border justify-center items-center mr-4">
            <Wrench size={22} color="#71717A" strokeWidth={2} />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-base font-jakarta-bold text-foreground">
                Vehicle health alert
              </Text>
              <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase">
                5H AGO
              </Text>
            </View>
            <Text className="text-sm font-manrope text-muted leading-relaxed">
              It&apos;s time for your EV6&apos;s tire rotation to maintain
              optimal range and safety.
            </Text>
          </View>
        </View>

        <View
          className="mx-6 rounded-3xl overflow-hidden min-h-[200px] mb-4 border border-border relative"
          style={cardShadowStyle}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1449965408869-euj3c9c8f5e6?w=800&h=400&fit=crop",
            }}
            className="w-full h-full absolute"
          />
          <View className="absolute inset-0 bg-foreground/55" />
          <View className="flex-1 p-6 justify-center min-h-[200px]">
            <View className="self-start mb-3">
              <Badge variant="red">SUMMER OFFER</Badge>
            </View>
            <Text className="text-3xl font-jakarta-extrabold text-white mb-2 tracking-tight">
              15% off
            </Text>
            <Text className="text-sm font-manrope text-white/90 leading-relaxed mb-5">
              Get 15% off your next periodic maintenance service at authorized
              centers.
            </Text>
            <TouchableOpacity className="self-start bg-white py-3 px-6 rounded-full active:opacity-90">
              <Text className="text-xs font-manrope-bold text-foreground tracking-widest uppercase">
                Claim reward
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase px-6 pt-8 pb-4">
          Earlier
        </Text>

        <View
          className="mx-6 bg-white rounded-3xl p-4 flex-row mb-4 border border-border opacity-80"
          style={cardShadowStyle}
        >
          <View className="w-12 h-12 rounded-2xl bg-elevated border border-border justify-center items-center mr-4">
            <CheckCircle2 size={20} color="#71717A" strokeWidth={2} />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-base font-jakarta-bold text-foreground">
                Service completed
              </Text>
              <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase">
                2D AGO
              </Text>
            </View>
            <Text className="text-sm font-manrope text-muted leading-relaxed">
              Your EV6 was successfully serviced. You can view the full digital
              report now.
            </Text>
          </View>
        </View>

        <View
          className="mx-6 bg-white rounded-3xl p-4 flex-row mb-12 border border-border opacity-80"
          style={cardShadowStyle}
        >
          <View className="w-12 h-12 rounded-2xl bg-elevated border border-border justify-center items-center mr-4">
            <Tag size={20} color="#71717A" strokeWidth={2} />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-base font-jakarta-bold text-foreground">
                Welcome to KIA Care
              </Text>
              <Text className="text-[10px] font-manrope-bold text-muted tracking-widest uppercase">
                1W AGO
              </Text>
            </View>
            <Text className="text-sm font-manrope text-muted leading-relaxed">
              Thank you for joining the KIA service ecosystem. Explore your
              benefits today.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
