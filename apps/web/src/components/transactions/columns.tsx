import { type TransactionUI } from "@repo/types";
import { type ColumnDef, type Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteTransaction from "./deleteTransaction";
import { formatCurrency } from "@repo/utils";

function filterByMonth(
  row: Row<TransactionUI>,
  columnId: string,
  value: string,
) {
  if (!value) return true;
  return String(row.getValue(columnId) ?? "").startsWith(value);
}

export const getColumns = (
  currency: string = "USD",
): ColumnDef<TransactionUI>[] => [
  {
    accessorKey: "description",
    header: "Description",
    size: 180,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 180,
  },
  {
    accessorKey: "amount",
    size: 140,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Amount
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return (
        <span
          className={`font-medium ${
            value < 0 ? "text-red-500" : "text-emerald-600"
          }`}
        >
          {formatCurrency(value, currency)}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    size: 140,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Date
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    filterFn: filterByMonth,
  },
  {
    header: "Actions",
    id: "actions",
    size: 10,
    cell: ({ row }) => {
      const transaction = row.original;
      return <DeleteTransaction id={transaction.id} />;
    },
  },
];

export default getColumns;
