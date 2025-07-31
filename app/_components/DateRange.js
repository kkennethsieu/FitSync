"use client";
import { useSearchParams } from "next/navigation";
import { formatDisplayDate } from "../_helper/helper";

function DateRange() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  return (
    <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 shadow-sm rounded-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
      <span className="whitespace-nowrap">
        Selected Date: {formatDisplayDate(date)}
      </span>
    </div>
  );
}

export default DateRange;
