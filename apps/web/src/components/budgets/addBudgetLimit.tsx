import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { upsertBudget } from "@/actions/budgets";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

type Props = {
  categories: { id: string; name: string; type: string }[];
  onSuccess?: () => void;
};

const AddBudgetLimit = ({ categories, onSuccess }: Props) => {
  const [limit, setLimit] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user.email === "demo@cashflow.app") {
      toast.error("Demo account is read-only");
      return;
    }
    if (!categoryId || limit <= 0) return;

    setIsSubmitting(true);
    try {
      const now = new Date();
      await upsertBudget({
        categoryId,
        limit,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      });

      toast.success("Budget added successfully");
      setOpen(false);
      setLimit(0);
      setCategoryId("");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to add budget");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const expenseCategories = categories.filter((c) => c.type === "expense");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Budget Limit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Budget Limit</DialogTitle>
            <DialogDescription>
              Add a new budget limit to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                placeholder="0.00"
                required
              />
            </div>

            <div className="grid gap-3">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetLimit;
