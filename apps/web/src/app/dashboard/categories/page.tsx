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

      <ul className="space-y-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center flex-wrap border rounded-md p-3"
          >
            <span>{c.name}</span>
            <span className="text-sm text-muted-foreground">
              {c.type.charAt(0).toUpperCase() + c.type.slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
