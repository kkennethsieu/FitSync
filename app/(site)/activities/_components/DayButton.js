"use client";
export default function DayButton({
  day: dayOfWeek,
  date,
  isSelected,
  hasWorkout,
  isPlanned,
  onClick,
}) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const baseClasses =
    "flex flex-col items-center px-3 py-2 rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500";

  const selectedClasses =
    "bg-gradient-to-br from-orange-400 to-orange-500 text-white font-semibold shadow-md";

  const completedClasses =
    "bg-orange-50 text-orange-600 font-semibold border border-orange-100 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800";

  const plannedClasses =
    "bg-white text-orange-500 font-medium border-2 border-dashed border-orange-500 dark:bg-transparent dark:text-orange-400 dark:border-orange-400";

  const defaultClasses =
    "bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700";

  const className = [
    baseClasses,
    isSelected
      ? selectedClasses
      : hasWorkout
      ? completedClasses
      : isPlanned
      ? plannedClasses
      : defaultClasses,
  ].join(" ");

  return (
    <button onClick={onClick} className={className}>
      <span className="text-xs font-semibold">{dayOfWeek}</span>
      <span className="text-sm">
        {month}/{day}
      </span>
    </button>
  );
}
