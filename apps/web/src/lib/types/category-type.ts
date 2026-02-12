// src/lib/validators/category.ts
import { z } from "zod"

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(50),

  type: z.enum(["income", "expense"]),
})

export type CategoryInput = z.infer<typeof categorySchema>

export type Category = {
  id: string;
  name: string;
  type: string;
};
