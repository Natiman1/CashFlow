import { db } from "@/lib/db";
import { budgets } from "@/db/schema/budgets";
import { createNotificationOnce } from "./notifications";
import { sql, eq, and } from "drizzle-orm";

export async function checkBudgetAlerts(
  userId: string,
  categoryId: string,
  month: number,
  year: number,
) {
  const budget = await db
    .select()
    .from(budgets)
    .where(
      and(
        eq(budgets.userId, userId),
        eq(budgets.categoryId, categoryId),
        eq(budgets.month, month),
        eq(budgets.year, year),
      ),
    )
    .limit(1);

  if (!budget.length) return;

  const spent = await db.execute(sql`
    SELECT COALESCE(SUM(amount::numeric), 0) AS total
    FROM transactions
    WHERE user_id = ${userId}
      AND category_id = ${categoryId}
      AND EXTRACT(MONTH FROM date) = ${month}
      AND EXTRACT(YEAR FROM date) = ${year}
  `);

  const totalSpent = (spent as unknown as { total: string }[])[0]?.total || "0";
  const usage = (Number(totalSpent) / Number(budget[0].limit)) * 100;

  if (usage >= 100) {
    await createNotificationOnce(
      userId,
      "budget_100",
      "Budget exceeded",
      "You have exceeded your budget for this category.",
    );
  } else if (usage >= 80) {
    await createNotificationOnce(
      userId,
      "budget_80",
      "Budget warning",
      "You have used 80% of your budget.",
    );
  }
}
