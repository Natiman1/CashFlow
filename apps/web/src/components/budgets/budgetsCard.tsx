import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

type BudgetCardProps = {
  category: string;
  limit: number;
};

export default function BudgetCard({ category, limit }: BudgetCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="progress-upload">
          <span>{category}</span>
          <span className="ml-auto">{0}%</span>
        </FieldLabel>
        <Progress value={0} id="progress-upload" />
        <FieldLabel>
          <span className="text-xs text-muted-foreground">$0 / ${limit}</span>
        </FieldLabel>
      </Field>
    </div>
  );
}
