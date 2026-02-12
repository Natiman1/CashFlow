import { z } from "zod";

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
