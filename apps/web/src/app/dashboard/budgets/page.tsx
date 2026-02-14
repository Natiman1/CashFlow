import { getBudgetsWithUsage } from "@/actions/budgets";
import { getUserCategories } from "@/actions/categories";
import BudgetsClient from "@/components/budgets/budgets-client";

const BudgetsPage = async () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [budgets, categories] = await Promise.all([
    getBudgetsWithUsage(month, year),
    getUserCategories(),
  ]);

  return <BudgetsClient initialBudgets={budgets} categories={categories} />;
};

export default BudgetsPage;
