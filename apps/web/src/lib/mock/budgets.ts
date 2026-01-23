export type Budget = {
  category: string;
  limit: number;
};

export const mockBudgets: Budget[] = [
  { category: "Food", limit: 3000 },
  { category: "Transport", limit: 1200 },
  { category: "Rent", limit: 800 },
  { category: "Utilities", limit: 150 },
  { category: "Entertainment", limit: 1000 },
];
