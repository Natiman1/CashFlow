"use client";
import BudgetCard from "@/components/budgets/budgetsCard";
import { mockBudgets } from "@/lib/mock/budgets";
import { transactions } from "@/lib/mock/transactions";
import { getMonthlySpendingByCategory } from "@/lib/budgets";

// type Props = {
//   data: Transaction[];
// };
const page = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Budgets</h1>
        <p className="text-sm text-muted-foreground">
          Track your monthly spending limits by category.
        </p>
      </div>

      {/* Budgets grid (placeholder) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockBudgets.map((budget) => {
          const spent = getMonthlySpendingByCategory(
            transactions,
            budget.category,
            currentMonth,
          );

          return (
            <BudgetCard
              key={budget.category}
              category={budget.category}
              limit={budget.limit}
              spent={spent}
            />
          );
        })}
      </div>
    </section>
  );
};

export default page;
