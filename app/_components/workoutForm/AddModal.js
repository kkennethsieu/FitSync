"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddModalForm from "./AddModalForm";

export function AddModal({ exerciseCatalog, exerciseType }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Log Workout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] dark:bg-gray-900">
        <AddModalForm
          exerciseCatalog={exerciseCatalog}
          exerciseType={exerciseType}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
