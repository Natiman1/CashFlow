import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Wallet, Percent } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface StatsSummaryProps {
  data: {
    totals: {
      income: number;
      expense: number;
      balance: number;
      savingsRate: number;
    };
    prevTotals: {
      income: number;
      expense: number;
      balance: number;
      savingsRate: number;
    };
  };
  currency?: string;
}

export function StatsSummaryCards({
  data,
  currency = "USD",
}: StatsSummaryProps) {
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / Math.abs(previous)) * 100;
  };

  const cards = [
    {
      title: "Total Income",
      value: formatCurrency(data.totals.income, currency),
      trend: calculateTrend(data.totals.income, data.prevTotals.income),
      icon: ArrowUpRight,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(data.totals.expense, currency),
      trend: calculateTrend(data.totals.expense, data.prevTotals.expense),
      icon: ArrowDownRight,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      reverseTrend: true, // Lower is better
    },
    {
      title: "Savings Balance",
      value: formatCurrency(data.totals.balance, currency),
      trend: calculateTrend(data.totals.balance, data.prevTotals.balance),
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Savings Rate",
      value:
        data.totals.savingsRate < 0
          ? `Overspending by ${Math.abs(data.totals.savingsRate).toFixed(1)}%`
          : `${data.totals.savingsRate.toFixed(1)}%`,
      trend: calculateTrend(
        data.totals.savingsRate,
        data.prevTotals.savingsRate,
      ),
      icon: Percent,
      color: data.totals.savingsRate < 0 ? "text-rose-600" : "text-purple-600",
      bgColor: data.totals.savingsRate < 0 ? "bg-rose-50" : "bg-purple-50",
      className:
        data.totals.savingsRate < 0 ? "text-rose-600" : "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const isPositiveTrend = card.trend > 0;
        const isBetter = card.reverseTrend ? !isPositiveTrend : isPositiveTrend;
        const trendColor = isBetter ? "text-emerald-600" : "text-rose-600";
        const TrendIcon = isPositiveTrend ? ArrowUpRight : ArrowDownRight;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${card.className} text-2xl font-bold`}>
                {card.value}
              </div>
            </CardContent>
            <CardFooter>
              <div className={`flex items-center text-xs ${trendColor}`}>
                <TrendIcon className="mr-1 h-3 w-3" />
                {Math.abs(card.trend).toFixed(1)}% from last period
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
