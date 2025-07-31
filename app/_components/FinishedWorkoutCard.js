"use client";
import { useSearchParams } from "next/navigation";
import NoActivity from "./NoActivity";
import Pagination from "./Pagination";
import WorkoutTable from "./WorkoutTable";

const ITEMS_PER_PAGE = 10;

function FinishedWorkoutCard({
  sortedFinishedWorkouts,
  exerciseType,
  exerciseCatalog,
}) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const totalPages = Math.ceil(sortedFinishedWorkouts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedFinishedWorkouts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const noWorkoutsPlanned =
    sortedFinishedWorkouts.length === 0 || currentItems.length === 0;

  return (
    <div className="px-4 py-6 space-y-6 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Finished Workouts
      </h5>

      {noWorkoutsPlanned ? (
        <NoActivity
          title="No finished workouts yet."
          description="You're just one step away — finish a workout and it’ll show up here!"
        />
      ) : (
        <div className="py-4 bg-white rounded-sm shadow-sm dark:bg-gray-900">
          <WorkoutTable
            category="Finished Workouts"
            data={currentItems}
            exerciseType={exerciseType}
            exerciseCatalog={exerciseCatalog}
          />
        </div>
      )}

      {sortedFinishedWorkouts.length > ITEMS_PER_PAGE && (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  );
}

export default FinishedWorkoutCard;
