import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";
import OpenAI from "openai";
import { getCurrentWeekRange } from "@/app/_helper/helper";

// Use mock if NODE_ENV is development or no OPENAI_API_KEY set
const useMock =
  process.env.NODE_ENV === "development" || !process.env.OPENAI_API_KEY;

// Initialize OpenAI client only if not mocking
const openai = !useMock
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request) {
  try {
    const body = await request.json();
    const workoutStats = body.workoutStats;

    const { monday, sunday } = getCurrentWeekRange();

    // Check if a challenge already exists for this week
    const { data: existingChallenges, error: fetchError } = await supabase
      .from("weekly_challenges")
      .select("*")
      .gte("weekStartDate", monday.toISOString())
      .lte("weekEndDate", sunday.toISOString())
      .limit(1);

    if (fetchError) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (existingChallenges && existingChallenges.length > 0) {
      // Return existing active challenge for the week
      return NextResponse.json({ challenge: existingChallenges[0] });
    }

    // Compose prompt for AI
    const prompt =
      workoutStats && Object.keys(workoutStats).length > 0
        ? `Based on this user workout data last week: ${JSON.stringify(
            workoutStats
          )}, suggest a motivating weekly challenge focusing on strength training, cardio, stretching/flexibility, plyometrics, mobility, or HIIT. Return the response in JSON format with keys: description (string), targetCount (int), category (string).`
        : `Suggest a random motivating weekly challenge focusing on strength training, cardio, stretching/flexibility, plyometrics, mobility, or HIIT. Return the response in JSON format with keys: description (string), targetCount (int), category (string).`;

    let rawResponse;

    if (openai) {
      // Call real OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 100,
      });
      rawResponse = response.choices[0].message.content;
    } else {
      // Mocked AI response
      rawResponse = JSON.stringify({
        description: "Complete 4 HIIT sessions this week to build endurance!",
        targetCount: 4,
        category: "HIIT",
      });
    }

    // Parse AI response JSON
    let challengeObj;
    try {
      challengeObj = JSON.parse(rawResponse);
    } catch (err) {
      console.error("Failed to parse JSON from AI response:", err);
      return NextResponse.json(
        { error: "Invalid response from AI" },
        { status: 500 }
      );
    }

    // Insert new challenge into database
    const { data, error: insertError } = await supabase
      .from("weekly_challenges")
      .insert({
        description: challengeObj.description,
        targetCount: challengeObj.targetCount,
        category: challengeObj.category,
        weekStartDate: monday.toISOString().split("T")[0], // format YYYY-MM-DD
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
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
