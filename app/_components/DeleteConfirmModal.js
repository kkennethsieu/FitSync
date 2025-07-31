import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteConfirmationModal({
  workoutId,
  className = "",
  children,
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function onDelete(id) {
    const { error } = await supabase.from("workouts").delete().eq("id", id);
    if (error) {
      console.error("Error deleting workout:", error);
    } else {
      router.refresh(); // Revalidate the UI after deletion
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

      <DialogContent className="dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this workout?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => {
              await onDelete(workoutId);
              setOpen(false);
            }}
          >
            Delete
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
