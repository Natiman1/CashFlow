import SummaryCard from "@/components/dashboard/summaryCard";
import { authIsRequired } from "@/lib/auth-utils";
import ExpensesChart from "@/components/dashboard/expenses-chart";
import { getDashboardData } from "@/actions/dashboard";
import { getUserTransactions } from "@/actions/transactions";
import BarGraph from "@/components/dashboard/barGraph";
import BudgetProgress from "@/components/dashboard/budgetProgress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { type TransactionUI } from "@repo/types";
import { getSession } from "@/lib/auth";
import { getSettings } from "@/actions/settings";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

const page = async () => {
  await authIsRequired();

  const session = await getSession();

  const [data, transactions, { settings }] = await Promise.all([
    getDashboardData(),
    getUserTransactions(),
    getSettings(),
  ]);

  const currency = settings?.currency || "USD";

  // Check for empty state
  const hasNoData =
    data.income === 0 &&
    data.expense === 0 &&
    transactions.length === 0 &&
    data.budgets.length === 0;

  if (hasNoData) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Welcome to CashFlow</h1>
        <p className="max-w-md text-muted-foreground">
          You haven&apos;t added any transactions or budgets yet. Start tracking
          your finances today by adding your first transaction or setting a
          budget.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard/transactions">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/budgets">Set Budget</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Format transactions for the table
  const formattedTransactions: TransactionUI[] = transactions.map((t) => ({
    id: t.id,
    description: t.description,
    category: t.category ?? "Uncategorized",
    amount: Number(t.amount),
    date: t.date.toISOString(),
  }));

  return (
    <div className="space-y-8 lg:p-6 ">
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome back, {session?.user?.name}
      </h1>
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Monthly Income"
          value={formatCurrency(data.income, currency)}
        />
        <SummaryCard
          label="Monthly Expenses"
          value={formatCurrency(data.expense, currency)}
        />
        <SummaryCard
          label="Balance"
          value={formatCurrency(data.balance, currency)}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm lg:col-span-2 min-w-0">
          <BarGraph data={data.monthlyTrend} currency={currency} />
        </div>
        <ExpensesChart data={data.expenseByCategory} currency={currency} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <div className="border border-gray-400 rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-150">
              <thead>
                <tr className="border-b bg-muted/50 transition-colors">
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Description
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {formattedTransactions.slice(0, 6).map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      {tx.description}
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {tx.category}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td
                      className={`p-4 align-middle text-right font-semibold ${
                        Number(tx.amount) < 0
                          ? "text-destructive"
                          : "text-emerald-600"
                      }`}
                    >
                      {formatCurrency(Number(tx.amount), currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4 min-w-0">
          <h2 className="text-lg font-semibold">Active Budgets</h2>
          <div className="space-y-4 rounded-lg border bg-card p-4 md:p-6 shadow-sm">
            {data.budgets.length > 0 ? (
              data.budgets.map((budget) => (
                <BudgetProgress
                  key={budget.id}
                  name={budget.name}
                  limit={budget.limit}
                  spent={budget.spent}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No active budgets this month.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
