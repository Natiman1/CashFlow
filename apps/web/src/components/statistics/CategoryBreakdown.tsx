"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryBreakdownProps {
  data: { name: string; value: number; color: string }[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-75 w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
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
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No expenses to show
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
