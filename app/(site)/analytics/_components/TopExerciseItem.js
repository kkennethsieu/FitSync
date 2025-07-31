import { formatTime } from "@/app/_helper/helper";
import Image from "next/image";

function TopExerciseItem({ item }) {
  const {
    name,
    category,
    total_reps,
    total_weight,
    total_distance,
    total_time,
    sessions_logged,
    last_performed,
    exercise_catalog,
  } = item;

  return (
    <div className="flex flex-col items-center gap-4 p-4 transition-shadow bg-white rounded-lg shadow-sm sm:flex-row dark:bg-gray-800 hover:shadow-md">
      {exercise_catalog?.image_url ? (
        <div className="w-[75px] h-[50px] flex-shrink-0 overflow-hidden border border-gray-200 rounded-sm dark:border-gray-600">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_IMG_URL}/${exercise_catalog.image_url}`}
            width={75}
            height={75}
            alt={category}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-gray-200 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-700" />
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate dark:text-gray-100">
          {name}
        </h3>
        <p className="text-sm text-gray-500 capitalize truncate dark:text-gray-400">
          {category}
        </p>

        <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-600 dark:text-gray-300">
          {total_reps > 0 && (
            <span>
              Reps: <strong>{total_reps}</strong>
            </span>
          )}
          {total_weight > 0 && (
            <span>
              Weight: <strong>{total_weight} lbs</strong>
            </span>
          )}
          {total_distance > 0 && (
            <span>
              Distance: <strong>{total_distance} mi</strong>
            </span>
          )}
          {total_time > 0 && (
            <span>
              Time: <strong>{formatTime(total_time)}</strong>
            </span>
          )}
          {sessions_logged !== undefined && (
            <span>
              Sessions: <strong>{sessions_logged}</strong>
            </span>
          )}
        </div>

        {last_performed && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Last performed: {new Date(last_performed).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default TopExerciseItem;
