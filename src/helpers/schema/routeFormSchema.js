import { z } from "zod";

export const routeFormSchema = z.object({
  name: z.string().min(3, "Route name must be at least 2 characters"),
  origin: z.string().min(2, "Origin is required"),
  destination: z.string().min(2, "Destination is required"),
  priority: z.enum(["high", "medium", "low"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
  startTime: z.string().nonempty("Start time is required"),
  endTime: z.string().nonempty("End time is required"),

  status: z.enum(["unassigned", "assigned", "in_progress"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  notes: z.string().optional(),
});
