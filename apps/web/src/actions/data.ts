"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { transactions } from "@/lib/db";
import { eq } from "drizzle-orm";
import Papa from "papaparse";

export async function exportUserData() {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    const userTransactions = await db.query.transactions.findMany({
      where: eq(transactions.userId, session.user.id),
      with: {
        category: true, // Assuming relation is named 'category' or similar in schema/relations.ts
      },
      orderBy: (transactions, { desc }) => [desc(transactions.date)],
    });

    const csvData = userTransactions.map((t) => ({
      Description: t.description,
      Amount: t.amount,
      Category: t.category?.name || t.categoryId,
      Date: t.date.toISOString().split("T")[0],
    }));

    const csv = Papa.unparse(csvData);

    return { success: true, csv };
  } catch (error) {
    console.error("Failed to export data:", error);
    return { error: "Failed to export data" };
  }
}
