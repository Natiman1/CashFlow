import { getUserCategories } from "@/actions/categories";
import AddCategoryModal from "@/components/categories/addCategoryModal";

import DeleteCategory from "@/components/categories/deleteCategoy";

export default async function CategoriesPage() {
  const categories = await getUserCategories();
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Categories</h1>
        <AddCategoryModal />
      </div>

      <ul className="space-y-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between border rounded-md p-3"
          >
            <div className="flex items-center justify-between flex-wrap">
              <span>{c.name}</span>
            <span className="text-sm text-muted-foreground mr-4">
              {c.type.charAt(0).toUpperCase() + c.type.slice(1)}
            </span>
            </div>
            
            <DeleteCategory id={c.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
