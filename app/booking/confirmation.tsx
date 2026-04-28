import { routes } from "@/constants/routes";
import { primaryShadowStyle } from "@/constants/shadows";
import { useBooking } from "@/context/BookingContext";
import { DEFAULT_VEHICLE_IMAGE } from "@/data/mockData";
import {
  formatBookingDateLabel,
  weekdayFromIso,
} from "@/lib/bookingFormat";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  MapPin,
  Settings,
} from "lucide-react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { Stepper } from "@/components/Stepper";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingConfirmationScreen() {
  const {
    selectedVehicle,
    selectedService,
    selectedAgency,
    selectedDate,
    selectedTime,
    isBookingComplete,
  } = useBooking();

  const STEPS = ["Vehicle", "Service", "Agency", "Time", "Confirm"];

  useEffect(() => {
    if (!isBookingComplete()) {
      router.replace(routes.booking.selectVehicle);
    }
  }, [isBookingComplete]);

  if (!isBookingComplete()) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={["top"]} />
    );
  }

  const vehicleImageUri =
    selectedVehicle?.image && !selectedVehicle.image.startsWith("../")
      ? selectedVehicle.image
      : DEFAULT_VEHICLE_IMAGE;

  const scheduleLine = `${weekdayFromIso(selectedDate!.id)}, ${selectedTime}`;
  const price = selectedService?.price ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />

      <View className="flex-row items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity
          className="p-1 active:opacity-70 -ml-1"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1A1C1C" strokeWidth={2} />
        </TouchableOpacity>

        <Text className="flex-1 text-center mr-6 text-sm font-jakarta-bold tracking-widest text-foreground uppercase">
          Booking Summary
        </Text>
      </View>

      <Stepper steps={STEPS} currentStep={4} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="mx-6 mt-6 mb-6 h-[220px] rounded-3xl overflow-hidden bg-foreground">
          <Image
            source={{ uri: vehicleImageUri }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />

          <View className="flex-1 justify-end p-6 bg-foreground/40">
            <View className="bg-primary self-start px-3 py-1.5 rounded-full mb-2">
              <Text className="text-[10px] font-manrope-bold text-white tracking-widest uppercase">
                Your selected vehicle
              </Text>
            </View>
            <Text className="text-3xl font-jakarta-extrabold text-white">
              {selectedVehicle!.name}
            </Text>
          </View>
        </View>

        <View
          className="mx-6 bg-white rounded-3xl border border-border overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 5,
          }}
        >
          <View className="p-6 border-b border-dashed border-border">
            <View className="flex-row items-center mb-4">
              <Settings size={20} color="#93001B" strokeWidth={2} />
              <Text className="ml-auto text-xs text-label font-manrope-bold tracking-widest uppercase">
                Service type
              </Text>
            </View>

            <Text className="text-xl font-jakarta-bold text-foreground mb-1.5">
              {selectedService!.title}
            </Text>
            <Text className="text-sm font-manrope text-muted leading-5">
              {selectedService!.description}
            </Text>
          </View>

          <View className="p-6 border-b border-dashed border-border bg-elevated/80">
            <View className="flex-row items-center mb-4">
              <MapPin size={20} color="#93001B" strokeWidth={2} />
              <Text className="ml-auto text-xs text-label font-manrope-bold tracking-widest uppercase">
                Location
              </Text>
            </View>

            <Text className="text-xl font-jakarta-bold text-foreground mb-1.5">
              {selectedAgency!.name}
            </Text>
            <Text className="text-sm font-manrope text-muted leading-5">
              {selectedAgency!.address}
            </Text>
          </View>

          <View className="p-6 border-b border-border">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-xs font-manrope-bold text-primary tracking-widest uppercase">
                Schedule
              </Text>
              <Calendar size={18} color="#93001B" strokeWidth={2} />
            </View>

            <View className="flex-row items-center">
              <View className="w-[80px] items-center pr-5 border-r border-border">
                <Text className="text-4xl font-jakarta-extrabold text-primary">
                  {selectedDate!.date}
                </Text>
                <Text className="text-xs font-manrope-bold text-muted uppercase tracking-widest mt-1">
                  {selectedDate!.monthLabel.slice(0, 3)}
                </Text>
              </View>

              <View className="flex-1 pl-5">
                <Text className="text-lg font-jakarta-bold text-foreground mb-1.5">
                  {scheduleLine}
                </Text>
                <Text className="text-sm font-manrope text-muted leading-5">
                  {formatBookingDateLabel(selectedDate!)} · Estimated from
                  selected package
                </Text>
              </View>
            </View>
          </View>

          <View className="p-6 bg-elevated flex-row justify-between items-center">
            <View>
              <Text className="text-xs text-label font-manrope-bold tracking-widest uppercase">
                Estimated cost
              </Text>
              <Text className="text-sm font-manrope text-muted mt-1.5">
                Labor & standard parts (estimate)
              </Text>
            </View>

            <Text className="text-3xl font-jakarta-extrabold text-foreground">
              ${price.toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="mx-6 mt-6 mb-8 flex-row items-start bg-badge-red rounded-3xl p-5 border border-border">
          <View className="mr-4 mt-0.5">
            <CheckCircle2 size={20} color="#93001B" strokeWidth={2} />
          </View>

          <Text className="flex-1 text-sm font-manrope text-foreground leading-relaxed">
            By confirming, you agree to our{" "}
            <Text className="text-primary font-manrope-bold">Service Terms</Text>
            .{"\n\n"}
            <Text className="text-muted">
              You can reschedule or cancel free of charge up to 24 hours before
              the appointment.
            </Text>
          </Text>
        </View>

        <View className="px-6 pb-6">
          <PrimaryButton
            label="Confirm booking"
            onPress={() => router.push(routes.booking.success)}
            className="mb-4"
            style={primaryShadowStyle}
          />

          <TouchableOpacity
            onPress={() => router.replace(routes.main)}
            className="items-center py-4 active:opacity-70"
          >
            <Text className="text-muted text-xs font-manrope-bold tracking-widest uppercase">
              Cancel & return to home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
