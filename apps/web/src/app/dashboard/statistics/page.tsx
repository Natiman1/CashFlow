import { getStatisticsData, StatsRange } from "@/actions/statistics";
import { getSettings } from "@/actions/settings";
import { StatsPeriodSelector } from "@/components/statistics/StatsPeriodSelector";
import { StatsSummaryCards } from "@/components/statistics/StatsSummaryCards";
import { DailySpendingChart } from "@/components/statistics/DailySpendingChart";
import { TrendAnalysisChart } from "@/components/statistics/TrendAnalysisChart";
import { CategoryBreakdown } from "@/components/statistics/CategoryBreakdown";
import { authIsRequired } from "@/lib/auth-utils";
import { formatCurrency } from "@/lib/utils";

interface StatisticsPageProps {
  searchParams: Promise<{ range?: string }>;
}

export const dynamic = "force-dynamic";

const StatisticsPage = async ({ searchParams }: StatisticsPageProps) => {
  await authIsRequired();
  const resolvedParams = await searchParams;
  const range = (resolvedParams.range as StatsRange) || "this_month";
  const data = await getStatisticsData(range);
  const { settings } = await getSettings();
  const currency = settings?.currency || "USD";

  return (
    <div className="flex flex-col gap-8 lg:p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your financial habits.
          </p>
        </div>
        <StatsPeriodSelector />
      </div>

      <StatsSummaryCards data={data} currency={currency} />

      <div className="grid gap-8 lg:grid-cols-3">
        <TrendAnalysisChart data={data.monthlyTrend} currency={currency} />
        <CategoryBreakdown data={data.expenseByCategory} currency={currency} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DailySpendingChart data={data.dailySpending} currency={currency} />
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Top Categories</h3>
          <div className="space-y-4">
            {data.expenseByCategory.slice(0, 5).map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold">
                    {formatCurrency(category.value, currency)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {data.totals.expense > 0
                      ? ((category.value / data.totals.expense) * 100).toFixed(
                          1,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
            ))}
            {data.expenseByCategory.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No spending data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
