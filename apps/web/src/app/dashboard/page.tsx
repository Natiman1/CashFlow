

import SummaryCard from "@/components/dashboard/summaryCard";
import {
  dashboardSummary,
  recentTransactions,
} from "@/lib/mock/dashboard";
import { authIsRequired } from "@/lib/auth-utils";
import ExpensesChart from "@/components/dashboard/expenses-chart";


const page = async () => {
  await authIsRequired();
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Balance"
          value={`$${dashboardSummary.balance.toLocaleString()}`}
        />
        <SummaryCard
          label="Monthly Income"
          value={`$${dashboardSummary.income.toLocaleString()}`}
        />
        <SummaryCard
          label="Monthly Expenses"
          value={`$${dashboardSummary.expenses.toLocaleString()}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-card p-4 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-medium text-foreground">
            Recent transactions
          </h2>

          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between border-b pb-2 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {tx.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.category} • {tx.date}
                  </p>
                </div>

                <p
                  className={`text-sm font-medium ${
                    tx.amount < 0 ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <ExpensesChart />
        {/* <div className="rounded-lg bg-card p-4 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-sm font-medium text-foreground">
            Expenses by category
          </h2>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                >
                  {expenseByCategory.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <PieLegend items={legendData} />
        </div> */}
      </div>
    </section>
  );
};

export default page;
