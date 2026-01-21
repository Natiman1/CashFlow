import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Transaction } from "@/lib/mock/transactions";


type Props = {
    table: Table<Transaction>;
}

const Pagination = ({table}: Props) => {
  return (
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
  )
}

export default Pagination