import { routes } from "@/constants/routes";
import { router } from "expo-router";
import { Bell, ChevronLeft, Info, Shield } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddVehicleScreen() {
  const [activeTab, setActiveTab] = useState("manual");
  const [selectedModel, setSelectedModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const kiaModes = ["Sportage", "Sorento", "EV6", "Picanto", "Rio", "Cerato"];

  return (
    <SafeAreaView className="flex-1 bg-[#fafafa]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-[#f0f0f0]">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#c41e3a" />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold text-[#1a1a1a]">
          Add New Vehicle
        </Text>
        <TouchableOpacity onPress={() => router.push(routes.notifications)}>
          <Bell size={24} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <ScrollView className="pb-10">
        {/* Hero Section */}
        <View className="relative w-full h-[200px] bg-[#1a1a1a]">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Add%20Vehicle%20%28Dual%20Input%29-kcRuiht7pIwm5yBcP57AECBgSlhidy.png",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/30 justify-end px-5 pb-5">
            <Text className="text-[11px] font-bold tracking-[1.5px] text-white/70 mb-2">
              REGISTRATION
            </Text>
            <Text className="text-[28px] font-bold text-white">
              Bring your KIA home.
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-[#e0e0e0] bg-white">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-4 gap-2 border-b-2 ${
              activeTab === "manual" ? "border-[#c41e3a]" : "border-transparent"
            }`}
            onPress={() => setActiveTab("manual")}
          >
            <Text className="text-[16px]">⋯</Text>
            <Text
              className={`text-[14px] ${
                activeTab === "manual"
                  ? "text-[#c41e3a] font-semibold"
                  : "text-[#999] font-medium"
              }`}
            >
              Manual Entry
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-4 gap-2 border-b-2 ${
              activeTab === "scan" ? "border-[#c41e3a]" : "border-transparent"
            }`}
            onPress={() => setActiveTab("scan")}
          >
            <Text className="text-[16px]">📄</Text>
            <Text
              className={`text-[14px] ${
                activeTab === "scan"
                  ? "text-[#c41e3a] font-semibold"
                  : "text-[#999] font-medium"
              }`}
            >
              Document Scan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === "manual" && (
          <View className="px-5 pt-6">
            {/* Vehicle Model Field */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[14px] font-semibold text-[#1a1a1a]">
                  Vehicle Model
                </Text>
                <Text className="text-[10px] font-bold tracking-[0.5px] text-[#999]">
                  REQUIRED
                </Text>
              </View>
              <TouchableOpacity
                className="bg-[#f0f0f0] rounded-lg px-4 py-3 flex-row justify-between items-center"
                onPress={() => setShowModelDropdown(!showModelDropdown)}
              >
                <Text className="text-[14px] text-[#666]">
                  {selectedModel || "Select KIA Model"}
                </Text>
                <Text className="text-[16px] text-[#999]">∨</Text>
              </TouchableOpacity>
              {showModelDropdown && (
                <View className="absolute top-[100%] left-0 right-0 bg-white rounded-lg mt-1 z-50 border border-[#e0e0e0]">
                  {kiaModes.map((model) => (
                    <TouchableOpacity
                      key={model}
                      className="px-4 py-3 border-b border-[#f0f0f0]"
                      onPress={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                    >
                      <Text className="text-[14px] text-[#1a1a1a]">
                        {model}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Matricule / Plate Number Field */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[14px] font-semibold text-[#1a1a1a]">
                  Matricule / Plate Number
                </Text>
                <Text className="text-[10px] font-bold tracking-[0.5px] text-[#999]">
                  REQUIRED
                </Text>
              </View>
              <TextInput
                className="bg-[#f0f0f0] rounded-lg px-4 py-3 text-[14px] text-[#1a1a1a]"
                placeholder="e.g. ABC-1234"
                placeholderTextColor="#b0b0b0"
                value={plateNumber}
                onChangeText={setPlateNumber}
              />
            </View>

            {/* VIN Number Field */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-[14px] font-semibold text-[#1a1a1a]">
                    VIN Number
                  </Text>
                  <Info size={16} color="#999" />
                </View>
                <Text className="text-[10px] font-bold tracking-[0.5px] text-[#999]">
                  OPTIONAL
                </Text>
              </View>
              <TextInput
                className="bg-[#f0f0f0] rounded-lg px-4 py-3 text-[14px] text-[#1a1a1a]"
                placeholder="17-digit Chassis Number"
                placeholderTextColor="#b0b0b0"
                value={vinNumber}
                onChangeText={setVinNumber}
              />
              <Text className="text-[12px] text-[#999] mt-2 leading-4">
                Found on the driver&apos;s side dashboard or vehicle
                registration papers.
              </Text>
            </View>

            {/* Secure Registration Info Box */}
            <View className="flex-row bg-[#ffe4e8] rounded-xl p-4 gap-3 mb-6">
              <Shield size={20} color="#c41e3a" />
              <View className="flex-1 gap-1">
                <Text className="text-[14px] font-bold text-[#c41e3a]">
                  Secure Registration
                </Text>
                <Text className="text-[13px] font-normal text-[#c41e3a] leading-[18px]">
                  Linking your vehicle unlocks personalized maintenance
                  schedules and digital service history.
                </Text>
              </View>
            </View>

            {/* Save Vehicle Button */}
            <TouchableOpacity
              className="bg-[#c41e3a] rounded-[28px] py-4 items-center -mx-5 -mb-6 mt-6"
              onPress={() => {
                if (!selectedModel || !plateNumber.trim()) {
                  Alert.alert(
                    "Missing info",
                    "Select a model and enter a plate number.",
                  );
                  return;
                }
                Alert.alert(
                  "Vehicle saved",
                  `${selectedModel} (${plateNumber}) — demo only.`,
                  [{ text: "OK", onPress: () => router.back() }],
                );
              }}
            >
              <Text className="text-[16px] font-bold text-white">
                Save Vehicle →
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "scan" && (
          <View className="px-5 pt-6">
            <Text className="text-[14px] text-[#999] text-center py-10">
              Document Scan feature coming soon
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
