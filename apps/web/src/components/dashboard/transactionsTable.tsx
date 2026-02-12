"use client";

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { TransactionUI } from "@/lib/types/transactions-type";

import columns from "./columns";
import Pagination from "./pagination";
import TableFilters from "./tableFilters";
import ExportToCsv from "./exportToCvs";
import { Category } from "@/lib/types/category-type";

type Props = {
  data: TransactionUI[];
  categories: Category[];
};

export default function TransactionsTable({ data, categories }: Props) {
  "use no memo";

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [transactions, setTransactions] = useState<TransactionUI[]>(data);

  useEffect(() => {
    setTransactions(data);
  }, [data]);

  const table = useReactTable({
    data: transactions,
    columns,
    state: { sorting, pagination, columnFilters },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500">
        No transactions yet
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between">
        <TableFilters table={table} categories={categories} />
        <ExportToCsv table={table} />
      </div>

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
                    scope="col"
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

          <tbody className="bg-card">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-3 text-foreground whitespace-nowrap text-center"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-muted">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="px-4 py-3 text-foreground whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
    </>
  );
}
