"use client";
import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ToggleItem({ workout }) {
  const [completed, setCompleted] = useState(workout.completed);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleToggle = async (checked) => {
    setCompleted(checked); // optimistic update

    startTransition(async () => {
      const { error } = await supabase
        .from("workouts")
        .update({ completed: checked })
        .eq("id", workout.id);

      if (error) {
        console.error("Failed to update workout completion:", error);
        setCompleted(!checked);
      } else {
        router.refresh(); // ⬅️ this revalidates server components
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <Switch
        checked={completed}
        onCheckedChange={handleToggle}
        disabled={isPending}
      />
    </div>
  );
}
