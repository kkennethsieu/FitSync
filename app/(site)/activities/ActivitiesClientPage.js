"use client";
import FinishedWorkoutCard from "@/app/_components/FinishedWorkoutCard";
import PremiumPromo from "@/app/_components/PremiumPromo";
import RecommendedWorkoutsCard from "@/app/_components/RecommendedWorkoutsCard";
import TitleCard from "@/app/_components/TitleCard";
import TodayCard from "@/app/_components/TodayCard";
import ActivityNav from "./_components/ActivityNav";
import TodayWorkoutCard from "@/app/_components/TodayWorkoutCard";
import { useSearchParams } from "next/navigation";
import { useFilter } from "@/app/_context/FilterContext";
import HeatCalendar from "@/app/_components/HeatCalendar";

function ActivitiesClientPage({ exerciseCatalog, exerciseType, workouts }) {
  const searchParams = useSearchParams();
  const currentDate =
    searchParams.get("date") || new Date().toLocaleDateString("en-CA");

  const { filters } = useFilter();

  const sortedFinishedWorkouts = workouts
    .filter((workout) => {
      const isCompleted = workout.completed === true;
      const matchesDate = workout.date.startsWith(currentDate);
      const matchesCategory = filters.category
        ? workout.category === filters.category
        : true;

      return isCompleted && matchesDate && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const sortedPlannedWorkouts = workouts
    .filter((workout) => {
      const isCompleted = workout.completed === false;
      const matchesDate = workout.date.startsWith(currentDate);
      const matchesCategory = filters.category
        ? workout.category === filters.category
        : true;

      return isCompleted && matchesDate && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="flex flex-col h-full min-h-screen text-gray-900 bg-white md:flex-row dark:bg-gray-900 dark:text-gray-100">
      {/* LEFT: scrollable content */}
      <section className="flex flex-col w-full p-4 space-y-6 lg:w-7/10">
        <TitleCard
          title="Track Your Activities"
          quote='Track and log your workouts to monitor your progress and stay motivated every day." 🏋️‍♂️🔥'
        />
        <ActivityNav
          workouts={workouts}
          exerciseType={exerciseType}
          exerciseCatalog={exerciseCatalog}
        />
        <TodayWorkoutCard
          sortedPlannedWorkouts={sortedPlannedWorkouts}
          exerciseType={exerciseType}
          exerciseCatalog={exerciseCatalog}
        />
        <FinishedWorkoutCard
          sortedFinishedWorkouts={sortedFinishedWorkouts}
          exerciseType={exerciseType}
          exerciseCatalog={exerciseCatalog}
        />
        <RecommendedWorkoutsCard />
      </section>

      {/* RIGHT: hide on screens smaller than md */}
      <section className="flex-col flex-grow hidden p-4 space-y-6 lg:flex basis-full lg:basis-3/10 lg:overflow-y-auto">
        <TodayCard />
        <HeatCalendar workouts={workouts} />
        <PremiumPromo />
      </section>
    </div>
  );
}

export default ActivitiesClientPage;
