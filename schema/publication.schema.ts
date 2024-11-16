import { PublicationStatus } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const PublicationSchema = z.object({
  name: requiredString,
  imageUrl: z.string().optional(),
  description: requiredString,
  status: z
    .nativeEnum(PublicationStatus)
    .refine((status) => Object.values(PublicationStatus).includes(status), {
      message: "Invalid publication status",
    }),
});

export type PublicationSchemaType = z.infer<typeof PublicationSchema>;
