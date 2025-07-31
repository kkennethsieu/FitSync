import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FilterOptions from "./FilterOptions";

function Filter({ exerciseType }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 transition bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800">
          <span>Filter: Exercise Type</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-white border border-gray-200 shadow-md rounded-xl dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Select Types
        </div>
        <div className="flex flex-col gap-2">
          {exerciseType.map((exercise) => (
            <FilterOptions key={exercise.name} exercise={exercise} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Filter;
