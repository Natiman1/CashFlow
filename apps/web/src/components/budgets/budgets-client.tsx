"use client";

import { useState } from "react";
import BudgetCard from "@/components/budgets/budgetsCard";
import type { BudgetWithUsage } from "@repo/types";
import EditBudgetModal from "@/components/budgets/editBudgetModal";
import AddBudgetLimit from "@/components/budgets/addBudgetLimit";
import { deleteBudget } from "@/actions/budgets";
import { toast } from "sonner";

type Props = {
  initialBudgets: BudgetWithUsage[];
  categories: { id: string; name: string; type: string }[];
  currency?: string;
};

export default function BudgetsClient({
  initialBudgets,
  categories,
  currency = "USD",
}: Props) {
  const [selectedBudget, setSelectedBudget] = useState<BudgetWithUsage | null>(
    null,
  );

  const handleDelete = async () => {
    try {
      const budgets = initialBudgets.map((budget) => budget.budgetId);
      await deleteBudget(budgets[0]);
      toast.success("Budget deleted successfully");
    } catch (error) {
      toast.error("Failed to delete budget");
      console.error(error);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
            currency={currency}
            onEdit={() => setSelectedBudget(budget)}
            onDelete={handleDelete}
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
