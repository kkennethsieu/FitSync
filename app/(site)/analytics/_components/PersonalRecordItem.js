import Image from "next/image";
import { formatDisplayDate, formatTime } from "@/app/_helper/helper";

function PersonalRecordItem({ record }) {
  const { name, category, value, metric, date_achieved } = record;

  let displayValue = value;

  if (metric === "best_time") {
    displayValue = formatTime(value);
  } else if (metric === "max_distance") {
    displayValue = `${value} km`; // Adjust unit if needed
  } else if (metric === "max_weight") {
    displayValue = `${value} lbs`;
  } else if (metric === "max_reps") {
    displayValue = `${value} reps`;
  }

  const metricColors = {
    max_weight: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
    max_reps:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
    best_time: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
    max_distance:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  };

  const metricClass =
    metricColors[metric] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

  return (
    <div className="flex flex-col items-center gap-4 p-4 transition-shadow bg-white rounded-lg shadow-sm dark:bg-gray-800 hover:shadow-md sm:flex-row sm:items-center sm:justify-start">
      {/* Image */}
      <div className="w-[75px] h-[50px] flex-shrink-0 overflow-hidden border border-gray-200 rounded-sm dark:border-gray-600">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_IMG_URL}/${record.exercise_catalog.image_url}`}
          width={75}
          height={75}
          alt={category}
          className="object-cover"
        />
      </div>

      {/* Text: Category & Name */}
      <div className="flex flex-col items-center w-full text-center sm:w-auto sm:items-start sm:text-left">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {category}
        </p>
        <p className="text-sm font-bold text-gray-900 md:text-lg dark:text-white">
          {name}
        </p>
      </div>

      {/* Metrics */}
      <div className="flex flex-col items-center space-y-1 sm:ml-auto sm:items-end">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${metricClass}`}
        >
          {metric.replaceAll("_", " ").toUpperCase()}
        </span>
        <p className="text-base font-semibold text-gray-900 md:text-xl dark:text-white">
          {displayValue}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {formatDisplayDate(date_achieved)}
        </p>
      </div>
    </div>
  );
}

export default PersonalRecordItem;
