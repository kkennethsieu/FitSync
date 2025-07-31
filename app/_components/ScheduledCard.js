import NoActivity from "@/app/_components/NoActivity";
import ScheduledItem from "@/app/_components/ScheduledItem";
import { getCurrentYearMonth } from "@/app/_helper/helper";
import LinkWithProgress from "./LinkWithProgress";

function ScheduledCard({ title, data, exerciseCatalog, exerciseType }) {
  const currentYearMonth = getCurrentYearMonth();

  return (
    <div className="p-4 space-y-4 bg-white shadow-sm rounded-2xl dark:bg-gray-800 dark:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-100">
          {title}
        </h5>
        {data?.length > 0 && (
          <LinkWithProgress
            href={`analytics/?date=${currentYearMonth}#planned-section`}
            className="flex items-center gap-1 text-sm font-medium text-orange-500 transition hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
          >
            View More
          </LinkWithProgress>
        )}
      </div>

      {/* List or fallback */}
      <div className="space-y-3">
        {data?.length > 0 ? (
          data.map((workout) => (
            <ScheduledItem
              key={workout.id}
              workout={workout}
              exerciseCatalog={exerciseCatalog}
              exerciseType={exerciseType}
            />
          ))
        ) : (
          <NoActivity
            title="No workouts logged"
            description="Log a workout!"
            className="text-gray-600 dark:text-gray-400"
          />
        )}
      </div>
    </div>
  );
}

export default ScheduledCard;
