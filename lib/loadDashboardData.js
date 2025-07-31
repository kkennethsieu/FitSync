import { createServerSupabaseClient } from "@/utils/supabase/server";
export async function loadDashboardData(user_id) {
  const supabase = await createServerSupabaseClient();

  const [
    { data: exerciseCatalog, error },
    { data: exerciseType, error: typeError },
    { data: workouts, error: workoutError },
  ] = await Promise.all([
    supabase.from("exercise_catalog").select("*"),
    supabase.from("exerciseType").select("name"),
    supabase
      .from("workouts")
      .select(
        `
        *,
        exercise_catalog (
          image_url,
          category
        )
      `
      )
      .eq("user_id", user_id),
  ]);

  if (error || typeError || workoutError) {
    console.error("Error loading data:", workoutError, error, typeError);
  }

  return { workouts, exerciseCatalog, exerciseType };
}
