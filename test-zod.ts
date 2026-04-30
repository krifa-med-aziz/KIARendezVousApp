import { z } from "zod"; const s = z.object({name: z.string()}).superRefine(()=>{}); console.log("SHAPE:", s.shape);
