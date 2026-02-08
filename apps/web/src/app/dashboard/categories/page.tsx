// app/dashboard/categories/page.tsx
import { getUserCategories } from "@/actions/categories"
import AddCategoryModal from "@/components/dashboard/addCategoryModal"

export default async function CategoriesPage() {
  const categories = await getUserCategories()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Categories</h1>
        <AddCategoryModal />
      </div>

      <ul className="space-y-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex justify-between border rounded-md p-3"
          >
            <span>{c.name}</span>
            <span className="text-sm text-muted-foreground">
              {c.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
