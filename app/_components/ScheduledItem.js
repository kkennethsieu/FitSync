"use client";
import { formatDisplayDate, formatTimeWithDateFns } from "@/app/_helper/helper";
import Image from "next/image";

import WorkoutOptionsPopover from "@/app/_components/workoutForm/WorkoutActionsPopover";
import { Clock3 } from "lucide-react";

function ScheduledItem({ workout, exerciseType = [], exerciseCatalog = [] }) {
  const { date, time, exercise_catalog, category, name } = workout;

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMG_URL}/${exercise_catalog?.image_url}`;

  const isPlanned = workout.completed === false;
  const isCompleted = workout.completed === true;

  return (
    <div className="flex items-center gap-4 p-4 transition duration-200 ease-in-out bg-white shadow-sm rounded-2xl hover:shadow-md dark:bg-gray-700 dark:shadow-md">
      {/* Image */}
      <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden sm:w-20 sm:h-20 rounded-xl">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-xl"
          priority={false}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-gray-800 truncate sm:text-lg dark:text-gray-100">
            {name}
          </h4>

          {/* Popover */}
          <WorkoutOptionsPopover
            workout={workout}
            isPlanned={isPlanned}
            exerciseType={exerciseType}
            exerciseCatalog={exerciseCatalog}
          />
        </div>

        <p className="text-sm text-gray-500 capitalize dark:text-gray-300">
          {category}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock3 className="w-4 h-4 text-orange-500 transition hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300" />
          <span>{formatDisplayDate(date)}</span>
          <span>•</span>
          <span>{formatTimeWithDateFns(time, "h:mm a")}</span>
        </div>
      </div>
    </div>
  );
}

export default ScheduledItem;
