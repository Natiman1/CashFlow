"use server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { categories } from "@/db/schema/categories";
import { getUser } from "@/lib/auth-utils";
import { categorySchema } from "@/lib/types/category-type";
import { defaultCategories } from "@/db/schema/categories";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function createCategory(data: unknown) {
  const user = await getUser();
  const parsed = categorySchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid category data");
  }

  await db.insert(categories).values({
    id: randomUUID(),
    userId: user.id,
    ...parsed.data,
  });

  revalidatePath("/dashboard/categories");
}

export async function getUserCategories() {
  const user = await getUser();
 
  const userCategories = await db.select().from(categories).where(eq(categories.userId, user.id));

  if (userCategories.length === 0) {
    await db.insert(categories).values(
      defaultCategories.map((c) => ({
        id: randomUUID(),
        userId: user.id,
        ...c,
      }))
    );
  }

  return db.select().from(categories).where(eq(categories.userId, user.id));
}
