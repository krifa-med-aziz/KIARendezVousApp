import { Input } from "@/components/ui/Input";
import { cardShadowStyle, primaryShadowStyle } from "@/constants/shadows";
import { useToast } from "@/context/ToastContext";
import { scanCarteGrise, createVehicle } from "@/lib/api/vehicleApi";
import {
  buildSubmitName,
  flattenZodErrors,
  manualAddVehicleSchema,
  baseScanConfirmVehicleSchema,
  scanConfirmVehicleSchema,
  type ManualAddVehicleInput,
  type ScanConfirmVehicleInput,
  vehicleTypeEnum,
} from "@/lib/validation/addVehicleSchema";
import type { ScannedFields, ScanResult } from "@/types/vehicle";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  FileText,
  Keyboard,
  Lightbulb,
  ScanLine,
  X,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { z } from "zod";

const SCREEN_BG = "#F8F9FA";
const KIA_RED = "#BB162B";

type FlowStep =
  | "entry"
  | "manual"
  | "ocr-intro"
  | "ocr-capture"
  | "ocr-preview";

type VehicleType = z.infer<typeof vehicleTypeEnum>;

const emptyScanForm = (): ScanConfirmVehicleInput => ({
  name: "",
  brand: "",
  model: "",
  plate: "",
  mileage: "",
  type: "private",
  vin: "",
  cin: "",
  ownerName: "",
  address: "",
  dpmc: "",
});

const TYPE_OPTIONS: { value: VehicleType; label: string }[] = [
  { value: "private", label: "Private" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
];

function applyScanDataToForm(
  data: ScannedFields,
  prev: ScanConfirmVehicleInput,
): ScanConfirmVehicleInput {
  return {
    ...prev,
    plate: data.plate ?? prev.plate,
    cin: data.cin ?? prev.cin,
    vin: data.vin ?? prev.vin,
    brand: data.brand ?? prev.brand,
    model: data.model ?? prev.model,
    ownerName: data.ownerName ?? prev.ownerName,
    address: data.address ?? prev.address,
    dpmc: data.dpmc ?? prev.dpmc,
    name:
      [data.brand, data.model].filter(Boolean).join(" ").trim() || prev.name,
  };
}

export default function AddVehicleScreen() {
  const { showToast } = useToast();
  const [step, setStep] = useState<FlowStep>("entry");
  const [form, setForm] = useState<ScanConfirmVehicleInput>(emptyScanForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [ocrBanner, setOcrBanner] = useState(false);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [aiFields, setAiFields] = useState<Set<string>>(new Set());

  const clearFieldError = useCallback((key: string) => {
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }, []);

  const updateForm = useCallback(
    (patch: Partial<ScanConfirmVehicleInput>) => {
      setForm((f) => ({ ...f, ...patch }));
      Object.keys(patch).forEach((k) => clearFieldError(k));
    },
    [clearFieldError],
  );

  const applyFallbackFromScan = useCallback((data?: ScannedFields) => {
    if (!data) return;
    setForm((prev) => applyScanDataToForm(data, prev));
  }, []);

  const resetOcrVisual = useCallback(() => {
    setImageUri(null);
    setScanResult(null);
    setScanning(false);
    setAiFields(new Set());
  }, []);

  const goEntry = useCallback(() => {
    setStep("entry");
    setForm(emptyScanForm());
    setErrors({});
    setTouched({});
    setOcrBanner(false);
    resetOcrVisual();
  }, [resetOcrVisual]);

  const validateManualField = useCallback(
    (field: keyof ManualAddVehicleInput, value: unknown) => {
      const shape = manualAddVehicleSchema.shape[field];
      if (!shape) return;
      const r = shape.safeParse(value);
      if (!r.success) {
        const msg = r.error.issues[0]?.message ?? "Invalid value";
        setErrors((e) => ({ ...e, [field]: msg }));
      } else {
        setErrors((e) => {
          const n = { ...e };
          delete n[field as string];
          return n;
        });
      }
    },
    [],
  );

  const validateScanField = useCallback(
    (field: keyof ScanConfirmVehicleInput) => {
      const shape = baseScanConfirmVehicleSchema.shape[field];
      if (!shape) return;
      const r = shape.safeParse(form[field]);
      if (!r.success) {
        const msg = r.error.issues[0]?.message ?? "Invalid value";
        setErrors((e) => ({ ...e, [field]: msg }));
      } else {
        setErrors((e) => {
          const n = { ...e };
          delete n[field];
          return n;
        });
      }
    },
    [form],
  );

  const onBlurManual = useCallback(
    (field: keyof ManualAddVehicleInput) => {
      setTouched((t) => ({ ...t, [field]: true }));
      validateManualField(field, form[field]);
    },
    [form, validateManualField],
  );

  const onBlurScanField = useCallback(
    (field: keyof ScanConfirmVehicleInput) => {
      setTouched((t) => ({ ...t, [field]: true }));
      validateScanField(field);
    },
    [validateScanField],
  );

  const submitManual = useCallback(async () => {
    console.log("=== SUBMIT MANUAL ===");
    console.log("1. Form state before submit:", JSON.stringify(form, null, 2));

    try {
      const payload: ManualAddVehicleInput = {
        name: (form.name || "").trim(),
        plate: (form.plate || "").trim(),
        mileage: (form.mileage || "").trim(),
        type: form.type,
        vin: (form.vin || "").trim() || undefined,
      };
      const parsed = manualAddVehicleSchema.safeParse(payload);
      console.log("2. Validation success:", parsed.success);

      if (!parsed.success) {
        console.log(
          "-> Validation failed with issues:",
          JSON.stringify(parsed.error.issues, null, 2),
        );
        setErrors(flattenZodErrors(parsed.error));
        setTouched({
          name: true,
          plate: true,
          mileage: true,
          type: true,
          vin: true,
        });
        showToast({
          type: "error",
          message: "Please fix the highlighted fields.",
        });
        return;
      }

      console.log("-> Validation passed!");
      console.log("3. API Payload:", JSON.stringify(parsed.data, null, 2));
      setSubmitting(true);

      const response = await createVehicle({
        name: parsed.data.name,
        plate: parsed.data.plate,
        mileage: parsed.data.mileage,
        type: parsed.data.type,
        vin: parsed.data.vin,
      });
      console.log(
        "4. API Success Response:",
        JSON.stringify(response, null, 2),
      );

      showToast({ type: "success", message: "Vehicle manually added!" });
      router.back();
    } catch (err) {
      console.error("-> CRASH OR API ERROR in submitManual:", err);
      showToast({
        type: "error",
        message:
          err instanceof Error ? err.message : "Could not register vehicle.",
      });
    } finally {
      setSubmitting(false);
      console.log("=== SUBMIT MANUAL END ===");
    }
  }, [form, showToast]);

  const submitScanPreview = useCallback(async () => {
    console.log("=== SUBMIT SCAN PREVIEW ===");
    console.log("1. Form state before submit:", JSON.stringify(form, null, 2));

    try {
      const parsed = scanConfirmVehicleSchema.safeParse(form);
      console.log("2. Zod validation result success:", parsed.success);

      if (!parsed.success) {
        console.log(
          "-> Validation failed with issues:",
          JSON.stringify(parsed.error.issues, null, 2),
        );
        setErrors(flattenZodErrors(parsed.error));
        const keys = new Set(
          parsed.error.issues.map((i) =>
            typeof i.path[0] === "string" ? i.path[0] : "",
          ),
        );
        const touch: Record<string, boolean> = {};
        keys.forEach((k) => {
          if (k) touch[k] = true;
        });
        setTouched((t) => ({ ...t, ...touch }));
        showToast({
          type: "error",
          message: "Please fix the highlighted fields.",
        });
        return;
      }

      console.log("-> Validation passed!");
      const v = parsed.data;
      const name = buildSubmitName(v);
      const payload = {
        name,
        plate: (v.plate || "").trim(),
        mileage: (v.mileage || "").trim(),
        type: v.type,
        vin: (v.vin || "").trim() || undefined,
        brand: (v.brand || "").trim() || undefined,
        model: (v.model || "").trim() || undefined,
        dpmc: (v.dpmc || "").trim() || undefined,
        ownerName: (v.ownerName || "").trim() || undefined,
        cin: (v.cin || "").trim() || undefined,
      };

      console.log("3. API Payload:", JSON.stringify(payload, null, 2));
      setSubmitting(true);

      const response = await createVehicle(payload);
      console.log(
        "4. API Success Response:",
        JSON.stringify(response, null, 2),
      );

      showToast({ type: "success", message: "Vehicle added successfully!" });
      router.back();
    } catch (err) {
      console.error("-> CRASH OR API ERROR in submitScanPreview:", err);
      showToast({
        type: "error",
        message:
          err instanceof Error ? err.message : "Could not register vehicle.",
      });
    } finally {
      setSubmitting(false);
      console.log("=== SUBMIT FLOW END ===");
    }
  }, [form, showToast]);

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
        showToast({
          type: "error",
          message: "Camera access is needed to scan your registration.",
        });
        return;
      }
      result = await ImagePicker.launchCameraAsync(options);
    } else {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        showToast({
          type: "error",
          message: "Gallery access is needed to pick a photo.",
        });
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync(options);
    }

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await performScan(uri);
    }
  };

  const performScan = async (uri: string) => {
    setScanning(true);
    setScanResult(null);
    setErrors({});
    try {
      const res = await scanCarteGrise(uri);
      setScanResult(res);
      if (res.success && res.data) {
        setForm((prev) => applyScanDataToForm(res.data!, prev));
        const detected = new Set<string>();
        const d = res.data;
        if (d.plate) detected.add("plate");
        if (d.cin) detected.add("cin");
        if (d.vin) detected.add("vin");
        if (d.brand) detected.add("brand");
        if (d.model) detected.add("model");
        if (d.ownerName) detected.add("ownerName");
        if (d.address) detected.add("address");
        if (d.dpmc) detected.add("dpmc");
        if (d.brand || d.model) detected.add("name");
        setAiFields(detected);
        setStep("ocr-preview");
        setOcrBanner(false);
      } else {
        if (res.data) applyFallbackFromScan(res.data);
        setOcrBanner(true);
        setStep("manual");
        showToast({
          type: "info",
          message: "Scan incomplete — please finish in manual entry.",
        });
      }
    } catch (e) {
      setScanResult({
        success: false,
        error: e instanceof Error ? e.message : "Scan failed",
      });
      setOcrBanner(true);
      setStep("manual");
      showToast({
        type: "info",
        message: "Scan failed. Continue with manual entry.",
      });
    } finally {
      setScanning(false);
    }
  };

  const AiBadge = useCallback(
    ({ fieldKey }: { fieldKey: string }) => {
      if (!aiFields.has(fieldKey)) return null;
      return (
        <View className="bg-emerald-600 rounded-md px-1.5 py-0.5">
          <Text className="text-white text-[10px] font-manrope-bold">AI</Text>
        </View>
      );
    },
    [aiFields],
  );

  const header = useMemo(
    () => (
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-border">
        <TouchableOpacity
          onPress={() => {
            if (step === "entry") router.back();
            else if (step === "manual" && !ocrBanner) goEntry();
            else if (step === "manual" && ocrBanner) {
              setOcrBanner(false);
              setStep("ocr-intro");
              resetOcrVisual();
            } else if (step === "ocr-intro") goEntry();
            else if (step === "ocr-capture") {
              resetOcrVisual();
              setStep("ocr-intro");
            } else if (step === "ocr-preview") {
              setStep("ocr-capture");
            }
          }}
          className="p-2 -ml-1 active:opacity-70"
          hitSlop={12}
        >
          <ArrowLeft size={22} color={KIA_RED} strokeWidth={2} />
        </TouchableOpacity>
        <Text className="flex-1 text-center mr-8 text-sm font-jakarta-bold text-foreground tracking-widest uppercase">
          {step === "entry"
            ? "Add vehicle"
            : step === "manual"
              ? "Manual entry"
              : step === "ocr-intro"
                ? "Scan document"
                : step === "ocr-capture"
                  ? "Capture"
                  : "Review & save"}
        </Text>
      </View>
    ),
    [goEntry, ocrBanner, resetOcrVisual, step],
  );

  const typeChips = (
    <View className="mb-5">
      <Text className="text-xs font-manrope-bold text-muted mb-2 tracking-widest uppercase">
        Vehicle type
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {TYPE_OPTIONS.map((opt) => {
          const selected = form.type === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => updateForm({ type: opt.value })}
              className={`px-4 py-2.5 rounded-full border ${
                selected
                  ? "border-primary bg-badge-red"
                  : "border-border bg-white"
              }`}
              style={selected ? cardShadowStyle : undefined}
            >
              <Text
                className={`text-xs font-manrope-bold tracking-wide ${
                  selected ? "text-primary" : "text-muted"
                }`}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {errors.type ? (
        <Text className="text-xs font-manrope-semibold text-primary mt-1.5">
          {errors.type}
        </Text>
      ) : null}
    </View>
  );

  const kiaCta = (label: string, onPress: () => void, disabled?: boolean) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="rounded-full py-4 items-center justify-center mt-2 active:opacity-90"
      style={[
        primaryShadowStyle,
        { backgroundColor: KIA_RED, opacity: disabled ? 0.55 : 1 },
      ]}
    >
      <Text className="font-manrope-bold text-white text-base">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1"
      style={{ backgroundColor: SCREEN_BG }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={SCREEN_BG} />
      {header}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {step === "entry" && (
          <View className="px-6 pt-8">
            <Text className="text-2xl font-jakarta-extrabold text-foreground mb-2">
              How would you like to add your vehicle?
            </Text>
            <Text className="text-sm font-manrope text-muted leading-relaxed mb-8">
              Scan your registration document for faster setup, or enter details
              manually.
            </Text>

            <Pressable
              onPress={() => {
                resetOcrVisual();
                setForm(emptyScanForm());
                setErrors({});
                setTouched({});
                setStep("ocr-intro");
              }}
              className="mb-5 rounded-3xl bg-white border border-border p-6 active:opacity-95"
              style={cardShadowStyle}
            >
              <View className="w-12 h-12 rounded-2xl bg-badge-red items-center justify-center mb-4">
                <ScanLine size={26} color={KIA_RED} strokeWidth={2} />
              </View>
              <Text className="text-lg font-jakarta-bold text-foreground mb-1">
                Scan vehicle
              </Text>
              <Text className="text-sm font-manrope text-muted leading-relaxed">
                Use your camera to read data from your carte grise
                (registration).
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setForm(emptyScanForm());
                setErrors({});
                setTouched({});
                setOcrBanner(false);
                setStep("manual");
              }}
              className="rounded-3xl bg-white border border-border p-6 active:opacity-95"
              style={cardShadowStyle}
            >
              <View className="w-12 h-12 rounded-2xl bg-elevated border border-border items-center justify-center mb-4">
                <Keyboard size={26} color="#1A1C1C" strokeWidth={2} />
              </View>
              <Text className="text-lg font-jakarta-bold text-foreground mb-1">
                Add manually
              </Text>
              <Text className="text-sm font-manrope text-muted leading-relaxed">
                Enter vehicle name, plate, mileage, and type yourself.
              </Text>
            </Pressable>
          </View>
        )}

        {step === "ocr-intro" && (
          <View className="px-6 pt-8">
            <Text className="text-xl font-jakarta-bold text-foreground mb-4">
              Before you scan
            </Text>
            <View
              className="bg-white rounded-3xl border border-border p-5 mb-6"
              style={cardShadowStyle}
            >
              {[
                {
                  Icon: Lightbulb,
                  text: "Use bright, even lighting — avoid glare on the plastic sleeve.",
                },
                {
                  Icon: Camera,
                  text: "Frame the entire document; all corners should be visible.",
                },
                {
                  Icon: FileText,
                  text: "Hold steady; blurry photos reduce recognition accuracy.",
                },
              ].map(({ Icon, text }, i) => (
                <View key={i} className="flex-row gap-3 mb-4 last:mb-0">
                  <View className="w-10 h-10 rounded-xl bg-elevated items-center justify-center border border-border">
                    <Icon size={20} color={KIA_RED} strokeWidth={2} />
                  </View>
                  <Text className="flex-1 text-sm font-manrope text-foreground leading-relaxed">
                    {text}
                  </Text>
                </View>
              ))}
            </View>
            {kiaCta("Continue to scan", () => setStep("ocr-capture"))}
          </View>
        )}

        {step === "ocr-capture" && (
          <View className="px-6 pt-8">
            {!imageUri ? (
              <>
                <View
                  className="min-h-[200px] border-2 border-dashed border-border rounded-3xl justify-center items-center p-6 bg-white mb-6"
                  style={cardShadowStyle}
                >
                  <Camera size={44} color="#71717A" strokeWidth={1.5} />
                  <Text className="font-jakarta-bold text-foreground text-lg mt-4 mb-1 text-center">
                    Photograph your registration
                  </Text>
                  <Text className="text-muted font-manrope text-sm text-center">
                    Carte grise — position the card clearly in frame
                  </Text>
                </View>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => pickImage("camera")}
                    className="flex-1 py-3.5 rounded-2xl border border-border bg-white items-center active:opacity-90"
                  >
                    <Text className="font-manrope-bold text-foreground">
                      Take photo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => pickImage("gallery")}
                    className="flex-1 py-3.5 rounded-2xl items-center active:opacity-90"
                    style={{ backgroundColor: KIA_RED }}
                  >
                    <Text className="font-manrope-bold text-white">
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View
                className="bg-white rounded-3xl border border-border p-4"
                style={cardShadowStyle}
              >
                <View className="flex-row justify-between items-start mb-3">
                  <Image
                    source={{ uri: imageUri }}
                    className="w-24 h-24 rounded-xl bg-elevated"
                  />
                  <TouchableOpacity onPress={resetOcrVisual} className="p-2">
                    <X size={22} color="#71717A" />
                  </TouchableOpacity>
                </View>
                {scanning ? (
                  <View className="flex-row items-center gap-3 py-6 justify-center">
                    <ActivityIndicator color={KIA_RED} />
                    <Text className="font-manrope text-muted">
                      Reading document…
                    </Text>
                  </View>
                ) : scanResult && !scanResult.success ? (
                  <Text className="text-sm font-manrope text-primary">
                    {scanResult.error ?? "Scan failed"}
                  </Text>
                ) : null}
              </View>
            )}
          </View>
        )}

        {step === "manual" && (
          <View className="px-6 pt-8">
            {ocrBanner ? (
              <View className="mb-6 rounded-2xl border border-primary/30 bg-badge-red px-4 py-3">
                <Text className="text-sm font-manrope text-foreground leading-relaxed">
                  We prefilled what we could from the scan. Review and complete
                  the required fields below.
                </Text>
              </View>
            ) : null}

            <Text className="text-xs font-manrope-bold text-muted mb-3 tracking-widest uppercase">
              Vehicle
            </Text>
            <Input
              label="Vehicle name"
              placeholder="e.g. KIA Sportage GT-Line"
              value={form.name}
              onChangeText={(t) => updateForm({ name: t })}
              onBlur={() => onBlurManual("name")}
              error={errors.name}
            />

            <Text className="text-xs font-manrope-bold text-muted mb-3 tracking-widest uppercase">
              Registration
            </Text>
            <Input
              label="Plate number"
              placeholder="e.g. 170 تونس 1867"
              value={form.plate}
              onChangeText={(t) => updateForm({ plate: t })}
              onBlur={() => onBlurManual("plate")}
              error={errors.plate}
            />
            <Input
              label="Mileage (km)"
              placeholder="e.g. 45000"
              value={form.mileage}
              onChangeText={(t) => updateForm({ mileage: t })}
              onBlur={() => onBlurManual("mileage")}
              keyboardType="number-pad"
              error={errors.mileage}
            />

            {typeChips}

            <Input
              label="VIN (optional)"
              placeholder="If available"
              value={form.vin}
              onChangeText={(t) => updateForm({ vin: t })}
              onBlur={() => onBlurManual("vin")}
              error={errors.vin}
            />

            {kiaCta(
              submitting ? "Saving…" : "Save vehicle",
              submitManual,
              submitting,
            )}
          </View>
        )}

        {step === "ocr-preview" && (
          <View className="px-6 pt-6">
            <View className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 mb-6 flex-row items-start gap-2">
              <CheckCircle2 size={22} color="#059669" strokeWidth={2} />
              <View className="flex-1">
                <Text className="font-jakarta-bold text-emerald-800 mb-1">
                  Data extracted
                </Text>
                <Text className="text-sm font-manrope text-emerald-900 leading-relaxed">
                  Review every field, then save. Fields marked AI were detected
                  automatically — you can edit them.
                </Text>
              </View>
            </View>

            <Input
              label="Vehicle name (or use brand + model below)"
              placeholder="Display name"
              value={form.name}
              onChangeText={(t) => updateForm({ name: t })}
              onBlur={() => onBlurScanField("name")}
              error={errors.name}
              rightElement={<AiBadge fieldKey="name" />}
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Input
                  label="Brand"
                  placeholder="e.g. KIA"
                  value={form.brand}
                  onChangeText={(t) => updateForm({ brand: t })}
                  onBlur={() => onBlurScanField("brand")}
                  error={errors.brand}
                  rightElement={<AiBadge fieldKey="brand" />}
                />
              </View>
              <View className="flex-1">
                <Input
                  label="Model"
                  placeholder="e.g. Sportage"
                  value={form.model}
                  onChangeText={(t) => updateForm({ model: t })}
                  onBlur={() => onBlurScanField("model")}
                  error={errors.model}
                  rightElement={<AiBadge fieldKey="model" />}
                />
              </View>
            </View>
            <Input
              label="Plate number"
              value={form.plate}
              onChangeText={(t) => updateForm({ plate: t })}
              onBlur={() => onBlurScanField("plate")}
              error={errors.plate}
              rightElement={<AiBadge fieldKey="plate" />}
            />
            <Input
              label="Mileage (km)"
              value={form.mileage}
              onChangeText={(t) => updateForm({ mileage: t })}
              onBlur={() => onBlurScanField("mileage")}
              keyboardType="number-pad"
              error={errors.mileage}
            />
            {typeChips}
            <Input
              label="VIN"
              value={form.vin}
              onChangeText={(t) => updateForm({ vin: t })}
              onBlur={() => onBlurScanField("vin")}
              error={errors.vin}
              rightElement={<AiBadge fieldKey="vin" />}
            />
            <Input
              label="CIN (or MF)"
              value={form.cin}
              onChangeText={(t) => updateForm({ cin: t })}
              onBlur={() => onBlurScanField("cin")}
              error={errors.cin}
              rightElement={<AiBadge fieldKey="cin" />}
            />
            <Input
              label="Owner name"
              value={form.ownerName}
              onChangeText={(t) => updateForm({ ownerName: t })}
              onBlur={() => onBlurScanField("ownerName")}
              error={errors.ownerName}
              rightElement={<AiBadge fieldKey="ownerName" />}
            />
            <Input
              label="Address"
              value={form.address}
              onChangeText={(t) => updateForm({ address: t })}
              onBlur={() => onBlurScanField("address")}
              error={errors.address}
              rightElement={<AiBadge fieldKey="address" />}
            />
            <Input
              label="DPMC — date"
              value={form.dpmc}
              onChangeText={(t) => updateForm({ dpmc: t })}
              onBlur={() => onBlurScanField("dpmc")}
              error={errors.dpmc}
              rightElement={<AiBadge fieldKey="dpmc" />}
            />

            {kiaCta(
              submitting ? "Saving…" : "Confirm & register vehicle",
              submitScanPreview,
              submitting,
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
