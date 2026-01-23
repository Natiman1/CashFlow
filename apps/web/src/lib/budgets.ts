import { Transaction } from "@/lib/mock/transactions";

export function getMonthlySpendingByCategory(
  transactions: Transaction[],
  category: string,
  month: string // YYYY-MM
) {
  return transactions
    .filter(
      (t) =>
        t.category === category &&
        t.amount < 0 &&
        t.date.startsWith(month)
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
}
