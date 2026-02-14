"use client";

import { useState } from "react";
import { Category } from "@/lib/types/category-type";
import CategoryCard from "./categoryCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CategoriesListProps {
  initialCategories: Category[];
}

export default function CategoriesList({
  initialCategories,
}: CategoriesListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = initialCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const incomeCategories = filteredCategories.filter(
    (c) => c.type === "income",
  );
  const expenseCategories = filteredCategories.filter(
    (c) => c.type === "expense",
  );

  return (
    <div className="space-y-8">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-2xl border border-dashed">
          <p className="text-muted-foreground font-medium">
            No categories found matching your search.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {incomeCategories.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
                Income Categories ({incomeCategories.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {incomeCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}

          {expenseCategories.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
                Expense Categories ({expenseCategories.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {expenseCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
