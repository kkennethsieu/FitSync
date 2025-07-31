import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function loadCatalogPageData() {
  const supabase = await createServerSupabaseClient();

  const [
    { data: exerciseCatalog, error },
    { data: exerciseType, error: typeError },
  ] = await Promise.all([
    supabase.from("exercise_catalog").select("*"),
    supabase.from("exerciseType").select("name"),
  ]);

  if (error || typeError) {
    console.error("Error loading data:", error);
  }

  return { exerciseCatalog, exerciseType };
}
