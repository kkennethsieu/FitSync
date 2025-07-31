import { createServerSupabaseClient } from "@/utils/supabase/server";
import { format } from "date-fns";

export async function loadAnalyticsData(targetMonth, user_id) {
  const supabase = await createServerSupabaseClient();
  // Format month as 'YYYY-MM', default to current month if not passed
  const year_month = targetMonth || format(new Date(), "yyyy-MM");

  const [
    { data: exerciseCatalog, error },
    { data: exerciseType, error: typeError },
    { data: workouts, error: workoutError },
    { data: prRecords, error: prError },
    { data: lifetimeStats, error: lifetimeError },
    { data: monthlyStats, error: monthlyError },
  ] = await Promise.all([
    supabase.from("exercise_catalog").select("name, category, image_url"),
    supabase.from("exerciseType").select("name"),
    supabase.from("workouts").select("*").eq("user_id", user_id),
    supabase
      .from("pr_records")
      .select(
        `
        *,
        exercise_catalog (
          image_url,
          category
        )
      `
      )
      .eq("user_id", user_id)
      .order("date_achieved", { ascending: false }) // most recent first
      .limit(4),
    supabase
      .from("lifetime_stats")
      .select(
        `
        *,
        exercise_catalog (
          image_url,
          category
        )
      `
      )
      .eq("user_id", user_id)
      .order("sessions_logged", { ascending: false })
      .limit(3),
    supabase
      .from("monthly_stats")
      .select(
        `
        *,
        exercise_catalog (
          image_url,
          category
        )
      `
      )
      .eq("user_id", user_id)
      .eq("year_month", year_month)
      .order("sessions_logged", { ascending: false })
      .limit(3),
  ]);

  if (
    error ||
    typeError ||
    workoutError ||
    prError ||
    lifetimeError ||
    monthlyError
  ) {
    console.error(
      "Error loading data:",
      error ||
        typeError ||
        workoutError ||
        prError ||
        lifetimeError ||
        monthlyError
    );
  }

  return {
    exerciseCatalog,
    exerciseType,
    workouts,
    prRecords,
    lifetimeStats,
    monthlyStats,
  };
}
