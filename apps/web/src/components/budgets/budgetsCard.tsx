import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

type BudgetCardProps = {
  category: string;
  limit: number;
  spent: number;
};

export default function BudgetCard({
  category,
  limit,
  spent,
}: BudgetCardProps) {
  const percentage = limit > 0 ? Math.floor(Math.min((spent / limit) * 100, 100)) : 0;

  let color = "bg-emerald-500";
  if (percentage >= 80 && percentage < 100) color = "bg-amber-500";
  if (percentage >= 100) color = "bg-red-500";

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="category">
          <span>{category}</span>
          <span className="ml-auto">{percentage}%</span>
        </FieldLabel>
        <Progress value={percentage} indicatorClassName={color} id="catagory" />
        <FieldLabel>
          <span className="text-xs text-muted-foreground">
            ${spent} / ${limit}
          </span>
        </FieldLabel>
      </Field>
    </div>
  );
}
