"use client";

import AddModalForm from "@/app/_components/workoutForm/AddModalForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export default function ModalAddToWorkout({
  item,
  exerciseType,
  exerciseCatalog,
  className = "",
  onOpenChange,
  open,
}) {
  const [prefillMatch, setPrefillMatch] = useState(null);

  useEffect(() => {
    if (item && exerciseCatalog) {
      const match = exerciseCatalog.find(
        (e) =>
          e.name.trim().toLowerCase() === item.name.trim().toLowerCase() &&
          e.category.trim().toLowerCase() === item.category.trim().toLowerCase()
      );
      console.log("prefill match:", match);
      setPrefillMatch(match || null);
    } else {
      setPrefillMatch(null);
    }
  }, [item, exerciseCatalog]);

  function closeModal() {
    onOpenChange(false);
  }
  const workoutForModal = {
    ...item,
    date: undefined,
    time: undefined,
    completed: false,
    sets: undefined,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[550px] ${className} dark:bg-gray-800`}
      >
        <AddModalForm
          setOpen={closeModal}
          exerciseCatalog={exerciseCatalog}
          exerciseType={exerciseType}
          catalogItem={prefillMatch}
          workout={workoutForModal}
        />
      </DialogContent>
    </Dialog>
  );
}
