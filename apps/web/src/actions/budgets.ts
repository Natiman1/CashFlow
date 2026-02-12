import { db } from "@/lib/db";
import { budgets } from "@/db/schema/budgets";
import { categories } from "@/db/schema/categories";
import { transactions } from "@/db/schema/transactions";
import { getUser } from "@/lib/auth-utils";
import { budgetSchema, BudgetWithUsage } from "@/lib/types/budgets-type";
import { randomUUID } from "crypto";
import { eq, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function upsertBudget(input: unknown) {
  const user = await getUser();
  const parsed = budgetSchema.safeParse(input);
  if (!parsed.success) throw new Error("Invalid budget data");

  const { id, categoryId, month, year, limit } = parsed.data;

  // ensure category is expense
  const category = await db
    .select({ type: categories.type })
    .from(categories)
    .where(eq(categories.id, categoryId))
    .then((r) => r[0]);

  if (!category || category.type !== "expense") {
    throw new Error("Budgets allowed only for expense categories");
  }

  const existing = id
    ? await db
        .select()
        .from(budgets)
        .where(eq(budgets.id, id))
        .then((r) => r[0])
    : await db
        .select()
        .from(budgets)
        .where(
          and(
            eq(budgets.userId, user.id),
            eq(budgets.categoryId, categoryId),
            eq(budgets.month, month),
            eq(budgets.year, year),
          ),
        )
        .then((r) => r[0]);

  if (existing) {
    await db
      .update(budgets)
      .set({
        limit: limit.toString(),
        categoryId: categoryId,
        month: month,
        year: year,
      })
      .where(eq(budgets.id, existing.id));
  } else {
    await db.insert(budgets).values({
      id: randomUUID(),
      userId: user.id,
      categoryId,
      month,
      year,
      limit: limit.toString(),
    });
  }
  revalidatePath("/dashboard/budgets");
}

export async function getBudgetsWithUsage(
  monthInput: number | string,
  yearInput: number | string,
): Promise<BudgetWithUsage[]> {
  const user = await getUser();
  const month =
    typeof monthInput === "string" ? parseInt(monthInput) : monthInput;
  const year = typeof yearInput === "string" ? parseInt(yearInput) : yearInput;

  const results = await db
    .select({
      budgetId: budgets.id,
      categoryId: budgets.categoryId,
      category: categories.name,
      limit: budgets.limit,
      month: budgets.month,
      year: budgets.year,
      spent: sql<string>`
        COALESCE(SUM(${transactions.amount}::numeric), 0)
      `,
    })
    .from(budgets)
    .innerJoin(categories, eq(budgets.categoryId, categories.id))
    .leftJoin(
      transactions,
      and(
        eq(transactions.categoryId, budgets.categoryId),
        eq(transactions.userId, user.id),
        sql`EXTRACT(MONTH FROM ${transactions.date}) = ${month}`,
        sql`EXTRACT(YEAR FROM ${transactions.date}) = ${year}`,
      ),
    )
    .where(
      and(
        eq(budgets.userId, user.id),
        eq(budgets.month, month),
        eq(budgets.year, year),
      ),
    )
    .groupBy(
      budgets.id,
      categories.name,
      budgets.categoryId,
      budgets.month,
      budgets.year,
    );

  return results.map((r) => ({
    ...r,
    limit: parseFloat(r.limit),
    spent: Math.abs(parseFloat(r.spent)), // Amount is stored as negative for expenses
  }));
}

export async function getUserCategories() {
  const user = await getUser();
  return db.select().from(categories).where(eq(categories.userId, user.id));
}
