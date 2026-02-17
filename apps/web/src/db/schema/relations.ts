import { relations } from "drizzle-orm";
import { user, session, account } from "./auth";
import { transactions } from "./transactions";
import { budgets } from "./budgets";
import { categories } from "./categories";

export const userRelations = relations(user, ({ many }) => ({
  transactions: many(transactions),
  budgets: many(budgets),
  categories: many(categories),
  sessions: many(session),
  accounts: many(account),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
  user: one(user, {
    fields: [transactions.userId],
    references: [user.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const budgetRelations = relations(budgets, ({ one }) => ({
  user: one(user, {
    fields: [budgets.userId],
    references: [user.id],
  }),
}));

export const categoryRelations = relations(categories, ({ one }) => ({
  user: one(user, {
    fields: [categories.userId],
    references: [user.id],
  }),
}));
