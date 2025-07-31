"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoWorkoutFound from "@/app/_components/NoWorkoutFound";

const COLORS = [
  "#F97316", // orange
  "#60A5FA", // blue
  "#34D399", // green
  "#FBBF24", // yellow
  "#A78BFA", // purple
  "#F87171", // red
  "#38BDF8", // sky
  "#C084FC", // violet
];

function CategoryPieChart({ statsToShow }) {
  const filteredData = statsToShow?.filter((d) => d.sessions_logged > 0) || [];

  return (
    <Card className="max-w-3xl p-6 mx-auto space-y-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-orange-600 dark:text-orange-400">
          Workout Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-72">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="sessions_logged"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {filteredData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937", // Tailwind dark:bg-gray-800
                  borderColor: "#4b5563", // Tailwind dark:border-gray-600
                  color: "#f9fafb", // Tailwind text-gray-50
                }}
                itemStyle={{ color: "#f9fafb" }}
                wrapperStyle={{ zIndex: 10 }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <NoWorkoutFound />
        )}
      </CardContent>
    </Card>
  );
}

export default CategoryPieChart;
