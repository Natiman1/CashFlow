"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import PieLegend from "./pieLagend";
import { expenseByCategory } from '@/lib/mock/dashboard';
const COLORS = ["#10b981", "#60a5fa", "#f59e0b", "#ef4444"];
const legendData = expenseByCategory.map((item, index) => ({
  name: item.name,
  value: item.value,
  color: COLORS[index % COLORS.length],
}));
const ExpensesChart = () => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm lg:col-span-1">
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
            </div>
  )
}

export default ExpensesChart