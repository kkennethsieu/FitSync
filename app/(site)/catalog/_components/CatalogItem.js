import Image from "next/image";
import dynamic from "next/dynamic";

const ModalCatalog = dynamic(() => import("@/app/_components/ModalCatalog"), {
  ssr: false,
  loading: () => <span>Loading modal...</span>,
});

const ModalAddToWorkout = dynamic(
  () => import("@/app/_components/workoutForm/ModalAddToWorkout"),
  {
    ssr: false,
  }
);

function CatalogItem({
  item,
  exerciseCatalog,
  exerciseType,
  onAddWorkout,
  onViewExercise,
}) {
  const {
    image_url,
    name = "Unnamed Exercise",
    description,
    difficulty,
    primary_muscle,
    secondary_muscles,
    category,
  } = item;

  const imgSrc = image_url
    ? `${process.env.NEXT_PUBLIC_SUPABASE_IMG_URL}/${image_url}`
    : "/images/placeholder.jpg"; // optional fallback

  const renderTag = (label) => (
    <span
      key={label}
      className="px-2 py-1 text-yellow-800 capitalize bg-yellow-100 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
    >
      {label}
    </span>
  );

  const parsedSecondary = secondary_muscles
    ? secondary_muscles
        .split(";")
        .map((m) => m.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="flex flex-col gap-4 p-4 transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md dark:bg-gray-800 dark:border-gray-700 sm:flex-row">
      <div className="flex-shrink-0 w-full h-[150px] rounded-lg overflow-hidden sm:w-[200px] sm:h-[150px]">
        <Image
          src={imgSrc}
          width={200}
          height={150}
          alt={name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h3>

          {description && (
            <p className="max-w-md mb-3 text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-700 dark:text-gray-300">
            {difficulty && renderTag(difficulty)}
            {primary_muscle && renderTag(primary_muscle)}
            {parsedSecondary.map((muscle) => renderTag(muscle))}
            {category && renderTag(category)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => onAddWorkout(item)}
            className="px-3 py-2 text-sm text-blue-600 transition border border-blue-600 rounded hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900"
          >
            Add to Workout
          </button>
          <button
            onClick={() => onViewExercise(item)}
            className="px-3 py-2 text-sm text-gray-700 transition border border-gray-400 rounded hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            View Exercise
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatalogItem;
