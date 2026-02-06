import { Table } from "@tanstack/react-table";
import { Transaction } from "@/lib/types/types";
import { DatePicker } from "@/components/ui/datePicker";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
type Props = {
  table: Table<Transaction>;
  onAddTransaction: (transaction: Transaction) => void;
};

const TableFilters = ({ table, onAddTransaction }: Props) => {
  const filterValue = table.getColumn("date")?.getFilterValue() as string;
  const date = filterValue ? new Date(filterValue + "-01") : undefined;

  const handleAddTransaction = (transaction: Transaction) => {
    onAddTransaction(transaction);
    toast.success("Transaction added successfully");
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <Select
        value={
          (table.getColumn("category")?.getFilterValue() as string) ?? "all"
        }
        onValueChange={(value) =>
          table
            .getColumn("category")
            ?.setFilterValue(value === "all" ? undefined : value)
        }
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Transport">Transport</SelectItem>
          <SelectItem value="Rent">Rent</SelectItem>
          <SelectItem value="Utilities">Utilities</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
        </SelectContent>
      </Select>
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
