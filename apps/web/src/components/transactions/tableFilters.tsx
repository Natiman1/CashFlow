import { type Table } from "@tanstack/react-table";
import { type TransactionUI, type Category } from "@repo/types";
import { DatePicker } from "@/components/ui/DatePicker";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  table: Table<TransactionUI>;
  categories: Category[];
};

const TableFilters = ({ table, categories }: Props) => {
  const filterValue = table.getColumn("date")?.getFilterValue() as string;
  const date = filterValue ? new Date(filterValue + "-01") : undefined;

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
        <SelectTrigger className="md:w-45 w-32">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
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
