import MotivationalCard from "@/app/_components/MotivationalCard";
import PremiumPromo from "@/app/_components/PremiumPromo";
import RecommendedWorkoutsCard from "@/app/_components/RecommendedWorkoutsCard";
import ScheduledCard from "@/app/_components/ScheduledCard";
import SuggestedChallengeCard from "@/app/_components/SuggestedChallengeCard";
import TitleCard from "@/app/_components/TitleCard";
import TodayCard from "@/app/_components/TodayCard";
import { getWorkoutsThisWeek } from "@/app/_helper/helperWeeklyStats";
import { loadDashboardData } from "@/lib/loadDashboardData";
import { auth } from "@/utils/supabase/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const { workouts, exerciseCatalog, exerciseType } = await loadDashboardData(
    session.user.user_id
  );

  const sortedFinishedWorkouts = workouts
    .filter((workout) => {
      const isCompleted = workout.completed === true;
      return isCompleted;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const sortedPlannedWorkouts = workouts
    .filter((workout) => {
      const isCompleted = workout.completed === false;

      return isCompleted;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const weeklyWorkouts = getWorkoutsThisWeek(workouts);

  return (
    <div className="flex flex-col h-full min-h-screen text-gray-900 bg-white md:flex-row dark:bg-gray-900 dark:text-gray-100">
      {/*  LEFT scrollable section */}
      <section className="flex flex-col flex-grow min-w-0 p-4 space-y-4 basis-full md:basis-7/10">
        <TitleCard
          title={`Weclome Back ${session.user.name.split(" ")[0]}!`}
          quote='"Push yourself, because no one else is going to do it for you." 🏋️‍♂️🔥'
        />
        {/* <WeeklyStatCards /> */}
        <section className="flex flex-col gap-4 md:flex-row">
          <div className="w-full space-y-4 md:w-1/2">
            <SuggestedChallengeCard weeklyWorkouts={weeklyWorkouts} />
            <MotivationalCard
              src="/images/motivation_2.jpg"
              text="Log A Workout"
            />
          </div>
          <div className="w-full space-y-4 md:w-1/2">
            <MotivationalCard
              src="/images/motivation_3.jpg"
              text="Make Gains"
            />
            <ScheduledCard
              title="Recent Workouts"
              data={sortedFinishedWorkouts}
              exerciseCatalog={exerciseCatalog}
              exerciseType={exerciseType}
            />
          </div>
        </section>
        <RecommendedWorkoutsCard />
      </section>
      {/* Right fixed section */}
      <section className="flex-col flex-grow hidden p-4 space-y-4 border-t border-gray-200 lg:flex basis-full lg:basis-3/10 lg:max-h-screen lg:overflow-y-auto dark:border-gray-700 lg:border-t-0 lg:border-l">
        {/* 25% approx */}
        <TodayCard />
        <ScheduledCard title="Planned Workouts" data={sortedPlannedWorkouts} />
        <PremiumPromo />
      </section>
    </div>
  );
}

export default page;
