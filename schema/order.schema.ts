import { PaymentMethod } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const OrderItemSchema = z.object({
  bookId: requiredString,
  quantity: z.number(),
  price: z.number(),
});

export const OrderSchema = z.object({
  name: requiredString.min(3, { message: "at least 3 characters long" }),
  phone: requiredString.length(11, { message: "must be 11 digits long" }),
  altPhone: z.string().optional(),
  country: requiredString,
  city: requiredString,
  thana: requiredString,
  zone: z.string().optional(),
  address: requiredString.min(8, { message: "at least 8 characters long" }),
  shippingCharge: z.number(),
  paymentMethod: z
    .nativeEnum(PaymentMethod)
    .refine((val) => Object.values(PaymentMethod).includes(val), {
      message: "required",
    }),
  orderItems: z.array(OrderItemSchema),
});

export type OrderSchemaType = z.infer<typeof OrderSchema>;
