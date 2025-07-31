"use client";
import { getAvailableMonthsYears } from "@/app/_helper/helper";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MonthSelect({ workouts }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = searchParams.get("date");

  // Get options from your helper
  const options = getAvailableMonthsYears(workouts);

  // Add the "All Time" option at the start
  const allOptions = [{ value: "all-time", label: "All Time" }, ...options];

  if (allOptions.length === 0) {
    return <p className="text-gray-500">No workout data available</p>;
  }

  function onChange(value) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (value === "all-time") {
      // Remove the 'date' param to indicate no filter
      params.delete("date");
    } else {
      params.set("date", value);
    }
    params.delete("page");

    router.push(`${window.location.pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center px-2 py-4 sm:px-4">
      <Select.Root value={current ?? "all-time"} onValueChange={onChange}>
        <Select.Trigger className="inline-flex items-center justify-between w-full max-w-xs px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700">
          <Select.Value placeholder="Select Month & Year" />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-300" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            className="z-50 w-full max-w-xs overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <Select.ScrollUpButton className="flex items-center justify-center h-6 text-xs font-semibold text-gray-600 bg-gray-100 select-none dark:bg-gray-700 dark:text-gray-300">
              ▲
            </Select.ScrollUpButton>

            <Select.Viewport className="overflow-y-auto max-h-48">
              {allOptions.map(({ value: optValue, label }) => (
                <Select.Item
                  key={optValue}
                  value={optValue}
                  className="relative flex items-center px-4 py-2 text-sm cursor-pointer select-none text-gray-900 data-[highlighted]:bg-indigo-600 data-[highlighted]:text-white dark:text-gray-100 dark:data-[highlighted]:bg-indigo-500"
                >
                  <Select.ItemText>{label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute inline-flex items-center text-indigo-600 right-3 dark:text-indigo-300">
                    <Check className="w-4 h-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center h-6 text-xs font-semibold text-gray-600 bg-gray-100 select-none dark:bg-gray-700 dark:text-gray-300">
              ▼
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
