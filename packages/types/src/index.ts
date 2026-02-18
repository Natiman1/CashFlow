import { z } from "zod";

// Transactions
export const transactionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(255, "Description is too long"),

  categoryId: z.string().trim().min(1, "Category is required"),

  amount: z
    .number({
      message: "Amount is required and must be a number",
    })
    .positive("Amount must be positive"),

  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

export type Transaction = z.infer<typeof transactionSchema>;

export type TransactionUI = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
};

// Budgets
export const budgetSchema = z.object({
  id: z.string().optional(),
  categoryId: z.string(),
  month: z.number().min(1).max(12),
  year: z.number().min(2020),
  limit: z.number().positive(),
});

export type Budget = z.infer<typeof budgetSchema>;

export type BudgetWithUsage = {
  budgetId: string;
  categoryId: string;
  category: string;
  limit: number;
  spent: number;
  month: number;
  year: number;
};

// Categories
export const categorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required").max(50),

  type: z.enum(["income", "expense"]),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export type Category = {
  id: string;
  name: string;
  type: string;
  color: string;
};

export type StatsRange =
  | "this_month"
  | "last_month"
  | "last_3_months"
  | "last_6_months"
  | "this_year"
  | "all";
