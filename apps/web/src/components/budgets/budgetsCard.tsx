import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

type BudgetCardProps = {
  category: string;
  limit: number;
  spent: number;
  onEdit: () => void;
};

export default function BudgetCard({
  category,
  limit,
  spent,
  onEdit,
}: BudgetCardProps) {
  const percentage =
    limit > 0 ? Math.floor(Math.min((spent / limit) * 100, 100)) : 0;

  let color = "bg-emerald-500";
  if (percentage >= 80 && percentage < 100) color = "bg-amber-500";
  if (percentage >= 100) color = "bg-red-500";

  const overBudget = () => {
    const overBudgetAmount = Number(spent.toFixed(2)) - Number(limit.toFixed(2));
    if (overBudgetAmount > 0) {
      return `Over budget by ${overBudgetAmount.toFixed(2)}`;
    } else if (overBudgetAmount === 0 && spent > 0 && spent >= limit) {
      return "Reached budget limit";
    } else {
      return "";
    }
  };
  
  return (
    <div
      className="rounded-lg border bg-card p-4 space-y-3 cursor-pointer"
      onClick={onEdit}
    >
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="category">
          <span>{category}</span>
          <span className="ml-auto">{percentage}%</span>
        </FieldLabel>
        <Progress value={percentage} indicatorClassName={color} id="catagory" />
        <FieldLabel>
          <span className="text-xs text-muted-foreground">
            ${spent.toFixed(2)} / ${limit.toFixed(2)}
          </span>
          <span className="text-xs text-red-500">{overBudget()}</span>
        </FieldLabel>
      </Field>
    </div>
  );
}
