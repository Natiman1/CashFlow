"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PieLegend from "./pieLagend";

const COLORS = ["#10b981", "#60a5fa", "#f59e0b", "#ef4444"];

interface ExpenseData {
  name: string;
  value: number;
}

const ExpensesChart = ({ data }: { data: ExpenseData[] }) => {
  const legendData = data.map((item, index) => ({
    name: item.name,
    value: Number(item.value),
    color: COLORS[index % COLORS.length],
  }));

  if (data.length === 0) {
    return (
      <div className="rounded-lg bg-card p-4 shadow-sm lg:col-span-1 border border-gray-400">
        <h2 className="mb-4 text-sm font-medium text-foreground">
          Expenses by category
        </h2>
        <p className="text-sm text-muted-foreground h-full flex items-center justify-center">
          No expenses yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-4 shadow-sm lg:col-span-1 border border-gray-400">
      <h2 className="mb-4 text-sm font-medium text-foreground">
        Expenses by category
      </h2>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <PieLegend items={legendData} />
    </div>
  );
};

export default ExpensesChart;
