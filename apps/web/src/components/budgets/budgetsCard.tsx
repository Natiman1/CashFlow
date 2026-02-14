import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditIcon, MoreVertical, TrashIcon } from "lucide-react";

type BudgetCardProps = {
  category: string;
  limit: number;
  spent: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BudgetCard({
  category,
  limit,
  spent,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const percentage =
    limit > 0 ? Math.floor(Math.min((spent / limit) * 100, 100)) : 0;

  let color = "bg-emerald-500";
  if (percentage >= 80 && percentage < 100) color = "bg-amber-500";
  if (percentage >= 100) color = "bg-red-500";

  const overBudget = () => {
    const overBudgetAmount =
      Number(spent.toFixed(2)) - Number(limit.toFixed(2));
    if (overBudgetAmount > 0) {
      return `Over budget by ${overBudgetAmount.toFixed(2)}`;
    } else if (overBudgetAmount === 0 && spent > 0 && spent >= limit) {
      return "Reached budget limit";
    } else {
      return "";
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3 cursor-pointer">
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="category">
          <span>{category}</span>
          <span className="ml-auto">{percentage}%</span>
        </FieldLabel>
        <Progress value={percentage} indicatorClassName={color} id="catagory" />
        <FieldLabel className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-xs text-muted-foreground">
              ${spent.toFixed(2)} / ${limit.toFixed(2)}
            </span>
            <span className="text-xs text-red-500">{overBudget()}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}><EditIcon className="h-4 w-4" />Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete}><TrashIcon className="h-4 w-4 text-red-500" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </FieldLabel>
      </Field>
    </div>
  );
}
