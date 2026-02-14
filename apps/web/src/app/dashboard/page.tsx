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
import { TransactionUI } from "@/lib/types/transactions-type";

export const dynamic = "force-dynamic";

const page = async () => {
  await authIsRequired();
  const [data, transactions] = await Promise.all([
    getDashboardData(),
    getUserTransactions(),
  ]);

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
    <div className="space-y-8 p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Monthly Income"
          value={`$${data.income.toLocaleString()}`}
        />
        <SummaryCard
          label="Monthly Expenses"
          value={`$${data.expense.toLocaleString()}`}
        />
        <SummaryCard
          label="Balance"
          value={`$${data.balance.toLocaleString()}`}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm lg:col-span-2">
          <BarGraph data={data.monthlyTrend} />
        </div>
        <ExpensesChart data={data.expenseByCategory} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <table className="w-full text-sm border border-gray-200 rounded-lg">
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
              {formattedTransactions.slice(0, 7).map((tx) => (
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
                    {Number(tx.amount) < 0 ? "-" : "+"}$
                    {Math.abs(Number(tx.amount)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Active Budgets</h2>
          <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
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
