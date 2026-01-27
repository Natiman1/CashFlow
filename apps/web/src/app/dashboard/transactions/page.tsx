"use client";
import TransactionsTable from "@/components/dashboard/transactionsTable";
import AddTransactionModal from "@/components/dashboard/addTransactionModal";
import { useState } from "react";
import {
  Transaction,
  transactions as defaultTransactions,
} from "@/lib/mock/transactions";

const TransactionsPage = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(defaultTransactions);
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Transactions</h1>

        <AddTransactionModal
          text="Add Transaction"
          onAddTransaction={handleAddTransaction}
        />
      </div>

      <TransactionsTable data={transactions} />
    </div>
  );
};

export default TransactionsPage;
