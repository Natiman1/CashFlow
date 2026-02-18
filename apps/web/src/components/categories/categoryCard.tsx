"use client";

import { type Category } from "@repo/types";
import { TrendingDown, TrendingUp } from "lucide-react";
import DeleteCategory from "./deleteCategoy";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const isExpense = category.type === "expense";

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center gap-4">
        <div
          className={`p-2.5 rounded-lg ${
            isExpense
              ? "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
              : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
          }`}
        >
          {isExpense ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
        </div>
        <div>
          <h3 className="font-semibold text-sm">{category.name}</h3>
          <p className="text-xs text-muted-foreground capitalize">
            {category.type}
          </p>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <DeleteCategory id={category.id} />
      </div>
    </div>
  );
}
