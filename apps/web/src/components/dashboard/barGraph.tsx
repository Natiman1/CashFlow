"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

import { formatCurrency } from "@/lib/utils";

interface BarChartData {
  name: string;
  income: number;
  expense: number;
}

const BarGraph = ({
  data,
  currency = "USD",
}: {
  data: BarChartData[];
  currency?: string;
}) => {
  return (
    <div className="w-full h-75 sm:h-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-foreground">
          Income vs Expenses
        </h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-xs text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>
      <BarChart
        width={700}
        height={300}
        data={data}
        style={{
          width: "100%",
          height: "100%",
        }}
        margin={{
          top: 5,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(value) =>
            formatCurrency(value, currency).split(".")[0]
          }
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
          contentStyle={{
            border: "1px solid gray-200",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value: number | undefined) => [
            formatCurrency(value ?? 0, currency),
            "",
          ]}
        />
        <Bar
          dataKey="income"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          barSize={20}
        />
        <Bar
          dataKey="expense"
          fill="#f59e0b"
          radius={[4, 4, 0, 0]}
          barSize={20}
        />
      </BarChart>
    </div>
  );
};

export default BarGraph;
