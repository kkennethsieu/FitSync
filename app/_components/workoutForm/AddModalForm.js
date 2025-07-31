"use client";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WorkoutForm from "@/app/_components/workoutForm/WorkoutForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  updateLifetimeStatsAfterWorkout,
  updateMonthlyStatsAfterWorkout,
  updatePRAfterWorkout,
} from "@/app/_helper/helperFormSubmit";
import { reportWorkoutCompleted } from "@/app/_helper/helperWeeklyStats";
import { getTimeToday, getToday } from "@/app/_helper/helper";
import { useSession } from "next-auth/react";

function AddModalForm({
  exerciseCatalog,
  exerciseType,
  setOpen,
  workout = null, // edit mode if this exists
  catalogItem,
}) {
  const { data: session, status } = useSession();
  const user_id = session.user.user_id;

  const [selectedType, setSelectedType] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sets, setSets] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [exerciseInputValue, setExerciseInputValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const today = getToday();
    const timeToday = getTimeToday();

    if (workout) {
      setSelectedExercise({ name: workout.name, category: workout.category });
      setSelectedType(workout.category);
      setSets(workout.sets || []);
      setCompleted(workout.completed ?? false);
      setExerciseInputValue(workout.name || "");
      setDate(workout.date || today);
      setTime(workout.time || timeToday);
    } else if (catalogItem) {
      // catalogItem is now a real match object
      setSelectedExercise(catalogItem);
      setSelectedType(catalogItem.category);
      setExerciseInputValue(catalogItem.name || "");
      setDate(now.toLocaleDateString("en-CA"));
      setTime(now.toTimeString().slice(0, 5));
    } else {
      setDate(now.toLocaleDateString("en-CA"));
      setTime(now.toTimeString().slice(0, 5));
    }
  }, [workout, catalogItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExercise || !selectedType) return;

    const { name, category } = selectedExercise;
    const payload = {
      user_id,
      name,
      category,
      sets,
      completed,
      date,
      time,
    };

    let data, error;
    if (workout?.date) {
      // Edit mode
      ({ data, error } = await supabase
        .from("workouts")
        .update(payload)
        .eq("id", workout.id));
    } else {
      // Add mode
      ({ data, error } = await supabase.from("workouts").insert([payload]));
    }

    if (error) {
      console.error("Error saving workout:", error);
    } else {
      console.log("Workout saved:", data);
      updatePRAfterWorkout(supabase, payload, user_id);
      updateLifetimeStatsAfterWorkout(supabase, payload, user_id);
      updateMonthlyStatsAfterWorkout(supabase, payload, user_id);
      reportWorkoutCompleted("test-user", category, user_id);
      router.refresh();
      setOpen(false);

      // Only reset state for add mode
      if (!workout) {
        setSelectedType(null);
        setSelectedExercise(null);
        setExerciseInputValue("");
        setSets([]);
        setCompleted(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>
          {workout?.date ? "Edit Workout" : "Log New Workout"}
          {selectedExercise ? `for ${selectedExercise.name}` : ""}
        </DialogTitle>
        <DialogDescription>
          {workout
            ? "Update your sets and workout info."
            : "Enter your sets and workout info for this exercise."}
        </DialogDescription>
      </DialogHeader>

      <WorkoutForm
        workout={workout}
        exerciseCatalog={exerciseCatalog}
        exerciseType={exerciseType}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
        sets={sets}
        setSets={setSets}
        completed={completed}
        setCompleted={setCompleted}
        exerciseInputValue={exerciseInputValue}
        setExerciseInputValue={setExerciseInputValue}
        date={date}
        time={time}
        setDate={setDate}
        setTime={setTime}
      />

      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">
          {workout?.date ? "Update" : "Save"} Workout
        </Button>
      </DialogFooter>
    </form>
  );
}

export default AddModalForm;
