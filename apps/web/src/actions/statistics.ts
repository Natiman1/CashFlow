"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth-utils";
import { sql } from "drizzle-orm";
import { type StatsRange } from "@repo/types";

export async function getStatisticsData(range: StatsRange = "this_month") {
  const user = await getUser();
  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  switch (range) {
    case "this_month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "last_month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0);
      break;
    case "last_3_months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "last_6_months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "this_year":
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
      break;
    case "all":
      startDate = new Date(0); // Beginning of time
      endDate = new Date(now.getFullYear() + 10, 11, 31);
      break;
  }

  // 1. Totals
  const totals = await db.execute<{ income: string; expense: string }>(sql`
    SELECT
      SUM(CASE WHEN c.type = 'income' THEN t.amount::numeric ELSE 0 END) AS income,
      SUM(CASE WHEN c.type = 'expense' THEN t.amount::numeric ELSE 0 END) AS expense
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user.id}
      AND t.date >= ${startDate.toISOString()}
      AND t.date <= ${endDate.toISOString()}
  `);

  const totalIncome = Number(totals[0]?.income ?? 0);
  const totalExpense = Math.abs(Number(totals[0]?.expense ?? 0));
  const savings = totalIncome - totalExpense;
  const savingsRate = totalIncome === 0 ? 0 : (savings / totalIncome) * 100;

  // 2. Expense by category
  const rawExpenseByCategory = await db.execute<{
    name: string;
    value: string;
    color: string;
  }>(sql`
    SELECT
      c.name,
      SUM(t.amount::numeric) AS value,
      c.color
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user.id}
      AND c.type = 'expense'
      AND t.date >= ${startDate.toISOString()}
      AND t.date <= ${endDate.toISOString()}
    GROUP BY c.name, c.color
    ORDER BY value DESC
  `);

  const expenseByCategory = rawExpenseByCategory.map((row) => ({
    name: String(row.name),
    value: Math.abs(Number(row.value)),
    color: String(row.color || "#000000"),
  }));

  // 3. Daily Spending (for the selected range, but limited to 31 days max for readability in some charts)
  const dailySpendingRaw = await db.execute<{
    date: string;
    amount: string;
  }>(sql`
    SELECT
      DATE(t.date) as date,
      SUM(t.amount::numeric) as amount
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user.id}
      AND c.type = 'expense'
      AND t.date >= ${startDate.toISOString()}
      AND t.date <= ${endDate.toISOString()}
    GROUP BY DATE(t.date)
    ORDER BY DATE(t.date) ASC
  `);

  const dailySpending = dailySpendingRaw.map((row) => ({
    date: new Date(row.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    amount: Math.abs(Number(row.amount)),
  }));

  // 4. Monthly Trend (Income vs Expense)
  const monthlyTrendRaw = await db.execute<{
    month: number;
    year: number;
    income: string;
    expense: string;
  }>(sql`
    SELECT
      EXTRACT(MONTH FROM t.date) AS month,
      EXTRACT(YEAR FROM t.date) AS year,
      SUM(CASE WHEN c.type = 'income' THEN t.amount::numeric ELSE 0 END) AS income,
      SUM(CASE WHEN c.type = 'expense' THEN t.amount::numeric ELSE 0 END) AS expense
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user.id}
      AND t.date >= ${startDate.toISOString()}
      AND t.date <= ${endDate.toISOString()}
    GROUP BY year, month
    ORDER BY year ASC, month ASC
  `);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyTrend = monthlyTrendRaw.map((row) => ({
    name: `${monthNames[Number(row.month) - 1]} ${row.year}`,
    income: Number(row.income),
    expense: Math.abs(Number(row.expense)),
  }));

  const getPreviousPeriodDates = (startDate: Date, endDate: Date) => {
    const diff = endDate.getTime() - startDate.getTime();
    const prevStart = new Date(startDate.getTime() - diff);
    const prevEnd = new Date(startDate.getTime() - 1);
    return { prevStart, prevEnd };
  };

  const { prevStart, prevEnd } = getPreviousPeriodDates(startDate, endDate);

  const prevTotals = await db.execute<{
    income: string;
    expense: string;
  }>(sql`
    SELECT
      SUM(CASE WHEN c.type = 'income' THEN t.amount::numeric ELSE 0 END) AS income,
      SUM(CASE WHEN c.type = 'expense' THEN t.amount::numeric ELSE 0 END) AS expense
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${user.id}
      AND t.date >= ${prevStart.toISOString()}
      AND t.date <= ${prevEnd.toISOString()}
  `);

  const prevTotalIncome = Number(prevTotals[0]?.income ?? 0);
  const prevTotalExpense = Math.abs(Number(prevTotals[0]?.expense ?? 0));
  const prevSavings = prevTotalIncome - prevTotalExpense;
  const prevSavingsRate =
    prevTotalIncome === 0 ? 0 : (prevSavings / prevTotalIncome) * 100;

  return {
    totals: {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
      savingsRate: savingsRate,
    },
    expenseByCategory,
    dailySpending,
    monthlyTrend,
    prevTotals: {
      income: prevTotalIncome,
      expense: prevTotalExpense,
      balance: prevTotalIncome - prevTotalExpense,
      savingsRate: prevSavingsRate,
    },
  };
}
