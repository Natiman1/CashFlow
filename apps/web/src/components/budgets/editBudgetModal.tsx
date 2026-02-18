import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BudgetWithUsage } from "@repo/types";
import { upsertBudget } from "@/actions/budgets";
import { toast } from "sonner";

type Props = {
  budget: BudgetWithUsage;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function EditBudgetModal({ budget, onClose, onSuccess }: Props) {
  const [limit, setLimit] = useState(budget.limit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSave() {
    setIsSubmitting(true);
    try {
      await upsertBudget({
        id: budget.budgetId,
        categoryId: budget.categoryId,
        limit: limit,
        month: budget.month,
        year: budget.year,
      });
      toast.success("Budget updated");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Failed to update budget");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {budget.category} Budget</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Monthly limit</label>
            <Input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
