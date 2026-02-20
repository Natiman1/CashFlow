"use client";

import { deleteCategory } from "@/actions/categories";
import { useSession } from "@/lib/auth-client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const DeleteCategoy = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const handleDelete = async () => {
    if (session?.user.email === "demo@cashflow.app") {
      toast.error("Demo account is read-only");
      return;
    }
    await deleteCategory(id);
  };

  return (
    <Trash2
      onClick={handleDelete}
      className="cursor-pointer text-red-500"
      size={16}
    />
  );
};

export default DeleteCategoy;
