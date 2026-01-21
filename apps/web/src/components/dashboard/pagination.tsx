import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Transaction } from "@/lib/mock/transactions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
type Props = {
  table: Table<Transaction>;
};

const Pagination = ({ table }: Props) => {
  return (
    <div className="mt-3 flex items-center justify-end gap-2 text-sm text-gray-700">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className=" disabled:opacity-50"
        size={"icon"}
      >
        <ChevronLeft />
      </Button>
      <span className="text-popover-foreground">
        {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="disabled:opacity-50"
        size={"icon"}
      >
        <ChevronRight />
      </Button>

      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="ml-4 h-8 w-25 text-popover-foreground">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[5, 10, 20].map((size) => (
            <SelectItem key={size} value={`${size}`}>
              Show {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Pagination;
