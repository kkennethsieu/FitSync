import { formatDisplayDate } from "../_helper/helper";
import ToggleItem from "./workoutForm/ToggleItem";
import WorkoutOptionsPopover from "./workoutForm/WorkoutActionsPopover";
import WorkoutDetails from "./WorkoutDetails";

export default function WorkoutRow({ workout, exerciseType, exerciseCatalog }) {
  const isPlanned = workout.completed === false;

  return (
    <tr className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 whitespace-nowrap">
        {formatDisplayDate(workout.date)}
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">
        {workout.name}
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 whitespace-nowrap">
        {workout.recentPR}
      </td>
      <td className="max-w-xs px-4 py-2 truncate border border-gray-300 dark:border-gray-600 dark:text-gray-200">
        <WorkoutDetails workout={workout} />
      </td>
      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200">
        <div className="flex items-center justify-center">
          <ToggleItem workout={workout} />
        </div>
      </td>
      <td className="relative px-4 py-2 text-center border border-gray-300 dark:border-gray-600">
        <WorkoutOptionsPopover
          workout={workout}
          isPlanned={isPlanned}
          exerciseType={exerciseType}
          exerciseCatalog={exerciseCatalog}
        />
      </td>
    </tr>
  );
}
