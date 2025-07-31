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

function AddSetModal({ className = "", children, workout }) {
  const [open, setOpen] = useState(false);

  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const router = useRouter();

  async function onAddSet() {
    let updatedSets = workout.sets || [];
    let newSet;

    if (workout.category === "Cardio") {
      newSet = { time, distance };
    } else {
      newSet = { reps, weight };
    }

    updatedSets.push(newSet);

    const { error } = await supabase
      .from("workouts")
      .update({ sets: updatedSets })
      .eq("id", workout.id);

    if (error) {
      console.error("Failed to add set:", error);
    } else {
      router.refresh();
      setReps("");
      setWeight("");
      setTime("");
      setDistance(""); // refresh UI to show updated sets
    }
  }

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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Set</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {workout.category === "Cardio" ? (
            <>
              <Input
                placeholder="Time (e.g. 10 min)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <Input
                placeholder="Distance (e.g. 2 km)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </>
          ) : (
            <>
              <Input
                placeholder="Reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
              <Input
                placeholder="Weight (e.g. 135 lbs)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </>
          )}
        </div>
        <DialogFooter className="mt-4">
          <Button
            onClick={async () => {
              await onAddSet();
              setOpen(false);
            }}
          >
            Save Set
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddSetModal;
