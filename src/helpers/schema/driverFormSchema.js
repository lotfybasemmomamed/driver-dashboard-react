import { z } from "zod";

export const adddriverFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  phone: z
    .string()
    .regex(/^01[0-2,5][0-9]{8}$/, "Phone must be a valid Egyptian number (11 digits)"),

  vehicle: z.string().min(2, "Vehicle is required"),

  license: z.string().min(5, "License must be valid"),

  shift: z.enum(["Morning", "Evening", "Night"], {
    required_error: "Shift is required",
  }),

  notes: z.string().optional(),
});
