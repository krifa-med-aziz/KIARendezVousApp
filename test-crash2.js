
const { z } = require("zod");
const baseScanConfirmVehicleSchema = z.object({
  name: z.string().max(120),
  brand: z.string().max(80),
  model: z.string().max(80),
  plate: z.string().trim().min(1, "Plate is required").max(40, "Plate is too long"),
});

const scanConfirmVehicleSchema =
  baseScanConfirmVehicleSchema.superRefine((data, ctx) => {
    console.log("Super refine called with:", JSON.stringify(data));
    const name = (data.name || "").trim();
    const brand = (data.brand || "").trim();
    const model = (data.model || "").trim();
    if (!name && !(brand && model)) {
      ctx.addIssue({ code: "custom", path: ["name"], message: "err" });
    }
  });

try {
  console.log("Parsing...");
  const result = scanConfirmVehicleSchema.safeParse({});
  console.log("Result:", result.success);
} catch(e) {
  console.error("CRASH:", e);
}

