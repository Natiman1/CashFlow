export type Budget = {
  category: string;
  limit: number;
};

export const mockBudgets: Budget[] = [
  { category: "Food", limit: 300 },
  { category: "Transport", limit: 120 },
  { category: "Rent", limit: 800 },
  { category: "Utilities", limit: 150 },
  { category: "Entertainment", limit: 100 },
];
