"use client";

import { deleteCategory } from "@/actions/categories";
import { Trash2 } from "lucide-react";

const DeleteCategoy = ({id}: {id: string}) => {
    
    const handleDelete = async () => {
        await deleteCategory(id);
    }
  
  return (
    <Trash2
      onClick={handleDelete}
      className="cursor-pointer text-red-500"
      size={16}
    />
  );
};

export default DeleteCategoy;
