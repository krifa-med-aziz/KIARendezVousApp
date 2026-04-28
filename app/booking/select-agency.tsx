import { routes } from "@/constants/routes";
import { cardShadowStyle } from "@/constants/shadows";
import { useBooking } from "@/context/BookingContext";
import { AGENCIES } from "@/data/mockData";
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
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
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
  const { selectedAgency, setAgency } = useBooking();
  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  const selectAndContinue = (agency: (typeof AGENCIES)[number]) => {
    setAgency(agency);
    router.push(routes.booking.selectAppointment);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          onPress={() => router.back()}
          className="active:opacity-70 p-1 -ml-1"
        >
          <ArrowLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>

        <View className="flex-1 ml-3 items-center">
          <Text className="text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
            Select Agency
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="active:opacity-70 p-1 -mr-1"
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={2} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-[320px] bg-elevated relative border-b border-border">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Booking_%20Select%20Agency%20%28Improved%29-m6igd2nYyViot3cCUImMbSvj4IRZ5N.png",
            }}
            className="absolute w-full h-full -top-12"
          />

          <View className="flex-1 bg-foreground/5">
            <View
              className="absolute top-[100px] left-[100px] bg-foreground px-4 py-2.5 rounded-2xl border border-border"
              style={cardShadowStyle}
            >
              <Text className="text-xs text-white font-manrope-bold tracking-wide">
                {selectedAgency?.name ?? "Select an agency"}
              </Text>
            </View>

            <TouchableOpacity className="absolute right-4 top-40 w-12 h-12 bg-white rounded-2xl items-center justify-center border border-border active:opacity-80"
              style={cardShadowStyle}
            >
              <MapPin size={22} color="#1A1C1C" strokeWidth={2} />
            </TouchableOpacity>

            <View
              className="absolute right-4 top-[216px] bg-white rounded-2xl border border-border overflow-hidden"
              style={cardShadowStyle}
            >
              <TouchableOpacity className="w-12 h-12 items-center justify-center active:bg-elevated">
                <Plus size={20} color="#1A1C1C" strokeWidth={2} />
              </TouchableOpacity>
              <View className="h-px bg-border mx-2" />
              <TouchableOpacity className="w-12 h-12 items-center justify-center active:bg-elevated">
                <Minus size={20} color="#1A1C1C" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View className="absolute bottom-4 left-4 flex-row bg-white rounded-2xl p-1 border border-border"
              style={cardShadowStyle}
            >
              <TouchableOpacity className="flex-row items-center bg-primary px-6 py-2.5 rounded-full">
                <MapIcon size={16} color="#fff" strokeWidth={2} />
                <Text className="text-white ml-2 text-sm font-manrope-bold">
                  Map
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center px-6 py-2.5 rounded-full active:bg-elevated">
                <List size={16} color="#71717A" strokeWidth={2} />
                <Text className="text-muted ml-2 text-sm font-manrope-bold">
                  List
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="p-6">
          <View className="flex-row justify-between mb-8">
            <View>
              <Text className="text-2xl font-jakarta-extrabold text-foreground">
                Nearby agencies
              </Text>
              <Text className="text-sm font-manrope text-muted mt-1">
                Found {AGENCIES.length} KIA service centers nearby
              </Text>
            </View>

            <TouchableOpacity className="p-2 bg-white rounded-2xl border border-border h-12 w-12 items-center justify-center active:opacity-70"
              style={cardShadowStyle}
            >
              <SlidersHorizontal size={20} color="#1A1C1C" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {AGENCIES.map((agency) => {
            const isSelected = selectedAgency?.id === agency.id;
            return (
              <View
                key={agency.id}
                className={`bg-white rounded-3xl mb-6 border ${
                  isSelected ? "border-primary" : "border-border"
                }`}
                style={cardShadowStyle}
              >
                <View className="p-6">
                  {agency.highlight && (
                    <View className="flex-row mb-3 gap-2 flex-wrap">
                      <View className="bg-primary px-3 py-1 rounded-full">
                        <Text className="text-white text-[10px] font-manrope-bold tracking-widest uppercase">
                          TOP RATED
                        </Text>
                      </View>
                      <View className="bg-badge-red border border-border px-3 py-1 rounded-full">
                        <Text className="text-primary text-[10px] font-manrope-bold tracking-widest uppercase">
                          CLOSEST
                        </Text>
                      </View>
                    </View>
                  )}

                  <View className="flex-row justify-between pt-1">
                    <View className="flex-1 pr-4">
                      {agency.highlight && (
                        <View className="flex-row items-center mb-1.5">
                          <Star size={14} color="#93001B" fill="#93001B" />
                          <Text className="ml-1.5 text-sm font-manrope-bold text-foreground">
                            {agency.rating}
                          </Text>
                        </View>
                      )}

                      <Text className="text-xl font-jakarta-bold text-foreground mb-1.5">
                        {agency.name}
                      </Text>

                      <Text className="text-sm font-manrope text-muted leading-5 pr-2">
                        {agency.address}
                      </Text>
                    </View>

                    <Image
                      source={{
                        uri: agency.image,
                      }}
                      className="w-20 h-20 rounded-2xl bg-elevated border border-border"
                    />
                  </View>

                  <View className="flex-row mt-4 mb-5 bg-elevated p-3 rounded-2xl border border-border">
                    <View className="flex-row items-center mr-6">
                      <Navigation size={16} color="#93001B" strokeWidth={2} />
                      <Text className="ml-2 text-sm font-manrope-bold text-primary">
                        {agency.distance}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <Clock size={16} color="#71717A" strokeWidth={2} />
                      <Text className="ml-2 text-sm font-manrope text-muted">
                        Open until {agency.closingTime}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-3">
                    {agency.highlight ? (
                      <View className="flex-1">
                        <PrimaryButton
                          label="Select this agency"
                          onPress={() => selectAndContinue(agency)}
                          className="w-full"
                        />
                      </View>
                    ) : (
                      <View className="flex-1">
                        <SecondaryButton
                          label="Select agency"
                          onPress={() => selectAndContinue(agency)}
                          className="w-full"
                        />
                      </View>
                    )}

                    <TouchableOpacity className="w-14 h-14 bg-elevated border border-border rounded-2xl items-center justify-center active:opacity-70">
                      <MapPin size={22} color="#1A1C1C" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
