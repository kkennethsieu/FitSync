import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function loadActivityPageData(user_id) {
  const supabase = await createServerSupabaseClient();
  const [
    { data: exerciseCatalog, error },
    { data: exerciseType, error: typeError },
    { data: workouts, error: workoutError },
  ] = await Promise.all([
    supabase.from("exercise_catalog").select("name, category, image_url"),
    supabase.from("exerciseType").select("name"),
    supabase.from("workouts").select("*").eq("user_id", user_id),
  ]);

  if (error || typeError || workoutError) {
    console.error("Error loading data:", error || typeError || workoutError);
  }

  return { exerciseCatalog, exerciseType, workouts };
}
