import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const categoryTypeEnum = pgEnum("category_type", ["income", "expense"]);

export const defaultCategories = [
  { name: "Salary", type: "income" },
  { name: "Rent", type: "expense" },
  { name: "Food", type: "expense" },
  { name: "Transport", type: "expense" },
  { name: "Utilities", type: "expense" },
  { name: "Entertainment", type: "expense" },
  { name: "Shopping", type: "expense" },
] as const;

export const categories = pgTable(
  "categories",
  {
    id: text("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    name: text("name").notNull(),

    type: categoryTypeEnum("type").notNull(),

    isDefault: boolean("is_default").default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      userIdNameTypeIdx: uniqueIndex("user_id_name_type_idx").on(
        table.userId,
        table.name,
        table.type,
      ),
    };
  },
);
