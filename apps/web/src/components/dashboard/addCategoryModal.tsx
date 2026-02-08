"use client"

import{ useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createCategory } from '@/actions/categories'

const AddCategoryModal = () => {


    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createCategory({ name, type });
        setOpen(false);
        setName("");
        setType("");
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit}>
        <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to your budget.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="e.g. Groceries" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-span-2">
            <Label htmlFor="type">Type</Label>
            <Select onValueChange={(value) => setType(value)} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Add Category</Button>
        </DialogFooter>
      </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddCategoryModal