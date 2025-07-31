"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function RescheduleModal({ className = "", children, workout }) {
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState(workout.date || "");
  const [newTime, setNewTime] = useState(workout.time || "");
  const router = useRouter();

  async function onReschedule() {
    const { error } = await supabase
      .from("workouts")
      .update({ date: newDate, time: newTime })
      .eq("id", workout.id);

    if (error) {
      console.error("Failed to reschedule workout:", error);
    } else {
      router.refresh();
      setOpen(false);
    }
  }

  function handleDialogOpenChange(newOpen) {
    setOpen(newOpen);
    if (newOpen) {
      router.refresh(); // revalidate before modal renders
      // initialize inputs with current workout date/time
      setNewDate(workout.date || "");
      setNewTime(workout.time || "");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent className="dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>Reschedule Workout</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="date"
            placeholder="Select new date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Input
            type="time"
            placeholder="Select new time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={async () => {
              await onReschedule();
            }}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RescheduleModal;
