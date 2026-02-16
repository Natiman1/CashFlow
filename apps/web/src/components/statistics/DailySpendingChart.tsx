"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DailySpendingProps {
  data: { date: string; amount: number }[];
}

export function DailySpendingChart({ data }: DailySpendingProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-medium">Daily Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60 w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number | string | undefined) => [
                    `$${value?.toLocaleString()}`,
                    "Amount",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                  barSize={maxBarSize(data.length)}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No data for this period
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function maxBarSize(dataLength: number) {
  if (dataLength > 20) return 10;
  if (dataLength > 10) return 20;
  return 40;
}
