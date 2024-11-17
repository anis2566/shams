import { z } from "zod";

export const SubscriberSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type SubscriberSchemaType = z.infer<typeof SubscriberSchema>;
