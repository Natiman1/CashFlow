import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { on } from "events";

type BudgetCardProps = {
  category: string;
  limit: number;
  spent: number;
  onEdit: () => void
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

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3 cursor-pointer" onClick={onEdit}>
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="category">
          <span>{category}</span>
          <span className="ml-auto">{percentage}%</span>
        </FieldLabel>
        <Progress value={percentage} indicatorClassName={color} id="catagory" />
        <FieldLabel >
          <span className="text-xs text-muted-foreground">
            ${spent} / ${limit}
          </span>
          {percentage >= 100 && (
            <p className="text-xs text-red-500">
             Over budget by ${(spent - limit).toFixed(2)}
            </p>
          )}
        </FieldLabel>
      </Field>
    </div>
  );
}
