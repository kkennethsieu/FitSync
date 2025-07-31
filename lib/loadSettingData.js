import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function loadSettingData(user_id) {
  const supabase = await createServerSupabaseClient();

  const { data: settings, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error("Error loading settings:", error.message);
    return { settings: null };
  }

  return { settings: settings?.[0] ?? null };
}
