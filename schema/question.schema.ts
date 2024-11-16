import { z } from "zod";

export const QuestionSchema = z.object({
  question: z.string().min(10, { message: "required" }),
  bookId: z.string().min(1, { message: "required" }),
});

export type QuestionSchemaType = z.infer<typeof QuestionSchema>;
