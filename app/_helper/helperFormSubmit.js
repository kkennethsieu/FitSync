export function parseTimeToSeconds(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return null;

  const parts = timeStr.split(":").map(Number);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  } else if (parts.length === 1) {
    return parts[0];
  }

  return null;
}

export async function updatePRAfterWorkout(supabase, savedWorkout, user_id) {
  // Extract max weight from sets
  const maxWeight = savedWorkout.sets
    ?.map((set) => Number(set.weight))
    .filter((w) => !isNaN(w) && w > 0)
    .reduce((max, w) => (w > max ? w : max), 0);

  // Extract max reps from sets
  const maxReps = savedWorkout.sets
    ?.map((set) => Number(set.reps))
    .filter((r) => !isNaN(r) && r > 0)
    .reduce((max, r) => (r > max ? r : max), 0);

  // Example cardio fields — adjust as per your data shape

  const cardioTime = savedWorkout.sets
    ?.map((set) => {
      if (typeof set.time === "string") {
        return parseTimeToSeconds(set.time);
      }
      return typeof set.time === "number" ? set.time : null;
    })
    .filter((t) => t !== null && !isNaN(t) && t > 0)
    .reduce((min, t) => (t < min ? t : min), Infinity);

  const validCardioTime = isFinite(cardioTime) ? cardioTime : null;

  // Extract max cardio distance from sets
  const cardioDistance = savedWorkout.sets
    ?.map((set) => Number(set.distance))
    .filter((d) => !isNaN(d) && d > 0)
    .reduce((max, d) => (d > max ? d : max), 0);

  // Helper to update or insert a PR record
  async function upsertPR(metric, value) {
    if (!value) return; // skip if no value

    // Find current PR
    const { data: prData, error: prError } = await supabase
      .from("pr_records")
      .select("*")
      .eq("name", savedWorkout.name)
      .eq("metric", metric)
      .maybeSingle();

    if (prError && prError.code !== "PGRST116") {
      console.error("Error fetching PR:", prError);
      return;
    }

    // Decide if new value beats existing PR
    // Customize comparison per metric:
    // For weight and reps, higher is better
    // For time, lower is better
    const higherIsBetter = metric !== "best_time";

    const currentValue = prData?.value;

    const isNewPR =
      currentValue === undefined
        ? true
        : higherIsBetter
        ? value > currentValue
        : value < currentValue;

    if (isNewPR) {
      if (prData) {
        await supabase
          .from("pr_records")
          .update({
            value,
            date_achieved: savedWorkout.date,
          })
          .eq("id", prData.id);
      } else {
        await supabase.from("pr_records").insert({
          user_id,
          name: savedWorkout.name,
          category: savedWorkout.category,
          metric,
          value,
          date_achieved: savedWorkout.date,
        });
      }
    }
  }

  // Update all relevant PRs
  await upsertPR("max_weight", maxWeight);
  await upsertPR("max_reps", maxReps);
  if (validCardioTime !== null) await upsertPR("best_time", validCardioTime);
  if (cardioDistance > 0) await upsertPR("max_distance", cardioDistance);
}

export async function updateLifetimeStatsAfterWorkout(
  supabase,
  savedWorkout,
  user_id
) {
  const { name, category, date, sets } = savedWorkout;

  const totalReps =
    sets
      ?.map((set) => Number(set.reps))
      .filter((r) => !isNaN(r) && r > 0)
      .reduce((sum, r) => sum + r, 0) || 0;

  const totalWeight =
    sets
      ?.map((set) => {
        const w = Number(set.weight);
        const r = Number(set.reps);
        return !isNaN(w) && !isNaN(r) && w > 0 && r > 0 ? w * r : 0;
      })
      .reduce((sum, w) => sum + w, 0) || 0;

  const totalDistance =
    sets
      ?.map((set) => Number(set.distance))
      .filter((d) => !isNaN(d) && d > 0)
      .reduce((sum, d) => sum + d, 0) || 0;

  const totalTime =
    sets
      ?.map((set) => {
        if (typeof set.time === "string") {
          return parseTimeToSeconds(set.time);
        }
        return typeof set.time === "number" ? set.time : 0;
      })
      .filter((t) => !isNaN(t) && t > 0)
      .reduce((sum, t) => sum + t, 0) || 0;

  // Fetch existing stats by name
  const { data: existing, error } = await supabase
    .from("lifetime_stats")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching lifetime stats:", error);
    return;
  }

  if (existing) {
    await supabase
      .from("lifetime_stats")
      .update({
        total_reps: existing.total_reps + totalReps,
        total_weight: existing.total_weight + totalWeight,
        total_distance: existing.total_distance + totalDistance,
        total_time: existing.total_time + totalTime,
        sessions_logged: existing.sessions_logged + 1,
        last_performed: date,
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("lifetime_stats").insert({
      user_id,
      name,
      category,
      total_reps: totalReps,
      total_weight: totalWeight,
      total_distance: totalDistance,
      total_time: totalTime,
      sessions_logged: 1,
      last_performed: date,
    });
  }
}

import { format } from "date-fns"; // for formatting date to YYYY-MM

export async function updateMonthlyStatsAfterWorkout(
  supabase,
  savedWorkout,
  user_id
) {
  const { name, category, date, sets } = savedWorkout;

  // Format the date to "YYYY-MM" for grouping by month
  const year_month = format(new Date(date), "yyyy-MM");

  const totalReps =
    sets
      ?.map((set) => Number(set.reps))
      .filter((r) => !isNaN(r) && r > 0)
      .reduce((sum, r) => sum + r, 0) || 0;

  const totalWeight =
    sets
      ?.map((set) => {
        const w = Number(set.weight);
        const r = Number(set.reps);
        return !isNaN(w) && !isNaN(r) && w > 0 && r > 0 ? w * r : 0;
      })
      .reduce((sum, w) => sum + w, 0) || 0;

  const totalDistance =
    sets
      ?.map((set) => Number(set.distance))
      .filter((d) => !isNaN(d) && d > 0)
      .reduce((sum, d) => sum + d, 0) || 0;

  const totalTime =
    sets
      ?.map((set) => {
        if (typeof set.time === "string") {
          return parseTimeToSeconds(set.time);
        }
        return typeof set.time === "number" ? set.time : 0;
      })
      .filter((t) => !isNaN(t) && t > 0)
      .reduce((sum, t) => sum + t, 0) || 0;

  // Check for existing monthly stats row
  const { data: existing, error } = await supabase
    .from("monthly_stats")
    .select("*")
    .eq("name", name)
    .eq("year_month", year_month)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching monthly stats:", error);
    return;
  }

  if (existing) {
    // Update existing record with increments
    await supabase
      .from("monthly_stats")
      .update({
        total_reps: existing.total_reps + totalReps,
        total_weight: existing.total_weight + totalWeight,
        total_distance: existing.total_distance + totalDistance,
        total_time: existing.total_time + totalTime,
        sessions_logged: existing.sessions_logged + 1,
        last_performed: date,
      })
      .eq("id", existing.id);
  } else {
    // Insert new monthly record
    await supabase.from("monthly_stats").insert({
      user_id,
      name,
      category,
      year_month,
      total_reps: totalReps,
      total_weight: totalWeight,
      total_distance: totalDistance,
      total_time: totalTime,
      sessions_logged: 1,
      last_performed: date,
    });
  }
}
