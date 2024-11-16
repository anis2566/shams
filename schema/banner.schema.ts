import { BannerStatus } from "@prisma/client";
import { z } from "zod";

export const BannerSchema = z.object({
  imageUrl: z.string().min(1, { message: "required" }),
  status: z
    .nativeEnum(BannerStatus)
    .refine((data) => Object.values(BannerStatus).includes(data), {
      message: "required",
    }),
});

export type BannerSchemaType = z.infer<typeof BannerSchema>;
