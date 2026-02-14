import { getUserCategories } from "@/actions/categories";
import AddCategoryModal from "@/components/categories/addCategoryModal";
import CategoriesList from "@/components/categories/categoriesList";

export default async function CategoriesPage() {
  const categories = await getUserCategories();

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage your income and expense categories to track your spending
            better.
          </p>
        </div>
        <AddCategoryModal />
      </div>

      <div className="space-y-4">
        <CategoriesList initialCategories={categories} />
      </div>
    </div>
  );
}
