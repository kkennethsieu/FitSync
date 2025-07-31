"use client";

import { useEffect, useState } from "react";
import NoWorkoutFound from "@/app/_components/NoWorkoutFound";
import { getWeeksInMonth } from "@/app/_helper/helper";
import { countWorkoutsFromFiltered } from "@/app/_helper/helperWorkoutCount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function WorkoutBarChart({ workouts }) {
  const searchParams = useSearchParams();
  const monthParams = searchParams.get("date");
  const isAllTime = !monthParams || monthParams === "all-time";

  // Track if dark mode is active
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(mediaQuery.matches);

      const handler = (e) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  let weeks = [];
  let filteredWorkouts = [];

  if (isAllTime) {
    const workoutsByYear = {};

    workouts.forEach((w) => {
      if (w.date && w.completed) {
        const year = parseISO(w.date).getFullYear();
        workoutsByYear[year] = (workoutsByYear[year] || 0) + 1;
      }
    });

    weeks = Object.keys(workoutsByYear)
      .map((yearStr) => {
        const year = parseInt(yearStr);
        return {
          label: yearStr,
          start: new Date(year, 0, 1),
          end: new Date(year, 11, 31, 23, 59, 59),
          count: workoutsByYear[year],
        };
      })
      .sort((a, b) => a.start - b.start);

    filteredWorkouts = workouts.filter((w) => w.date && w.completed);
  } else {
    const [year, month] = monthParams.split("-");
    const now = new Date(parseInt(year), parseInt(month) - 1, 1);

    weeks = getWeeksInMonth(now);

    filteredWorkouts = workouts.filter((w) => {
      if (!w.date || !w.completed) return false;
      const workoutDate = parseISO(w.date);
      return (
        workoutDate.getMonth() === now.getMonth() &&
        workoutDate.getFullYear() === now.getFullYear()
      );
    });
  }

  const weeklyCounts = weeks.reduce((acc, { label, start, end }) => {
    const workoutsInRange = filteredWorkouts.filter((w) => {
      const workoutDate = parseISO(w.date);
      return workoutDate >= start && workoutDate <= end;
    });
    acc[label] = countWorkoutsFromFiltered(workoutsInRange);
    return acc;
  }, {});

  const barChartData = weeks.map(({ label }) => ({
    label,
    count: weeklyCounts[label] || 0,
  }));

  return (
    <Card className="w-full max-w-full pb-10 mt-4 bg-white shadow-sm dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-orange-600 dark:text-orange-400">
          {isAllTime ? "Yearly Workout Summary" : "Monthly Workout Summary"}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[400px]">
        {barChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#d1d5db"}
              />
              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 10,
                  fill: isDarkMode ? "#d1d5db" : "#374151",
                }}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis
                allowDecimals={false}
                tick={{
                  fill: isDarkMode ? "#d1d5db" : "#374151",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                  borderColor: isDarkMode ? "#374151" : "#ccc",
                }}
                itemStyle={{
                  color: isDarkMode ? "#f97316" : "#fb923c",
                }}
              />
              <Bar dataKey="count" fill="#fb923c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <NoWorkoutFound />
        )}
      </CardContent>
    </Card>
  );
}
