import { routes } from "@/constants/routes";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
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
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Feather name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <View className="flex-1 ml-3 items-center">
          <Text className="text-lg font-semibold text-[#1a1a1a]">
            Select Agency
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          className="p-1"
        >
          <Feather name="bell" size={22} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <Stepper steps={STEPS} currentStep={2} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map */}
        <View className="h-[320px] bg-gray-200 relative">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Booking_%20Select%20Agency%20%28Improved%29-m6igd2nYyViot3cCUImMbSvj4IRZ5N.png",
            }}
            className="absolute w-full h-full -top-12"
          />

          <View className="flex-1 bg-gray-300/30">
            {/* Tooltip */}
            <View className="absolute top-[100px] left-[100px] bg-white px-3 py-2 rounded shadow">
              <Text className="text-xs text-[#1a1a1a] font-medium">
                KIA Central Agency
              </Text>
            </View>

            {/* Location */}
            <TouchableOpacity className="absolute right-4 top-40 w-11 h-11 bg-white rounded-full items-center justify-center shadow">
              <MaterialIcons name="my-location" size={22} color="#666" />
            </TouchableOpacity>

            {/* Zoom */}
            <View className="absolute right-4 top-[212px] bg-white rounded shadow overflow-hidden">
              <TouchableOpacity className="w-11 h-10 items-center justify-center">
                <Feather name="plus" size={20} color="#666" />
              </TouchableOpacity>
              <View className="h-[1px] bg-gray-200" />
              <TouchableOpacity className="w-11 h-10 items-center justify-center">
                <Feather name="minus" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Toggle */}
            <View className="absolute bottom-4 left-4 flex-row bg-white rounded-full p-1 shadow">
              <TouchableOpacity className="flex-row items-center bg-[#c41e3a] px-5 py-2 rounded-full">
                <FontAwesome name="map" size={14} color="#fff" />
                <Text className="text-white ml-2 text-sm">Map</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center px-5 py-2">
                <Feather name="list" size={16} color="#666" />
                <Text className="text-gray-500 ml-2 text-sm">List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Agencies */}
        <View className="p-4">
          {/* Header */}
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-xl font-semibold text-[#1a1a1a]">
                Nearby Agencies
              </Text>
              <Text className="text-sm text-gray-400 mt-1">
                Found {AGENCIES.length} KIA service centers nearby
              </Text>
            </View>

            <TouchableOpacity className="p-1">
              <Feather name="sliders" size={20} color="#1a1a1a" />
            </TouchableOpacity>
          </View>

          {/* CARD (Reusable but you didn’t make it reusable…) */}
          {AGENCIES.map((agency) => (
            <View
              key={agency.id}
              className="bg-white rounded-2xl mb-4 shadow-sm"
            >
              <View className="p-4">
                {/* Badge */}
                {agency.highlight && (
                  <View className="flex-row mb-2">
                    <View className="bg-[#c41e3a] px-2 py-1 rounded-full mr-2">
                      <Text className="text-white text-[10px] font-semibold">
                        TOP RATED
                      </Text>
                    </View>
                    <View className="border border-[#c41e3a] px-2 py-1 rounded-full">
                      <Text className="text-[#c41e3a] text-[10px] font-semibold">
                        CLOSEST
                      </Text>
                    </View>
                  </View>
                )}

                {/* Info */}
                <View className="flex-row justify-between">
                  <View className="flex-1 pr-3">
                    {agency.highlight && (
                      <View className="flex-row items-center mb-1">
                        <FontAwesome name="star" size={14} color="#f5a623" />
                        <Text className="ml-1 text-sm">{agency.rating}</Text>
                      </View>
                    )}

                    <Text className="text-base font-semibold text-[#1a1a1a] mb-1">
                      {agency.name}
                    </Text>

                    <Text className="text-sm text-gray-400">
                      {agency.address}
                    </Text>
                  </View>

                  <Image
                    source={{
                      uri: agency.image,
                    }}
                    className="w-[72px] h-[72px] rounded-xl"
                  />
                </View>

                {/* Distance */}
                <View className="flex-row mt-3 mb-4">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="navigate" size={14} color="#c41e3a" />
                    <Text className="ml-1 text-sm text-[#c41e3a]">
                      {agency.distance}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Feather name="clock" size={14} color="#666" />
                    <Text className="ml-1 text-sm text-gray-500">
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
                    className={`flex-1 py-3 rounded-full items-center mr-3 ${
                      agency.highlight ? "bg-[#c41e3a]" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`${
                        agency.highlight ? "text-white" : "text-[#1a1a1a]"
                      } font-semibold`}
                    >
                      {agency.highlight
                        ? "SELECT THIS AGENCY"
                        : "Select Agency"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                    <MaterialIcons name="near-me" size={20} color="#666" />
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
