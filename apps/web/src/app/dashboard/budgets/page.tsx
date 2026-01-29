"use client";
import { useState } from "react";
import BudgetCard from "@/components/budgets/budgetsCard";
import { mockBudgets } from "@/lib/mock/budgets";
import { transactions } from "@/lib/mock/transactions";
import { getMonthlySpendingByCategory } from "@/lib/budgets";
import type { Budget } from "@/lib/mock/budgets";
import EditBudgetModal from "@/components/budgets/editBudgetModal";
import { toast } from "sonner";
import AddBudgetLimit from "@/components/budgets/addBudgetLimit";

// type Props = {
//   data: Transaction[];
// };
const BudgetsPage = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  function updateBudget(category: string, newLimit: number) {
    setBudgets((prev) =>
      prev.map((b) =>
        b.category === category ? { ...b, limit: newLimit } : b,
      ),
    );

    toast.success("Budget updated", {
      description: `${category} budget set to $${newLimit}`,
    });
    setSelectedBudget(null);
  }

  function handleAddBudgetLimit(category: string, limit: number) {
    setBudgets((prev) => [...prev, { category, limit }]);
    toast.success("Budget added", {
      description: `${category} budget set to $${limit}`,
    });
  }

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Budgets</h1>
          <p className="text-sm text-muted-foreground">
            Track your monthly spending limits by category.
          </p>
        </div>

        <AddBudgetLimit onSave={handleAddBudgetLimit} />
      </div>
      {/* Budgets grid (placeholder) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
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
              onEdit={() => setSelectedBudget(budget)}
            />
          );
        })}
      </div>

      {selectedBudget && (
        <EditBudgetModal
          budget={selectedBudget}
          onClose={() => setSelectedBudget(null)}
          onSave={updateBudget}
        />
      )}
    </section>
  );
};

export default BudgetsPage;
