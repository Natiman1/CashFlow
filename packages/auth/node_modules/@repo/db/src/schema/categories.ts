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
  { name: "Salary", type: "income", color: "#4CAF50" },
  { name: "Rent", type: "expense", color: "#F44336" },
  { name: "Food", type: "expense", color: "#2196F3" },
  { name: "Transport", type: "expense", color: "#9C27B0" },
  { name: "Utilities", type: "expense", color: "#FFC107" },
  { name: "Entertainment", type: "expense", color: "#FF5722" },
  { name: "Shopping", type: "expense", color: "#FFC107" },
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

    color: text("color").notNull(),

    isDefault: boolean("is_default").default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      userIdNameTypeIdx: uniqueIndex("user_id_name_type_idx").on(
        table.userId,
        table.name,
        table.type,
        table.color,
      ),
    };
  },
);
