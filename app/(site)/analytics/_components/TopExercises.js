import NoWorkoutFound from "@/app/_components/NoWorkoutFound";
import TopExerciseItem from "./TopExerciseItem";

function TopExercises({ statsToShow }) {
  return (
    <div className="max-w-3xl p-6 mx-auto space-y-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
      <h5 className="pb-3 text-2xl font-extrabold text-orange-600 border-b-4 border-orange-400 dark:text-orange-400 dark:border-orange-500">
        Top Exercises
      </h5>

      <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
        {statsToShow?.length > 0 ? (
          statsToShow.map((item) => (
            <TopExerciseItem item={item} key={item.id} />
          ))
        ) : (
          <NoWorkoutFound />
        )}
      </div>
    </div>
  );
}

export default TopExercises;
