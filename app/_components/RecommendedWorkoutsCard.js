"use client";

import ImageCarousel from "@/app/_components/ImageCarousel";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import LinkWithProgress from "./LinkWithProgress";

function RecommendedWorkoutsCard() {
  const [exerciseCatalog, setExerciseCatalog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("exercise_catalog")
        .select("*")
        .limit(10);

      if (error) {
        console.error("Error fetching exercise catalog:", error.message);
      } else {
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setExerciseCatalog(shuffled);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading recommended workouts...
      </div>
    );

  return (
    <div className="px-6 py-6 space-y-4 bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg sm:px-8">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Recommended Workouts
        </h5>
        <LinkWithProgress
          href="/catalog"
          className="font-medium text-orange-600 transition hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-500"
        >
          View All
        </LinkWithProgress>
      </div>
      <ImageCarousel exerciseCatalog={exerciseCatalog} />
    </div>
  );
}

export default RecommendedWorkoutsCard;
