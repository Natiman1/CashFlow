import { getBudgetsWithUsage } from "@/actions/budgets";
import { getUserCategories } from "@/actions/categories";
import BudgetsClient from "@/components/budgets/budgets-client";
import { getSettings } from "@/actions/settings";

const BudgetsPage = async () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [budgets, categories, { settings }] = await Promise.all([
    getBudgetsWithUsage(month, year),
    getUserCategories(),
    getSettings(),
  ]);

  const currency = settings?.currency || "USD";

  return (
    <BudgetsClient
      initialBudgets={budgets}
      categories={categories}
      currency={currency}
    />
  );
};

export default BudgetsPage;
