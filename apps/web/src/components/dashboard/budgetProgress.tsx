import { Progress } from "@/components/ui/progress";
import { Field, FieldLabel } from "../ui/field";

const BudgetProgress = ({
  name,
  limit,
  spent,
}: {
  name: string;
  limit: number;
  spent: number;
}) => {
  const percentage =
    limit > 0 ? Math.floor(Math.min((spent / limit) * 100, 100)) : 0;
      let color = "bg-emerald-500";
  if (percentage >= 80 && percentage < 100) color = "bg-amber-500";
  if (percentage >= 100) color = "bg-red-500";
  return (
    <Field>
      <FieldLabel htmlFor={name}>
        <span className="text-sm font-medium">{name}</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {percentage}%
        </span>
      </FieldLabel>
      <Progress value={percentage} indicatorClassName={color} id={name} />
    </Field>
  );
};

export default BudgetProgress;
