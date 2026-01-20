"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Transaction } from "@/lib/mock/transactions";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  data: Transaction[];
};

export default function TransactionsTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

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
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <>
    <div className="overflow-x-auto overflow-y-auto  max-h-110 rounded-lg border bg-background min-w-0">
      <table className="min-w-full w-max table-fixed text-sm">
        {/* 🔒 Column width lock */}
        <colgroup>
          {table.getAllLeafColumns().map((column) => (
            <col key={column.id} style={{ width: column.getSize() }} />
          ))}
        </colgroup>

        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="sticky top-0 z-10 bg-muted px-4 py-3 text-left whitespace-nowrap font-medium text-muted-foreground"
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
                  style={{ width: cell.column.getSize() }}
                  className="px-4 py-3 text-foreground whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 text-sm text-gray-700">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className=" disabled:opacity-50"
          size={"sm"}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button 
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="disabled:opacity-50"
          size={"sm"}
        >
          Next
        </Button>

        <select
          className="ml-4 rounded border px-2 py-1 text-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
