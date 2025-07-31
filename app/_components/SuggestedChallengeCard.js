"use client";

import { differenceInCalendarDays } from "date-fns";
import { weeklyWorkoutStats } from "@/app/_helper/helperWeeklyStats";
import useWeeklyChallenge from "@/app/hooks/useWeeklyChallenge";
import CircularProgressBar from "@/app/_components/CircularProgressBar";

function SuggestedChallengeCard({ weeklyWorkouts = [] }) {
  const workoutStats = weeklyWorkoutStats(weeklyWorkouts);
  const { challenge, loading, error } = useWeeklyChallenge(workoutStats);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="italic text-gray-400">Loading challenge...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="font-semibold text-red-500">Failed to load challenge.</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center h-48 italic text-gray-500">
        No Weekly Challenge available
      </div>
    );
  }

  const {
    description,
    progressCount = 0,
    targetCount = 5,
    status,
    category,
    weekEndDate,
  } = challenge;

  const percent = Math.min((progressCount / targetCount) * 100, 100);
  const today = new Date();
  const weekEnd = weekEndDate ? new Date(weekEndDate) : null;

  const daysRemaining = weekEnd
    ? Math.max(differenceInCalendarDays(weekEnd, today), 0)
    : null;

  return (
    <div className="relative w-full p-6 mx-auto overflow-hidden shadow-lg sm:p-8 bg-gradient-to-br from-orange-200 via-yellow-100 to-yellow-50 rounded-xl">
      {/* Decorative blur circles */}
      <div className="absolute w-32 h-32 bg-orange-300 rounded-full -top-6 -left-6 opacity-20 blur-3xl"></div>
      <div className="absolute w-32 h-32 bg-yellow-300 rounded-full -bottom-6 -right-6 opacity-20 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-2 text-center">
        <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl drop-shadow-sm">
          Weekly Challenge
        </h3>

        <p className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-[280px] mx-auto">
          {description || "Complete 5 workouts this week 💪🔥"}
        </p>

        <div className="flex flex-col gap-2 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-center sm:text-base">
          <div>
            <span className="font-semibold">{progressCount}</span> /{" "}
            <span className="font-semibold">{targetCount}</span>{" "}
            <span className="capitalize">{category || "workout"}</span>
          </div>

          <div
            className={`font-semibold ${
              status === "completed" ? "text-green-600" : "text-orange-600"
            }`}
          >
            {status?.toUpperCase() || "ACTIVE"}
          </div>
        </div>

        {daysRemaining !== null && (
          <p className="mt-1 text-sm text-gray-600">
            {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
          </p>
        )}

        <div className="w-20 h-20 mx-auto md:w-40 md:h-40">
          <CircularProgressBar value={percent} />
        </div>
      </div>
    </div>
  );
}

export default SuggestedChallengeCard;
