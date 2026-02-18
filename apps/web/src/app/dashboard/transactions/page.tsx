import TransactionsTable from "@/components/transactions/transactionsTable";
import AddTransactionModal from "@/components/transactions/addTransactionModal";
import { getUserTransactions } from "@/actions/transactions";
import { type TransactionUI } from "@repo/types";
import { getUserCategories } from "@/actions/categories";
import { getSettings } from "@/actions/settings";

const TransactionsPage = async () => {
  const [dbTransactions, categories, { settings }] = await Promise.all([
    getUserTransactions(),
    getUserCategories(),
    getSettings(),
  ]);

  const currency = settings?.currency || "USD";

  const transactions: TransactionUI[] = dbTransactions.map((t) => ({
    id: t.id,
    description: t.description,
    category: t.category ?? "Uncategorized",
    amount: Number(t.amount),
    date: t.date.toISOString().split("T")[0],
  }));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold text-foreground">Transactions</h1>

        <AddTransactionModal text="Add Transaction" />
      </div>

      <TransactionsTable
        data={transactions}
        categories={categories}
        currency={currency}
      />
    </div>
  );
};

export default TransactionsPage;
