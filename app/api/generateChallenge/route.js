import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import OpenAI from "openai";
import { getCurrentWeekRange } from "@/app/_helper/helper";

const useMock = process.env.NODE_ENV === "development"; // or set a custom flag
const openai =
  !useMock && process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export async function POST(request) {
  const body = await request.json();
  const workoutStats = body.workoutStats;

  const { monday, sunday } = getCurrentWeekRange();

  // Check for existing active challenge this week
  const { data: existingChallenges, error } = await supabase
    .from("weekly_challenges")
    .select("*")
    .gte("weekStartDate", monday.toISOString())
    .lte("weekEndDate", sunday.toISOString())
    .limit(1);

  if (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (existingChallenges.length > 0) {
    return NextResponse.json({ challenge: existingChallenges[0] });
  }

  // Create prompt
  const prompt =
    workoutStats && Object.keys(workoutStats).length > 0
      ? `Based on this user workout data last week: ${JSON.stringify(
          workoutStats
        )}, suggest a motivating weekly challenge focusing on strength training, cardio, stretching/flexibility, plyometrics, mobility, or HIIT. Return the response in JSON format with keys: description (string), targetCount (int), category (string).`
      : `Suggest a random motivating weekly challenge focusing on strength training, cardio, stretching/flexibility, plyometrics, mobility, or HIIT. Return the response in JSON format with keys: description (string), targetCount (int), category (string).`;

  let raw;
  if (openai) {
    // Use real OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });
    raw = response.choices[0].message.content;
  } else {
    // Use mock response if no API key
    raw = JSON.stringify({
      description: "Complete 4 HIIT sessions this week to build endurance!",
      targetCount: 4,
      category: "HIIT",
    });
  }

  let challengeObj;

  try {
    challengeObj = JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return NextResponse.json(
      { error: "Invalid response from AI" },
      { status: 500 }
    );
  }

  // Save to DB
  const { data, error: insertError } = await supabase
    .from("weekly_challenges")
    .insert({
      description: challengeObj.description,
      targetCount: challengeObj.targetCount,
      category: challengeObj.category,
      weekStartDate: monday.toISOString().split("T")[0], // "YYYY-MM-DD"
      weekEndDate: sunday.toISOString().split("T")[0],
      progressCount: 0,
      status: "active",
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to save challenge" },
      { status: 500 }
    );
  }

  return NextResponse.json({ challenge: data });
}
