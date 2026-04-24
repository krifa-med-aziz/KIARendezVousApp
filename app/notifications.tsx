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
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity
          className="p-1 -ml-1 active:opacity-70"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#E60012" />
        </TouchableOpacity>
        <Text className="text-sm font-bold tracking-widest text-text-primary uppercase">
          Notifications
        </Text>
        <TouchableOpacity
          className="p-1 -mr-1 active:opacity-70"
          onPress={() => router.push("/(main)/profile")}
        >
          <Settings size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase px-6 pt-8 pb-4">
          TODAY
        </Text>

        {/* Service Confirmed Notification */}
        <View className="mx-6 bg-surface rounded-2xl mb-4 overflow-hidden relative shadow-subtle border border-border">
          <View className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-10" />
          <View className="flex-row p-4 pl-5">
            <View className="w-12 h-12 rounded-xl bg-primary-soft justify-center items-center mr-4">
              <CalendarCheck size={20} color="#E60012" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1.5">
                <Text className="text-base font-bold text-text-primary">
                  Service Confirmed
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
                    2H AGO
                  </Text>
                  <View className="w-1.5 h-1.5 rounded-full bg-primary ml-2" />
                </View>
              </View>
              <Text className="text-sm font-medium text-text-secondary leading-relaxed">
                Your booking for Oct 24th is set. Our technician is ready for
                your arrival.
              </Text>
            </View>
          </View>
        </View>

        {/* Vehicle Health Alert Notification */}
        <View className="mx-6 bg-surface rounded-2xl p-4 flex-row mb-4 shadow-subtle border border-border">
          <View className="w-12 h-12 rounded-xl bg-background border border-border justify-center items-center mr-4">
            <Wrench size={22} color="#6B7280" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-base font-bold text-text-primary">
                Vehicle Health Alert
              </Text>
              <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
                5H AGO
              </Text>
            </View>
            <Text className="text-sm font-medium text-text-secondary leading-relaxed">
              It's time for your EV6's tire rotation to maintain optimal range
              and safety.
            </Text>
          </View>
        </View>

        {/* Promotional Banner */}
        <View className="mx-6 rounded-2xl overflow-hidden h-[200px] mb-4 shadow-card border border-border">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1449965408869-euj3c9c8f5e6?w=800&h=400&fit=crop",
            }}
            className="w-full h-full absolute"
          />
          <View className="absolute inset-0 bg-black/60" />
          <View className="flex-1 p-6 justify-center">
            <View className="bg-primary/90 self-start px-3 py-1 rounded-md mb-3">
              <Text className="text-[10px] font-bold text-white tracking-widest uppercase">
                SUMMER OFFER
              </Text>
            </View>
            <Text className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              15% OFF
            </Text>
            <Text className="text-sm font-medium text-white/90 leading-relaxed mb-5">
              Get 15% off your next periodic maintenance service at authorized
              centers.
            </Text>
            <TouchableOpacity className="self-start bg-white h-10 px-6 rounded-lg justify-center active:opacity-90">
              <Text className="text-xs font-bold text-text-primary tracking-widest uppercase">
                CLAIM REWARD
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Earlier Section */}
        <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase px-6 pt-8 pb-4">
          EARLIER
        </Text>

        {/* Service Completed Notification */}
        <View className="mx-6 bg-surface rounded-2xl p-4 flex-row mb-4 shadow-subtle border border-border opacity-75">
          <View className="w-12 h-12 rounded-xl bg-background border border-border justify-center items-center mr-4">
            <CheckCircle2 size={20} color="#9CA3AF" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-base font-bold text-text-primary">
                Service Completed
              </Text>
              <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
                2D AGO
              </Text>
            </View>
            <Text className="text-sm font-medium text-text-secondary leading-relaxed">
              Your EV6 was successfully serviced. You can view the full digital
              report now.
            </Text>
          </View>
        </View>

        {/* Welcome Notification */}
        <View className="mx-6 bg-surface rounded-2xl p-4 flex-row mb-12 shadow-subtle border border-border opacity-75">
          <View className="w-12 h-12 rounded-xl bg-background border border-border justify-center items-center mr-4">
            <Tag size={20} color="#9CA3AF" />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-base font-bold text-text-primary">
                Welcome to KIA Care
              </Text>
              <Text className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
                1W AGO
              </Text>
            </View>
            <Text className="text-sm font-medium text-text-secondary leading-relaxed">
              Thank you for joining the KIA service ecosystem. Explore your
              benefits today.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
