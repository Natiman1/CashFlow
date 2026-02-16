import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Wallet, Percent } from "lucide-react";

interface StatsSummaryProps {
  data: {
    income: number;
    expense: number;
    balance: number;
    savingsRate: number;
  };
}

export function StatsSummaryCards({ data }: StatsSummaryProps) {
  const cards = [
    {
      title: "Total Income",
      value: `$${data.income.toLocaleString()}`,
      icon: ArrowUpRight,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Expenses",
      value: `$${data.expense.toLocaleString()}`,
      icon: ArrowDownRight,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      title: "Savings Balance",
      value: `$${data.balance.toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Savings Rate",
      value: `${data.savingsRate.toFixed(1)}%`,
      icon: Percent,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`rounded-full p-2 ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
