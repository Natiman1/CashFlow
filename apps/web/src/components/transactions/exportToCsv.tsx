import { exportToCSV } from "@/lib/exportCsv";
import { type TransactionUI } from "@repo/types";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export default function ExportToCsv({
  table,
}: {
  table: Table<TransactionUI>;
}) {
  const filteredRows = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  const formattedRows = filteredRows.map((t) => ({
    Category: t.category,
    Description: t.description,
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
