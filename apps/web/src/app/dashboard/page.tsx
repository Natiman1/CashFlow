import SummaryCard from "@/components/dashboard/summaryCard";
import { authIsRequired } from "@/lib/auth-utils";
import ExpensesChart from "@/components/dashboard/expenses-chart";
import { getDashboardData } from "@/actions/dashboard";
import { getUserTransactions } from "@/actions/transactions";
import BarGraph from "@/components/dashboard/barGraph";
import BudgetProgress from "@/components/dashboard/budgetProgress";

export const dynamic = "force-dynamic";

const page = async () => {
  await authIsRequired();
  const [data, transactions] = await Promise.all([
    getDashboardData(),
    getUserTransactions(),
  ]);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Balance"
          value={`$${data.balance.toLocaleString()}`}
        />
        <SummaryCard
          label="Monthly Income"
          value={`$${data.income.toLocaleString()}`}
        />
        <SummaryCard
          label="Monthly Expenses"
          value={`$${data.expense.toLocaleString()}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-card p-4 shadow-sm lg:col-span-2 ">
          <BarGraph />
        </div>
        <div className="rounded-lg bg-card p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-medium text-foreground">
            Budget Progress
          </h2>
          <div className="space-y-4">
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
                No budgets set for this month.
              </p>
            )}
          </div>
        </div>
        <div className="rounded-lg bg-card p-4 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-medium text-foreground">
            Recent transactions
          </h2>

          <div className="space-y-3">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {tx.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.category} • {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>

                <p
                  className={`text-sm font-medium ${
                    Number(tx.amount) < 0 ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {Number(tx.amount) < 0 ? "-" : "+"}$
                  {Math.abs(Number(tx.amount))}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <ExpensesChart data={data.expenseByCategory} />
      </div>
    </section>
  );
};

export default page;
