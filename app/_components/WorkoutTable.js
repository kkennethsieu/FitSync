import WorkoutRow from "./WorkoutRow";

export default function WorkoutTable({
  category,
  data,
  exerciseType,
  exerciseCatalog,
}) {
  return (
    <div className="max-w-4xl p-4 mx-auto overflow-x-auto bg-white rounded dark:bg-gray-900">
      <h5 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {category}
      </h5>
      <table className="min-w-full border border-collapse border-gray-300 table-auto dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Date
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Name
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Recent PR
            </th>
            <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Details
            </th>
            <th className="px-4 py-2 text-center border border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Complete?
            </th>
            <th className="px-4 py-2 text-center border border-gray-300 dark:border-gray-700 whitespace-nowrap">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((workout) => (
            <WorkoutRow
              key={workout.id}
              workout={workout}
              exerciseType={exerciseType}
              exerciseCatalog={exerciseCatalog}
            />
          ))}
        </tbody>
      </table>

      {/* Mobile-friendly message when table is scrollable */}
      <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 sm:hidden">
        Swipe left/right to see full table
      </p>
    </div>
  );
}
