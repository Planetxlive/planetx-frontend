import { z } from "zod";

export const parkingFormSchema = z.object({
  userId: z.string().min(1, "User ID is required"),

  spotNumber: z.string().min(1, "Spot number is required"),

  location: z.string().min(1, "Location is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  locality: z.string().min(1, "Locality is required"),
  sublocality: z.string().optional(),
  areaNumber: z.string().optional(),

  type: z.enum(['standard', 'disabled', 'electric', 'compact', 'premium']).default('standard'),

  isAvailable: z.boolean().default(true),

  hourlyRate: z.number().min(0, "Hourly rate must be non-negative"),

  size: z.enum(['small', 'medium', 'large']).default('medium'),

  amenitiesDetails: z.object({
    securityGuard: z.boolean().default(false),
    securityCameras: z.boolean().default(false),
    evCharging: z.boolean().default(false),
    valetService: z.boolean().default(false),
    coveredParking: z.boolean().default(false),
  }),

  images: z.array(
    z.string()
      .url("Invalid image URL")
      .refine(url => /^(https?:\/\/.*\.(png|jpg|jpeg|gif))$/i.test(url), {
        message: "Image URL must be a valid image format (png, jpg, jpeg, gif)",
      })
  ),

  accessibility: z.object({
    wheelchairAccessible: z.boolean().default(false),
    nearEntrance: z.boolean().default(false),
  }),

  coordinates: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),

  createdAt: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
    z.date().optional()
  ),

  updatedAt: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
    z.date().optional()
  ),
});