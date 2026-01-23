"use client";
import BudgetCard from "@/components/budgets/budgetsCard";
import { mockBudgets } from "@/lib/mock/budgets";

const page = () => {
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
        {mockBudgets.map((budget) => (
          <BudgetCard
            key={budget.category}
            category={budget.category}
            limit={budget.limit}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
