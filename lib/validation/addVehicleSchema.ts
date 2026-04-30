import { z } from "zod";

export const vehicleTypeEnum = z.enum(["private", "commercial", "other"]);

const mileageString = z
  .string()
  .trim()
  .min(1, "Mileage is required")
  .refine((s) => /\d/.test(s), "Mileage must be a number")
  .refine((s) => {
    const n = parseInt(s.replace(/\D/g, ""), 10);
    return !Number.isNaN(n) && n >= 0 && n <= 9_999_999;
  }, "Mileage is out of range");

/** Manual flow: single display name + plate + mileage + type */
export const manualAddVehicleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Vehicle name is required")
    .max(120, "Vehicle name is too long"),
  plate: z
    .string()
    .trim()
    .min(1, "Plate is required")
    .max(40, "Plate is too long"),
  mileage: mileageString,
  type: vehicleTypeEnum,
  vin: z
    .string()
    .max(64)
    .optional()
    .transform((v) => (v && v.trim() ? v.trim() : undefined)),
});

/** After OCR: allow name OR brand+model; extra carte-grise fields optional */
export const baseScanConfirmVehicleSchema = z.object({
  name: z.string().max(120),
  brand: z.string().max(80),
  model: z.string().max(80),
  plate: z
    .string()
    .trim()
    .min(1, "Plate is required")
    .max(40, "Plate is too long"),
  mileage: mileageString,
  type: vehicleTypeEnum,
  vin: z.string().max(64),
  cin: z.string().max(32),
  ownerName: z.string().max(120),
  address: z.string().max(200),
  dpmc: z.string().max(32),
});

export const scanConfirmVehicleSchema =
  baseScanConfirmVehicleSchema.superRefine((data, ctx) => {
    const name = (data.name || "").trim();
    const brand = (data.brand || "").trim();
    const model = (data.model || "").trim();
    if (!name && !(brand && model)) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a vehicle name, or both brand and model",
        path: ["name"],
      });
    }
  });

export type ManualAddVehicleInput = z.infer<typeof manualAddVehicleSchema>;
export type ScanConfirmVehicleInput = z.infer<typeof scanConfirmVehicleSchema>;

export function flattenZodErrors(error: z.ZodError): Record<string, string> {
  const map: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && map[key] === undefined) {
      map[key] = issue.message;
    }
  }
  return map;
}

/** First issue message for a path (e.g. superRefine on `name`). */
export function buildSubmitName(values: ScanConfirmVehicleInput): string {
  const name = (values.name || "").trim();
  if (name) return name;
  const bm =
    `${(values.brand || "").trim()} ${(values.model || "").trim()}`.trim();
  return bm || values.plate || "";
}
