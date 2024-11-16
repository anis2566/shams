import { CategoryStatus } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const CategorySchema = z.object({
  name: requiredString,
  imageUrl: requiredString,
  description: z.string().optional(),
  status: z
    .nativeEnum(CategoryStatus)
    .refine((data) => Object.values(CategoryStatus).includes(data), {
      message: "required",
    }),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
