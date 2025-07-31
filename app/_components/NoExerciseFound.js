"use client";

import { Frown } from "lucide-react"; // optional icon

export default function NoExercisesFound({ message = "No exercises found." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500 dark:text-gray-400">
      <Frown className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
