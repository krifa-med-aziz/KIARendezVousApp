import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Camera, X, CheckCircle2, ChevronLeft } from "lucide-react-native";
import { Input } from "@/components/ui/Input";
import { scanCarteGrise, createVehicle } from "@/lib/api/vehicleApi";
import type { ScanResult } from "@/types/vehicle";

export default function AddVehicleScreen() {
  const [activeTab, setActiveTab] = useState<"scan" | "manual">("scan");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [aiFields, setAiFields] = useState<Set<string>>(new Set());

  // Form fields
  const [plate, setPlate] = useState("");
  const [cin, setCin] = useState("");
  const [vin, setVin] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [dpmc, setDpmc] = useState("");
  const [mileage, setMileage] = useState("");

  const switchTab = (tab: "scan" | "manual") => {
    setActiveTab(tab);
    if (tab === "manual") {
      resetScanState();
    }
  };

  const resetScanState = () => {
    setImageUri(null);
    setScanResult(null);
    setScanning(false);
  };

  const pickImage = async (source: "camera" | "gallery") => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    };

    let result;
    if (source === "camera") {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Camera access is needed to scan.");
        return;
      }
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Gallery access is needed.");
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      performScan(uri);
    }
  };

  const performScan = async (uri: string) => {
    setScanning(true);
    setScanResult(null);
    try {
      const res = await scanCarteGrise(uri);
      setScanResult(res);

      if (res.success && res.data) {
        const newAiFields = new Set<string>();
        if (res.data.plate) {
          setPlate(res.data.plate);
          newAiFields.add("plate");
        }
        if (res.data.cin) {
          setCin(res.data.cin);
          newAiFields.add("cin");
        }
        if (res.data.vin) {
          setVin(res.data.vin);
          newAiFields.add("vin");
        }
        if (res.data.brand) {
          setBrand(res.data.brand);
          newAiFields.add("brand");
        }
        if (res.data.model) {
          setModel(res.data.model);
          newAiFields.add("model");
        }
        if (res.data.ownerName) {
          setOwnerName(res.data.ownerName);
          newAiFields.add("ownerName");
        }
        if (res.data.address) {
          setAddress(res.data.address);
          newAiFields.add("address");
        }
        if (res.data.dpmc) {
          setDpmc(res.data.dpmc);
          newAiFields.add("dpmc");
        }
        setAiFields(newAiFields);
      }
    } catch (error: any) {
      setScanResult({ success: false, error: error.message });
    } finally {
      setScanning(false);
    }
  };

  const handleConfirm = async () => {
    if (!plate.trim() || !mileage.trim()) {
      Alert.alert("Required fields", "Plate and mileage are required.");
      return;
    }
    try {
      const payload = {
        name: `${brand} ${model}`.trim() || plate,
        plate,
        mileage,
        type: "private",
        vin: vin || undefined,
        brand: brand || undefined,
        model: model || undefined,
        dpmc: dpmc || undefined,
        ownerName: ownerName || undefined,
        cin: cin || undefined,
      };
      await createVehicle(payload);
      router.back();
    } catch (err: any) {
      Alert.alert(
        "Registration Failed",
        err.message || "Could not register vehicle.",
      );
    }
  };

  const AiBadge = ({ fieldKey }: { fieldKey: string }) => {
    if (!aiFields.has(fieldKey)) return null;
    return (
      <View className="bg-green-600 rounded px-1.5 py-0.5 justify-center items-center">
        <Text className="text-white text-xs font-bold">AI</Text>
      </View>
    );
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-row w-full border-b border-border">
          <TouchableOpacity
            className={`flex-1 py-4 justify-center items-center ${activeTab === "scan" ? "border-b-2 border-red-600" : ""}`}
            onPress={() => switchTab("scan")}
          >
            <Text
              className={`font-jakarta-bold ${activeTab === "scan" ? "text-white" : "text-muted"}`}
            >
              AI SCAN — CARTE GRISE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-4 justify-center items-center ${activeTab === "manual" ? "border-b-2 border-red-600" : ""}`}
            onPress={() => switchTab("manual")}
          >
            <Text
              className={`font-jakarta-bold ${activeTab === "manual" ? "text-white" : "text-muted"}`}
            >
              MANUAL ENTRY
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "scan" && (
          <View className="px-6 pt-6">
            {!imageUri ? (
              <View>
                <View className="min-h-[180px] border-2 border-dashed border-border rounded-xl justify-center items-center p-6">
                  <Camera
                    size={48}
                    color="#71717A"
                    strokeWidth={1.5}
                    className="mb-4"
                  />
                  <Text className="font-jakarta-bold text-foreground text-lg mb-1 text-center">
                    Photograph your Carte Grise
                  </Text>
                  <Text className="text-muted font-manrope text-sm text-center">
                    Position the card clearly in frame
                  </Text>
                </View>
                <View className="flex-row gap-4 mt-6">
                  <TouchableOpacity
                    onPress={() => pickImage("camera")}
                    className="flex-1 py-3.5 border border-border rounded-xl justify-center items-center"
                  >
                    <Text className="font-jakarta-bold text-foreground">
                      TAKE PHOTO
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => pickImage("gallery")}
                    className="flex-1 py-3.5 rounded-xl justify-center items-center bg-red-600"
                  >
                    <Text className="font-jakarta-bold text-white">
                      CHOOSE FROM GALLERY
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : scanning ? (
              <View className="p-4 rounded-xl border border-border">
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-row items-center gap-4">
                    <Image
                      source={{ uri: imageUri }}
                      className="w-20 h-20 rounded-lg"
                    />
                    <Text
                      className="font-manrope-bold text-foreground text-sm max-w-[200px]"
                      numberOfLines={1}
                      ellipsizeMode="middle"
                    >
                      carte-grise.jpg
                    </Text>
                  </View>
                  <TouchableOpacity onPress={resetScanState} className="p-1">
                    <X size={20} color="#71717A" />
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-center gap-3 py-4">
                  <ActivityIndicator size="small" color="#93001B" />
                  <Text className="font-manrope text-muted">
                    Scanning carte grise...
                  </Text>
                </View>
              </View>
            ) : scanResult?.success ? (
              <View className="bg-green-50 border border-green-500 rounded-xl p-4">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-row items-center gap-2">
                    <CheckCircle2 size={20} color="#16a34a" />
                    <Text className="font-jakarta-bold text-green-600">
                      SCAN REUSSI
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="font-jakarta-bold text-green-600 text-xs mb-1">
                      MATCH: {scanResult.matchPercent ?? 100}%
                    </Text>
                    <TouchableOpacity onPress={resetScanState}>
                      <Text className="text-primary font-manrope-bold text-xs">
                        Rescanner
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="font-manrope text-green-700 text-sm mt-1">
                  {aiFields.size} champs detectes et remplis automatiquement.
                </Text>
              </View>
            ) : (
              <View className="bg-red-50 border border-red-500 rounded-xl p-4">
                <View className="flex-row justify-between items-center">
                  <Text className="font-manrope-bold text-red-700 flex-1 mr-4">
                    Scan failed — please try again or use manual entry
                  </Text>
                  <TouchableOpacity onPress={resetScanState}>
                    <Text className="text-primary font-manrope-bold text-xs">
                      Rescan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        <View className="px-6 pt-8 pb-6">
          <Input
            label="N° IMMATRICULATION"
            placeholder="Ex: 170 تونس 1867"
            value={plate}
            onChangeText={setPlate}
            rightElement={<AiBadge fieldKey="plate" />}
          />
          <Input
            label="CIN (OU MF)"
            placeholder="Ex: 03989990"
            value={cin}
            onChangeText={setCin}
            rightElement={<AiBadge fieldKey="cin" />}
          />
          <Input
            label="VIN — N° SERIE DU TYPE"
            placeholder="Ex: ZFA1990000P011861"
            value={vin}
            onChangeText={setVin}
            rightElement={<AiBadge fieldKey="vin" />}
          />
          <Input
            label="MARQUE (CONSTRUCTEUR)"
            placeholder="Ex: FIAT"
            value={brand}
            onChangeText={setBrand}
            rightElement={<AiBadge fieldKey="brand" />}
          />
          <Input
            label="MODELE (TYPE COMMERCIAL)"
            placeholder="Ex: PUNTO"
            value={model}
            onChangeText={setModel}
            rightElement={<AiBadge fieldKey="model" />}
          />
          <Input
            label="NOM DU TITULAIRE"
            placeholder="Ex: عواطف بوصلاح"
            value={ownerName}
            onChangeText={setOwnerName}
            rightElement={<AiBadge fieldKey="ownerName" />}
          />
          <Input
            label="ADRESSE"
            placeholder="Ex: 40 نهج الجامع الكبير المهدية"
            value={address}
            onChangeText={setAddress}
            rightElement={<AiBadge fieldKey="address" />}
          />
          <Input
            label="DPMC — DATE"
            placeholder="Ex: 2013/12/13"
            value={dpmc}
            onChangeText={setDpmc}
            rightElement={<AiBadge fieldKey="dpmc" />}
          />
          <Input
            label="KILOMETRAGE"
            placeholder="Ex: 45000"
            value={mileage}
            onChangeText={setMileage}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            onPress={handleConfirm}
            className="w-full bg-red-600 rounded-xl py-4 items-center justify-center mt-4"
          >
            <Text className="font-jakarta-bold text-white uppercase text-sm">
              CONFIRM & REGISTER VEHICLE ›
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
