"use client";

import { deleteTransaction } from "@/actions/transactions";
import { Trash2 } from "lucide-react";

const DeleteTransaction = ({id}: {id: string}) => {
    
    const handleDelete = async () => {
        await deleteTransaction(id);
    }
  
  return (
    <Trash2
      onClick={handleDelete}
      className="cursor-pointer text-red-500"
      size={16}
    />
  );
};

export default DeleteTransaction;
