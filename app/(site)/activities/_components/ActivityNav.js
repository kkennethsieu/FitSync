import { AddModal } from "@/app/_components/workoutForm/AddModal";
import DateRange from "@/app/_components/DateRange";
import Filter from "@/app/_components/Filter";
import WeekNav from "./WeekNav";

function ActivityNav({ exerciseType, exerciseCatalog, workouts }) {
  return (
    <div className="w-full max-w-4xl px-4 mx-auto space-y-6 sm:px-6">
      {/* Top nav row */}
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center sm:justify-between dark:bg-gray-800">
        <DateRange />
        <Filter exerciseType={exerciseType} />
      </div>

      {/* Week navigation */}
      <div className="overflow-x-auto">
        <div className="min-w-[360px] sm:min-w-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <WeekNav workouts={workouts} />
        </div>
      </div>

      {/* Log new workout button */}
      <div className="flex justify-end px-2">
        <AddModal
          exerciseType={exerciseType}
          exerciseCatalog={exerciseCatalog}
        />
      </div>
    </div>
  );
}

export default ActivityNav;
