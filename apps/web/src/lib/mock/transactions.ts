export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
};

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Store",
    category: "Food",
    amount: -120,
    date: "2026-01-10",
  },
  {
    id: "2",
    title: "Salary",
    category: "Income",
    amount: 5000,
    date: "2026-01-01",
  },
  {
    id: "3",
    title: "Electricity Bill",
    category: "Utilities",
    amount: -95,
    date: "2026-01-08",
  },
  {
    id: "4",
    title: "Movie Night",
    category: "Entertainment",
    amount: -40,
    date: "2026-01-06",
  },
];
