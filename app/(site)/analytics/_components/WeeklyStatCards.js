"use client";
import dayjs from "dayjs";

import liftingIcon from "@/public/images/liftingSess.png";
import cardioIcon from "@/public/images/runningSess.png";
import yogaIcon from "@/public/images/yogaSess.png";
import { useSearchParams } from "next/navigation";
import SummaryCard from "./SummaryCard";
import {
  getLongestStreak,
  getMostFrequentCategory,
} from "@/app/_helper/helper";
import { countWorkoutsFromFiltered } from "@/app/_helper/helperWorkoutCount";

function WeeklyStatCards({ workouts }) {
  const searchParams = useSearchParams();
  const monthParam = searchParams.get("date");
  // If "all-time" or no date param, show all workouts (no filter)
  const isAllTime = !monthParam || monthParam === "all-time";

  const [filterYear, filterMonth] =
    monthParam && !isAllTime ? monthParam.split("-").map(Number) : [null, null]; // no filtering by year/month

  const monthlyWorkouts = isAllTime
    ? workouts.filter((workout) => workout.completed)
    : workouts.filter((workout) => {
        if (!workout.date || !workout.completed) return false;
        const workoutDate = dayjs(workout.date);
        return (
          workoutDate.isValid() &&
          workoutDate.year() === filterYear &&
          workoutDate.month() === filterMonth - 1
        );
      });

  const total = countWorkoutsFromFiltered(monthlyWorkouts) || 0;
  const longestStreak = getLongestStreak(monthlyWorkouts) || 0;
  const mostFrequent = getMostFrequentCategory(monthlyWorkouts);
  return (
    <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        title="Total Workouts"
        value={`${total} Total Workouts`}
        image={liftingIcon}
      />
      <SummaryCard
        title="Longest Workout Streak"
        value={`${longestStreak} Days`}
        image={cardioIcon}
      />
      <SummaryCard
        title="Most Frequent Category"
        value={mostFrequent?.category ? `${mostFrequent.category}` : "—"}
        image={yogaIcon}
      />
    </div>
  );
}

export default WeeklyStatCards;
