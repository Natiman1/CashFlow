"use client";

import { deleteTransaction } from "@/actions/transactions";
import { useSession } from "@/lib/auth-client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteTransaction = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const handleDelete = async () => {
    if (session?.user.email === "demo@cashflow.app") {
      toast.error("Demo account is read-only");
      return;
    }
    await deleteTransaction(id);
    toast.success("Transaction deleted successfully");
  };

  return (
    <Trash2
      onClick={handleDelete}
      className="cursor-pointer text-red-500"
      size={16}
    />
  );
};

export default DeleteTransaction;
