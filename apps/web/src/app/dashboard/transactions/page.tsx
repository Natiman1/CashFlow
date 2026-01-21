import TransactionsTable from "@/components/dashboard/transactionsTable";
import { Button } from "@/components/ui/button";
import { transactions } from "@/lib/mock/transactions";

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Transactions</h1>

        <Button>Add transaction</Button>
      </div>

      <TransactionsTable data={transactions} />
    </div>
  );
};

export default page;
