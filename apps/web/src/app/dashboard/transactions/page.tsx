import TransactionsTable from "@/components/dashboard/transactionsTable";
import AddTransactionModal from "@/components/dashboard/addTransactionModal";
import { getUserTransactions } from "@/actions/transactions";
import { TransactionUI } from "@/lib/types/transactions-type";

const TransactionsPage = async () => {
  const dbTransactions = await getUserTransactions();

  const transactions: TransactionUI[] = dbTransactions.map((t) => ({
    id: t.id,
    description: t.description,
    category: t.category ?? "Uncategorized",
    amount: Number(t.amount),
    date: t.date.toISOString().split("T")[0],
  }));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Transactions</h1>

        <AddTransactionModal text="Add Transaction" />
      </div>

      <TransactionsTable data={transactions} />
    </div>
  );
};

export default TransactionsPage;
