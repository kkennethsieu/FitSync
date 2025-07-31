"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddModalForm from "./AddModalForm";
import { Button } from "@/components/ui/button";

export default function EditWorkoutModal({
  workout,
  className = "",
  children,
}) {
  const [open, setOpen] = useState(false);

  function handleDialogOpenChange(newOpen) {
    setOpen(newOpen);
    if (newOpen) {
      router.refresh(); // ✅ revalidate before modal renders
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`${className}`}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] dark:bg-gray-800">
        <AddModalForm setOpen={setOpen} workout={workout} />
      </DialogContent>
    </Dialog>
  );
}
