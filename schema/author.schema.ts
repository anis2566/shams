import { AuthorStatus } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const AuthorSchema = z.object({
  name: requiredString.min(4, { message: "min 4 characters" }),
  email: z.string().email().optional(),
  imageUrl: z.string().optional(),
  bio: requiredString.min(10, { message: "min 10 characters" }),
  status: z
    .nativeEnum(AuthorStatus)
    .refine((data) => Object.values(AuthorStatus).includes(data), {
      message: "required",
    }),
});

export type AuthorSchemaType = z.infer<typeof AuthorSchema>;
