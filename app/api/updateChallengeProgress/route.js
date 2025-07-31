// app/api/updateChallengeProgress/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import { getCurrentWeekRange } from "@/app/_helper/helper";

export async function POST(request) {
  //   const { userId, workoutCategory } = await request.json();
  const { workoutCategory } = await request.json();

  if (!workoutCategory) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  //   if (!userId || !workoutCategory) {
  //     return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  //   }

  const { monday, sunday } = getCurrentWeekRange();

  // Get active challenge
  const { data: challenge, error } = await supabase
    .from("weekly_challenges")
    .select("*")
    // .eq("userId", userId)
    .eq("status", "active")
    .gte("weekStartDate", monday.toISOString())
    .lte("weekEndDate", sunday.toISOString())
    .limit(1)
    .single();

  if (error || !challenge) {
    return NextResponse.json(
      { error: "No active challenge found" },
      { status: 404 }
    );
  }

  // Only increment progress if workoutCategory matches challenge.category
  if (challenge.category !== workoutCategory) {
    return NextResponse.json({
      message: "Workout category does not match challenge",
    });
  }

  const newProgressCount = challenge.progressCount + 1;
  let newStatus = challenge.status;

  if (newProgressCount >= challenge.targetCount) {
    newStatus = "completed";
  }

  const { data, updateError } = await supabase
    .from("weekly_challenges")
    .update({ progressCount: newProgressCount, status: newStatus })
    .eq("id", challenge.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json(
      { error: "Failed to update challenge" },
      { status: 500 }
    );
  }

  return NextResponse.json({ challenge: data });
}
