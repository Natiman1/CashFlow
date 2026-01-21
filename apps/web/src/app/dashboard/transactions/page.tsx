import TransactionsTable from "@/components/dashboard/transactionsTable";
import AddTransactionModal from "@/components/dashboard/addTransactionModal";
import { transactions } from "@/lib/mock/transactions";

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Transactions</h1>

        <AddTransactionModal text="Add transaction" />
      </div>

      <TransactionsTable data={transactions} />
    </div>
  );
};

export default page;
