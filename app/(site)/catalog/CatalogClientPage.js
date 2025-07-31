"use client";

import SportsFilter from "@/app/(site)/catalog/_components/SportsFilter";
import LevelFilter from "@/app/(site)/catalog/_components/LevelFilter";
import CatalogList from "@/app/(site)/catalog/_components/CatalogList";
import CatalogSearch from "@/app/(site)/catalog/_components/CatalogSearch";
import { useSearchParams } from "next/navigation";

export default function CatalogClientPage({ exerciseCatalog, exerciseType }) {
  const searchParams = useSearchParams();

  const selectedSport = searchParams.get("sport");
  const selectedLevel = searchParams.get("level");
  const searchQuery = (searchParams.get("search") || "").toLowerCase();
  const currentPage = Number(searchParams.get("page") || 1);

  const filteredCatalog = exerciseCatalog
    .filter((item) => (selectedSport ? item.category === selectedSport : true))
    .filter((item) =>
      selectedLevel ? item.difficulty === selectedLevel : true
    )
    .filter((item) =>
      searchQuery ? item.name.toLowerCase().includes(searchQuery) : true
    );

  return (
    <div className="max-w-[1450px] py-10 mx-auto space-y-4">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Exercise Catalog</h3>
        <p>
          Workout catalog is your personal hub to view, plan, and track all your
          workouts—organized to help you stay motivated and reach your fitness
          goals
        </p>
      </div>

      <div className="flex gap-6">
        <div className="w-[30%] space-y-2 hidden md:block">
          <CatalogSearch />
          <SportsFilter />
          <LevelFilter />
        </div>

        <div className="w-full space-y-4">
          <CatalogList
            currentPage={currentPage}
            exerciseCatalog={filteredCatalog}
            exerciseType={exerciseType}
          />
        </div>
      </div>
    </div>
  );
}
