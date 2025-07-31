import { loadAnalyticsData } from "@/lib/loadAnalyticsData";
import PremiumPromo from "@/app/_components/PremiumPromo";
import TitleCard from "@/app/_components/TitleCard";
import TodayCard from "@/app/_components/TodayCard";
import WeeklyStatCards from "@/app/(site)/analytics/_components/WeeklyStatCards";
import FinishedWorkoutCard from "@/app/_components/FinishedWorkoutCard";
import NoWorkoutFound from "@/app/_components/NoWorkoutFound";
import PersonalRecordsCard from "@/app/(site)/analytics/_components/PersonalRecordsCard";
import TodayWorkoutCard from "@/app/_components/TodayWorkoutCard";
import CategoryPieChart from "@/app/(site)/analytics/_components/CategoryPieChart";
import HeatCalendar from "@/app/_components/HeatCalendar";
import MonthSelect from "@/app/(site)/analytics/_components/MonthSelect";
import TopExercises from "@/app/(site)/analytics/_components/TopExercises";
import WorkoutBarChart from "@/app/(site)/analytics/_components/WorkoutBarChart";
import { auth } from "@/utils/supabase/auth";

async function page({ searchParams }) {
  const session = await auth();
  const params = await searchParams;
  const date = params?.date || "all";

  const {
    workouts,
    prRecords,
    lifetimeStats,
    monthlyStats,
    exerciseCatalog,
    exerciseType,
  } = await loadAnalyticsData(date, session.user.user_id);

  const sortedFinishedWorkouts = workouts
    .filter((workout) => {
      const isCompleted = workout.completed === true;
      const matchesDate = date === "all" || workout.date.startsWith(date);
      return isCompleted && matchesDate;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const sortedPlannedWorkouts = workouts
    .filter((workout) => {
      const isCompleted = workout.completed === false;
      const matchesDate = date === "all" || workout.date.startsWith(date);
      return isCompleted && matchesDate;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const statsToShow = date === "all" ? lifetimeStats : monthlyStats;

  return (
    <div className="flex flex-col overflow-hidden text-gray-900 lg:flex-row bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Main Content */}
      <section className="flex-grow w-full p-4 space-y-4 overflow-y-auto lg:w-7/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
          <TitleCard
            title="Analytics"
            quote="Track your progress, personal records, and workout trends—all in one place. 🏋️‍♂️🔥"
          />
          <MonthSelect workouts={workouts} />
        </div>

        {sortedFinishedWorkouts.length > 0 ||
        sortedPlannedWorkouts.length > 0 ? (
          <WeeklyStatCards workouts={workouts} />
        ) : null}

        <div className="flex flex-col gap-4 lg:flex-row">
          {sortedFinishedWorkouts.length > 0 ||
          sortedPlannedWorkouts.length > 0 ? (
            <>
              <div className="w-full space-y-4 lg:w-1/2">
                <CategoryPieChart statsToShow={statsToShow} />
                <PersonalRecordsCard prRecords={prRecords} />
              </div>
              <div className="w-full space-y-4 lg:w-1/2">
                <TopExercises statsToShow={statsToShow} />
                <WorkoutBarChart workouts={workouts} />
              </div>
            </>
          ) : (
            <NoWorkoutFound />
          )}
        </div>

        {(sortedFinishedWorkouts.length > 0 ||
          sortedPlannedWorkouts.length > 0) && (
          <div id="planned-section" className="space-y-4">
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
          </div>
        )}
      </section>

      {/* Right Sidebar */}
      <aside className="flex-shrink-0 w-full p-4 space-y-4 border-t border-gray-200 lg:w-3/10 lg:border-t-0 lg:border-l dark:border-gray-700">
        <TodayCard date="Wed, Oct 19" />
        <HeatCalendar workouts={workouts} />
        <PremiumPromo />
      </aside>
    </div>
  );
}

export default page;
