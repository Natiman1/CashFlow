"use server";

import { db } from "@/lib/db";
import { transactions } from "@/db/schema/transactions";
import {Transaction, transactionSchema} from "@/lib/types/transactions-type"
import { getUser } from "@/lib/auth-utils";
import { randomUUID } from "crypto";
import { eq, desc } from "drizzle-orm";



export async function addTransaction(data: Transaction) {
  const user = await getUser();

  const parsed = transactionSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  await db.insert(transactions).values({
    id: randomUUID(),
    userId: user.id,
    description: parsed.data.description,
    categoryId: parsed.data.category,
    amount: parsed.data.amount.toString(),
    date: new Date(parsed.data.date),
  });
}

export async function getUserTransactions() {
  const user = await getUser()

  return db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, user.id))
    .orderBy(desc(transactions.date))
}