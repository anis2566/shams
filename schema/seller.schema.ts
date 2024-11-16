import { SellerStatus } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const SellerSchema = z.object({
  name: requiredString,
  phone: z.string().length(11, { message: "must be exactly 11 characters" }),
  email: z.string().email().optional(),
  imageUrl: requiredString,
  bio: requiredString,
});

export type SellerSchemaType = z.infer<typeof SellerSchema>;

export const SellerSchemaAdmin = z.object({
  userId: requiredString,
  name: requiredString,
  phone: z.string().length(11, { message: "must be exactly 11 characters" }),
  email: z.string().email().optional(),
  imageUrl: requiredString,
  bio: requiredString,
  status: z
    .nativeEnum(SellerStatus)
    .refine((data) => Object.values(SellerStatus).includes(data), {
      message: "required",
    }),
});

export type SellerSchemaAdminType = z.infer<typeof SellerSchemaAdmin>;
