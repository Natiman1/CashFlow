"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Transaction } from "@/lib/mock/transactions";
import { ArrowUpDown } from "lucide-react";

type Props = {
  data: Transaction[];
};

export default function TransactionsTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "title",
      header: "Description",
      size: 240,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "category",
      header: "Category",
      size: 160,
      cell: (info) => info.getValue(),
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
      cell: (info) => info.getValue(),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="min-w-full table-fixed text-sm">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left whitespace-nowrap font-medium text-gray-600"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-gray-900 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
