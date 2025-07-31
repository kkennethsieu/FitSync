"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import DeleteConfirmationModal from "@/app/_components/DeleteConfirmModal";
import EditWorkoutModal from "@/app/_components/workoutForm/EditWorkoutModal";
import ModalAddToWorkout from "@/app/_components/workoutForm/ModalAddToWorkout";
import RescheduleModal from "@/app/_components/workoutForm/RescheduleModal";
import { Ellipsis } from "lucide-react";

export default function WorkoutOptionsPopover({
  workout,
  isPlanned,
  exerciseType = [],
  exerciseCatalog = [],
}) {
  const [open, setOpen] = useState(false);
  const [openAddWorkout, setOpenAddWorkout] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button">
          <Ellipsis className="text-gray-900 cursor-pointer dark:text-gray-100 hover:text-gray-600" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-48 p-2 space-y-1 text-sm"
        side="bottom"
        align="end"
      >
        <EditWorkoutModal
          workout={workout}
          className="justify-start w-full border-none shadow-none cursor-pointer hover:bg-gray-100"
        >
          {isPlanned ? "View Details" : "View Summary"}
        </EditWorkoutModal>

        {isPlanned ? (
          <>
            <RescheduleModal
              workout={workout}
              className="justify-start w-full border-none shadow-none cursor-pointer hover:bg-gray-100"
            >
              Reschedule
            </RescheduleModal>
          </>
        ) : (
          <>
            <button
              onClick={() => setOpenAddWorkout(true)}
              className={`inline-flex rounded-md px-4 py-2 text-sm font-medium w-full hover:bg-accent cursor-pointer focus:outline-none`}
            >
              Copy Workout
            </button>
            {openAddWorkout && (
              <ModalAddToWorkout
                item={workout}
                open={openAddWorkout}
                onOpenChange={setOpenAddWorkout}
                exerciseCatalog={exerciseCatalog}
                exerciseType={exerciseType}
              />
            )}
          </>
        )}

        <DeleteConfirmationModal
          workoutId={workout.id}
          className="justify-start w-full text-red-500 border-none shadow-none cursor-pointer hover:text-red-600 hover:bg-red-100 "
        >
          Delete
        </DeleteConfirmationModal>
      </PopoverContent>
    </Popover>
  );
}
