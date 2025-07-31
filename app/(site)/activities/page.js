// app/activities/page.js
import { loadActivityPageData } from "@/lib/loadActivityPageData";
import AnalyticsClientPage from "./ActivitiesClientPage";
import { redirect } from "next/navigation";
import { FilterProvider } from "@/app/_context/FilterContext";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { auth } from "@/utils/supabase/auth";

// ✅ This is a SERVER COMPONENT
export default async function Page({ searchParams }) {
  const session = await auth();
  const resolvedSearchParams = await searchParams;
  const date = resolvedSearchParams?.date;

  if (!date) {
    const today = new Date().toLocaleDateString("en-CA");
    redirect(`/activities?date=${today}`);
  }

  const { exerciseCatalog, exerciseType, workouts } =
    await loadActivityPageData(session.user.user_id);

  return (
    <FilterProvider>
      <AnalyticsClientPage
        exerciseCatalog={exerciseCatalog}
        exerciseType={exerciseType}
        workouts={workouts}
      />
    </FilterProvider>
  );
}
