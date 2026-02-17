import { db } from "@/lib/db";
import { budgets } from "@/db/schema/budgets";
import { categories } from "@/db/schema/categories";
import { createNotificationOnce } from "./notifications";
import { sql, eq, and } from "drizzle-orm";
import { user } from "@/db/schema/auth";

type UserSettings = {
  notifications: {
    budgetAlerts: boolean;
    monthlyReports: boolean;
  };
};

export async function checkBudgetAlerts(
  userId: string,
  categoryId: string,
  month: number,
  year: number,
) {
  // 1️⃣ Check user settings
  const userRecord = await db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: { settings: true },
  });

  const settings = userRecord?.settings as UserSettings;
  if (settings?.notifications?.budgetAlerts === false) {
    console.log(`[BudgetAlert] Budget alerts disabled for user ${userId}`);
    return;
  }

  const [budget] = await db
    .select({
      limit: budgets.limit,
      categoryName: categories.name,
    })
    .from(budgets)
    .innerJoin(categories, eq(budgets.categoryId, categories.id))
    .where(
      and(
        eq(budgets.userId, userId),
        eq(budgets.categoryId, categoryId),
        eq(budgets.month, month),
        eq(budgets.year, year),
      ),
    )
    .limit(1);

  if (!budget) return;

  console.log(
    `[BudgetAlert] Checking: userId=${userId}, categoryId=${categoryId}, period=${month}/${year}`,
  );

  const spentResult = await db.execute(sql`
    SELECT ABS(COALESCE(SUM(amount::numeric), 0)) AS total
    FROM transactions
    WHERE user_id = ${userId}
      AND category_id = ${categoryId}
      AND EXTRACT(MONTH FROM date) = ${month}
      AND EXTRACT(YEAR FROM date) = ${year}
  `);

  const totalSpent =
    (spentResult as unknown as { total: string }[])[0]?.total || "0";
  const limit = budget.limit;
  const categoryName = budget.categoryName;
  const usage = (Number(totalSpent) / Number(limit)) * 100;

  console.log(
    `[BudgetAlert] Calculated: category=${categoryName}, totalSpent=${totalSpent}, limit=${limit}, usage=${usage.toFixed(2)}%`,
  );

  if (usage >= 100) {
    await createNotificationOnce(
      userId,
      `budget_100_${categoryId}_${month}_${year}`,
      "Budget exceeded",
      `You have exceeded your budget for ${categoryName} (${usage.toFixed(1)}%).`,
    );
  } else if (usage >= 80) {
    await createNotificationOnce(
      userId,
      `budget_80_${categoryId}_${month}_${year}`,
      "Budget warning",
      `You have used ${usage.toFixed(1)}% of your budget for ${categoryName}.`,
    );
  }
}
