import { routes } from "@/constants/routes";
import { router } from "expo-router";
import { Bell, ChevronLeft, Info, Shield } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddVehicleScreen() {
  const [activeTab, setActiveTab] = useState("manual");
  const [selectedModel, setSelectedModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const kiaModes = ["Sportage", "Sorento", "EV6", "Picanto", "Rio", "Cerato"];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-surface border-b border-border">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#E60012" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-primary">
          Add New Vehicle
        </Text>
        <TouchableOpacity onPress={() => router.push(routes.notifications)}>
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView className="pb-10">
        {/* Hero Section */}
        <View className="relative w-full h-[220px] bg-text-primary">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Add%20Vehicle%20%28Dual%20Input%29-kcRuiht7pIwm5yBcP57AECBgSlhidy.png",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/40 justify-end px-6 pb-6">
            <Text className="text-xs font-bold tracking-widest text-white/80 mb-2 uppercase">
              Registration
            </Text>
            <Text className="text-3xl font-extrabold text-white">
              Bring your KIA home.
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-border bg-surface">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-5 gap-2 border-b-2 ${
              activeTab === "manual" ? "border-primary" : "border-transparent"
            }`}
            onPress={() => setActiveTab("manual")}
          >
            <Text className="text-lg text-text-secondary">⋯</Text>
            <Text
              className={`text-sm ${
                activeTab === "manual"
                  ? "text-primary font-bold"
                  : "text-text-secondary font-medium"
              }`}
            >
              Manual Entry
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-5 gap-2 border-b-2 ${
              activeTab === "scan" ? "border-primary" : "border-transparent"
            }`}
            onPress={() => setActiveTab("scan")}
          >
            <Text className="text-lg text-text-secondary">📄</Text>
            <Text
              className={`text-sm ${
                activeTab === "scan"
                  ? "text-primary font-bold"
                  : "text-text-secondary font-medium"
              }`}
            >
              Document Scan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === "manual" && (
          <View className="px-6 pt-8">
            {/* Vehicle Model Field */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-semibold text-text-primary">
                  Vehicle Model
                </Text>
                <Text className="text-[10px] font-bold tracking-widest text-text-muted uppercase">
                  REQUIRED
                </Text>
              </View>
              <TouchableOpacity
                className="h-14 bg-background border border-border rounded-xl px-4 flex-row justify-between items-center"
                onPress={() => setShowModelDropdown(!showModelDropdown)}
              >
                <Text className="text-sm text-text-primary">
                  {selectedModel || "Select KIA Model"}
                </Text>
                <Text className="text-lg text-text-muted">∨</Text>
              </TouchableOpacity>
              {showModelDropdown && (
                <View className="absolute top-20 left-0 right-0 bg-surface rounded-xl z-50 border border-border shadow-card overflow-hidden">
                  {kiaModes.map((model) => (
                    <TouchableOpacity
                      key={model}
                      className="px-4 py-4 border-b border-border last:border-0 active:bg-background"
                      onPress={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                    >
                      <Text className="text-sm font-medium text-text-primary">
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
                <Text className="text-sm font-semibold text-text-primary">
                  Matricule / Plate Number
                </Text>
                <Text className="text-[10px] font-bold tracking-widest text-text-muted uppercase">
                  REQUIRED
                </Text>
              </View>
              <TextInput
                className="h-14 bg-background border border-border rounded-xl px-4 text-sm text-text-primary focus:border-primary"
                placeholder="e.g. ABC-1234"
                placeholderTextColor="#9CA3AF"
                value={plateNumber}
                onChangeText={setPlateNumber}
              />
            </View>

            {/* VIN Number Field */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-sm font-semibold text-text-primary">
                    VIN Number
                  </Text>
                  <Info size={16} color="#6B7280" />
                </View>
                <Text className="text-[10px] font-bold tracking-widest text-text-muted uppercase">
                  OPTIONAL
                </Text>
              </View>
              <TextInput
                className="h-14 bg-background border border-border rounded-xl px-4 text-sm text-text-primary focus:border-primary"
                placeholder="17-digit Chassis Number"
                placeholderTextColor="#9CA3AF"
                value={vinNumber}
                onChangeText={setVinNumber}
              />
              <Text className="text-xs text-text-secondary mt-2">
                Found on the driver&apos;s side dashboard or vehicle
                registration papers.
              </Text>
            </View>

            {/* Secure Registration Info Box */}
            <View className="flex-row bg-primary-soft rounded-xl p-5 gap-4 mb-8">
              <Shield size={24} color="#E60012" />
              <View className="flex-1 gap-1">
                <Text className="text-sm font-bold text-primary">
                  Secure Registration
                </Text>
                <Text className="text-sm text-primary/80">
                  Linking your vehicle unlocks personalized maintenance
                  schedules and digital service history.
                </Text>
              </View>
            </View>

            {/* Save Vehicle Button */}
            <TouchableOpacity
              className="bg-primary rounded-xl h-14 items-center justify-center mb-6 active:opacity-80"
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
              <Text className="text-lg font-bold text-white">Save Vehicle</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "scan" && (
          <View className="px-6 pt-8 items-center">
            <Text className="text-sm text-text-secondary text-center">
              Document Scan feature coming soon
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
