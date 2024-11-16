import { BookStatus, Language } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const BookSchema = z.object({
  name: requiredString.min(4, "minimum 4 characters"),
  shortDescription: requiredString.min(10, "minimum 10 characters"),
  description: requiredString.min(10, "minimum 10 characters"),
  price: z.number().min(1, "price must be greater than 0"),
  discountPrice: z.number().optional(),
  imageUrl: requiredString,
  length: z.number().min(1, "length must be greater than 0"),
  edition: requiredString,
  isbn: z.number().optional(),
  authorId: requiredString,
  categoryId: requiredString,
  subCategoryId: z.string().optional(),
  publicationId: requiredString,
  stock: z.number().min(1, "stock must be greater than 0"),
  status: z
    .nativeEnum(BookStatus)
    .refine((val) => Object.values(BookStatus).includes(val), {
      message: "required",
    }),
  language: z
    .nativeEnum(Language)
    .refine((val) => Object.values(Language).includes(val), {
      message: "required",
    }),
  demoPdfUrl: z.string().optional(),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
