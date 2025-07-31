import { Frown } from "lucide-react";

function NoActivity({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center h-48 p-6 space-y-3 text-center bg-white shadow-md rounded-xl dark:bg-gray-800 dark:shadow-lg">
      <Frown className="text-4xl text-orange-400 dark:text-orange-500" />
      <p className="max-w-md text-xl italic font-semibold text-gray-700 dark:text-gray-100">
        {title}
      </p>
      <p className="max-w-sm text-sm italic text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default NoActivity;
