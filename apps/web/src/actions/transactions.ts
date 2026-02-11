"use server";

import { db } from "@/lib/db";
import { transactions } from "@/db/schema/transactions";
import { categories } from "@/db/schema/categories";
import { getUser } from "@/lib/auth-utils";
import { transactionSchema } from "@/lib/types/transactions-type";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { z } from "zod";
import { revalidatePath } from "next/cache";

function normalizeAmount(amount: number, type: "income" | "expense") {
  return type === "expense" ? -Math.abs(amount) : Math.abs(amount);
}

export async function addTransaction(data: z.infer<typeof transactionSchema>) {
  const user = await getUser();

  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  // 1️⃣ Load category and verify ownership
  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, parsed.data.categoryId))
    .then((res) => res[0]);

  if (!category || category.userId !== user.id) {
    throw new Error("Category not found");
  }

  // 2️⃣ Normalize amount
  const normalizedAmount = normalizeAmount(parsed.data.amount, category.type);

  // 3️⃣ Insert transaction
  await db.insert(transactions).values({
    id: randomUUID(),
    userId: user.id,
    categoryId: category.id,
    description: parsed.data.description,
    amount: normalizedAmount.toString(),
    date: new Date(parsed.data.date),
  });
  revalidatePath("/dashboard/transactions");
}

export async function getUserTransactions() {
  const user = await getUser();

  try {
    return await db
      .select({
        id: transactions.id,
        description: transactions.description,
        amount: transactions.amount,
        date: transactions.date,
        category: categories.name,
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(eq(transactions.userId, user.id))
      .orderBy(desc(transactions.date));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function deleteTransaction(id: string) {
  try {
    await db.delete(transactions).where(eq(transactions.id, id));
    revalidatePath("/dashboard/transactions");
  } catch (error) {
    console.error("Delete transaction error:", error);
    throw new Error("Failed to delete transaction");
  }
}
