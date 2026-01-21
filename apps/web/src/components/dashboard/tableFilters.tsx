import { Table } from "@tanstack/react-table";
import { Transaction } from "@/lib/mock/transactions";
import { DatePicker } from "@/components/ui/datePicker";
import { format } from "date-fns";

type Props = {
  table: Table<Transaction>;
};

const TableFilters = ({ table }: Props) => {
  const filterValue = table.getColumn("date")?.getFilterValue() as string;
  const date = filterValue ? new Date(filterValue + "-01") : undefined;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <select
        value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table
            .getColumn("category")
            ?.setFilterValue(e.target.value || undefined)
        }
        className="h-9 rounded-md border px-3 text-sm"
      >
        <option value="">All categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Rent">Rent</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <DatePicker
        date={date}
        setDate={(date) => {
          table
            .getColumn("date")
            ?.setFilterValue(date ? format(date, "yyyy-MM") : undefined);
        }}
      />
    </div>
  );
};

export default TableFilters;

{
  /* <input
        type="month"
        value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn("date")?.setFilterValue(e.target.value || undefined)
        }
        className="h-9 rounded-md border px-3 text-sm"
      /> */
}
