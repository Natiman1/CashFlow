import { exportToCSV } from "@/lib/exportCsv";
import { Transaction } from "@/lib/mock/transactions";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export default function ExportToCsv({ table }: { table: Table<Transaction> }) {
  const filteredRows = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

    

  const formattedRows = filteredRows.map((t) => ({
    Category: t.category,
    Description: t.title,
    Amount: t.amount,
    Date: t.date,
  }));



  return (
    <Button
      onClick={() =>
        exportToCSV(
          formattedRows,
          `Transactions-${new Date().toISOString().slice(0, 10)}.csv`,
        )
      }
    >
      Export CSV
    </Button>
  );
}
