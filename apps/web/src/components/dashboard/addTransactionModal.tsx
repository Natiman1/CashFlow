"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { addTransaction } from "@/actions/transactions";
import { getUserCategories } from "@/actions/categories";
import { useEffect } from "react";

type AddTransactionModalProps = {
  text: string;
};

const AddTransactionModal = ({ text }: AddTransactionModalProps) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    if (open) {
      getUserCategories().then((res) => setCategories(res));
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    addTransaction({
      amount: Number(amount),
      description,
      categoryId,
      date: (date ?? new Date()).toISOString().split("T")[0],
    });

    window.dispatchEvent(new Event("transaction-added"));

    toast.success("Transaction added", {
      description: "Transaction added successfully",
    });

    // Close modal and reset form
    setOpen(false);
    setAmount("");
    setDescription("");
    setCategoryId("");
    setDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Add a new transaction to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Grocery Store"
              />
            </div>
            <div className="grid gap-3">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label>Date</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
