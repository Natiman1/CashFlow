import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  description: text("description").notNull(),

  category: text("category").notNull(),

  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),

  date: timestamp("date", { mode: "date" }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
