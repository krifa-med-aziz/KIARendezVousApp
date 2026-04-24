import { routes } from "@/constants/routes";
import { primaryShadowStyle } from "@/constants/shadows";
import { router } from "expo-router";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  FileScan,
  FilePen,
  Info,
  Shield,
} from "lucide-react-native";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
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
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-border">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <ChevronLeft size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-base font-jakarta-bold text-foreground">
          Add New Vehicle
        </Text>
        <TouchableOpacity
          onPress={() => router.push(routes.notifications)}
          activeOpacity={0.7}
        >
          <Bell size={24} color="#93001B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView className="pb-10">
        <View className="relative w-full h-[220px] bg-foreground">
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Add%20Vehicle%20%28Dual%20Input%29-kcRuiht7pIwm5yBcP57AECBgSlhidy.png",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-foreground/45 justify-end px-6 pb-6">
            <Text className="text-xs font-manrope-bold tracking-widest text-white/90 mb-2 uppercase">
              Registration
            </Text>
            <Text className="text-3xl font-jakarta-extrabold text-white">
              Bring your KIA home.
            </Text>
          </View>
        </View>

        <View className="flex-row border-b border-border bg-white">
          <TouchableOpacity
            className={`flex-1 flex-row items-center justify-center py-5 gap-2 border-b-2 ${
              activeTab === "manual" ? "border-primary" : "border-transparent"
            }`}
            onPress={() => setActiveTab("manual")}
          >
            <FilePen size={18} color={activeTab === "manual" ? "#93001B" : "#71717A"} strokeWidth={2} />
            <Text
              className={`text-sm font-manrope-bold ${
                activeTab === "manual" ? "text-primary" : "text-muted"
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
            <FileScan size={18} color={activeTab === "scan" ? "#93001B" : "#71717A"} strokeWidth={2} />
            <Text
              className={`text-sm font-manrope-bold ${
                activeTab === "scan" ? "text-primary" : "text-muted"
              }`}
            >
              Document Scan
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "manual" && (
          <View className="px-6 pt-8">
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-manrope-semibold text-foreground">
                  Vehicle Model
                </Text>
                <Text className="text-[10px] font-manrope-bold tracking-widest text-muted uppercase">
                  Required
                </Text>
              </View>
              <TouchableOpacity
                className="min-h-[56px] bg-white border border-border rounded-2xl px-4 flex-row justify-between items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 2,
                }}
                onPress={() => setShowModelDropdown(!showModelDropdown)}
              >
                <Text className="text-sm font-manrope text-foreground">
                  {selectedModel || "Select KIA Model"}
                </Text>
                <ChevronDown size={20} color="#71717A" strokeWidth={2} />
              </TouchableOpacity>
              {showModelDropdown && (
                <View className="mt-2 bg-white rounded-2xl z-50 border border-border overflow-hidden"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.08,
                    shadowRadius: 16,
                    elevation: 6,
                  }}
                >
                  {kiaModes.map((model) => (
                    <TouchableOpacity
                      key={model}
                      className="px-4 py-4 border-b border-border last:border-0 active:bg-elevated"
                      onPress={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                    >
                      <Text className="text-sm font-manrope-medium text-foreground">
                        {model}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-manrope-semibold text-foreground">
                  Matricule / Plate Number
                </Text>
                <Text className="text-[10px] font-manrope-bold tracking-widest text-muted uppercase">
                  Required
                </Text>
              </View>
              <TextInput
                className="min-h-[56px] bg-white border border-border rounded-2xl px-4 text-sm font-manrope text-foreground"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 2,
                }}
                placeholder="e.g. ABC-1234"
                placeholderTextColor="#71717A"
                value={plateNumber}
                onChangeText={setPlateNumber}
              />
            </View>

            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-sm font-manrope-semibold text-foreground">
                    VIN Number
                  </Text>
                  <Info size={16} color="#71717A" strokeWidth={2} />
                </View>
                <Text className="text-[10px] font-manrope-bold tracking-widest text-muted uppercase">
                  Optional
                </Text>
              </View>
              <TextInput
                className="min-h-[56px] bg-white border border-border rounded-2xl px-4 text-sm font-manrope text-foreground"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 8,
                  elevation: 2,
                }}
                placeholder="17-digit Chassis Number"
                placeholderTextColor="#71717A"
                value={vinNumber}
                onChangeText={setVinNumber}
              />
              <Text className="text-xs font-manrope text-muted mt-2">
                Found on the driver&apos;s side dashboard or vehicle
                registration papers.
              </Text>
            </View>

            <View className="flex-row bg-badge-red rounded-3xl p-5 gap-4 mb-8 border border-border">
              <Shield size={24} color="#93001B" strokeWidth={2} />
              <View className="flex-1 gap-1">
                <Text className="text-sm font-manrope-bold text-primary">
                  Secure Registration
                </Text>
                <Text className="text-sm font-manrope text-muted">
                  Linking your vehicle unlocks personalized maintenance schedules
                  and digital service history.
                </Text>
              </View>
            </View>

            <PrimaryButton
              label="Save vehicle"
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
              className="mb-6"
              style={primaryShadowStyle}
            />
          </View>
        )}

        {activeTab === "scan" && (
          <View className="px-6 pt-8 items-center">
            <Text className="text-sm font-manrope text-muted text-center">
              Document Scan feature coming soon
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
