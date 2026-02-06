import { z } from "zod";

export const transactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(255, "Description is too long"),

  category: z.string().trim().min(1, "Category is required").max(100),

  amount: z.number({
    message: "Amount is required and must be a number",
  }),

  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

export type Transaction = z.infer<typeof transactionSchema>;

export type TransactionUI = {
  id: string
  description: string
  category: string
  amount: number
  date: string
}