"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth-utils";
import { sql } from "drizzle-orm";

export async function getDashboardData() {
  const user = await getUser();

  // Current month/year
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  // 1️⃣ Totals
  const totals = await db.execute<{ income: string; expense: string }>(sql`
    SELECT
      SUM(CASE WHEN c.type = 'income' THEN t.amount::numeric ELSE 0 END) AS income,
      SUM(CASE WHEN c.type = 'expense' THEN t.amount::numeric ELSE 0 END) AS expense
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user.id}
      AND EXTRACT(MONTH FROM t.date) = ${month}
      AND EXTRACT(YEAR FROM t.date) = ${year}
  `);

  // Expense by category

  const rawExpenseByCategory = await db.execute<{
    name: string;
    value: string;
  }>(sql`
    SELECT
      c.name,
      SUM(t.amount::numeric) AS value
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user.id}
      AND c.type = 'expense'
      AND EXTRACT(MONTH FROM t.date) = ${month}
      AND EXTRACT(YEAR FROM t.date) = ${year}
    GROUP BY c.name
  `);

  const expenseByCategory = rawExpenseByCategory.map((row) => ({
    name: String(row.name),
    value: Math.abs(Number(row.value)),
  }));

  // Budgets with usage

  const rawBudgetsWithUsage = await db.execute<{
    id: string;
    name: string;
    limit: string;
    spent: string;
  }>(sql`
    SELECT
      b.id,
      c.name,
      b.limit as "limit",
      COALESCE(SUM(t.amount::numeric), 0) AS spent
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    LEFT JOIN transactions t
      ON t.category_id = b.category_id
      AND t.user_id = b.user_id
      AND EXTRACT(MONTH FROM t.date) = b.month
      AND EXTRACT(YEAR FROM t.date) = b.year
    WHERE b.user_id = ${user.id}
      AND b.month = ${month}
      AND b.year = ${year}
    GROUP BY b.id, c.name, b.limit
  `);

  const budgetsWithUsage = rawBudgetsWithUsage.map((row) => ({
    id: row.id,
    name: row.name,
    limit: Number(row.limit),
    spent: Math.abs(Number(row.spent)),
  }));

  const totalIncome = Number(totals[0]?.income ?? 0);
  const totalExpense = Number(totals[0]?.expense ?? 0);

  return {
    income: totalIncome,
    expense: Math.abs(totalExpense),
    balance: totalIncome + totalExpense,
    expenseByCategory,
    budgets: budgetsWithUsage,
  };
}
