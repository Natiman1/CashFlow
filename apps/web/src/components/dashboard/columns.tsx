import { TransactionUI } from "@/lib/types/transactions-type";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

function filterByMonth(
  row: Row<TransactionUI>,
  columnId: string,
  value: string,
) {
  if (!value) return true;
  return String(row.getValue(columnId) ?? "").startsWith(value);
}

const columns: ColumnDef<TransactionUI>[] = [
  {
    accessorKey: "description",
    header: "Description",
    size: 160,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 160,
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
          {value < 0 ? "-" : "+"}${Math.abs(value)}
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
];

export default columns;
