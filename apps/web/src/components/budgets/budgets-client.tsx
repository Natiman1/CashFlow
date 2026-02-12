"use client";

import { useState } from "react";
import BudgetCard from "@/components/budgets/budgetsCard";
import type { BudgetWithUsage } from "@/lib/types/budgets-type";
import EditBudgetModal from "@/components/budgets/editBudgetModal";
import AddBudgetLimit from "@/components/budgets/addBudgetLimit";

type Props = {
  initialBudgets: BudgetWithUsage[];
  categories: { id: string; name: string; type: string }[];
};

export default function BudgetsClient({ initialBudgets, categories }: Props) {
  const [selectedBudget, setSelectedBudget] = useState<BudgetWithUsage | null>(
    null,
  );

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Budgets</h1>
          <p className="text-sm text-muted-foreground">
            Track your monthly spending limits by category.
          </p>
        </div>

        <AddBudgetLimit categories={categories} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {initialBudgets.map((budget) => (
          <BudgetCard
            key={budget.budgetId}
            category={budget.category}
            limit={budget.limit}
            spent={budget.spent}
            onEdit={() => setSelectedBudget(budget)}
          />
        ))}
        {initialBudgets.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No budgets found for this month. Add one to get started!
          </div>
        )}
      </div>

      {selectedBudget && (
        <EditBudgetModal
          budget={selectedBudget}
          onClose={() => setSelectedBudget(null)}
        />
      )}
    </section>
  );
}
