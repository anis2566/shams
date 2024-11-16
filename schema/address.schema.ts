import { PaymentMethod } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const AddressSchema = z.object({
  title: z.string().optional(),
  name: requiredString,
  phone: requiredString,
  altPhone: z.string().optional(),
  country: requiredString,
  city: requiredString,
  thana: requiredString,
  zone: z.string().optional(),
  address: requiredString,
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;

export const ExtendedAddressSchema = z.object({
  itle: z.string().optional(),
  name: requiredString,
  phone: requiredString,
  altPhone: z.string().optional(),
  country: requiredString,
  city: requiredString,
  thana: requiredString,
  zone: z.string().optional(),
  address: requiredString,
  paymentMethod: z
    .nativeEnum(PaymentMethod)
    .refine((val) => Object.values(PaymentMethod).includes(val), {
      message: "required",
    }),
});

export type ExtendedAddressSchemaType = z.infer<typeof ExtendedAddressSchema>;
