"use client";

import { useState } from "react";
import NoExercisesFound from "@/app/_components/NoExerciseFound";
import CatalogItem from "./CatalogItem";
import Pagination from "@/app/_components/Pagination";
import ModalCatalog from "@/app/_components/ModalCatalog";
import ModalAddToWorkout from "@/app/_components/workoutForm/ModalAddToWorkout";

const ITEMS_PER_PAGE = 10;

function CatalogList({ exerciseCatalog, exerciseType, listRef, currentPage }) {
  const totalPages = Math.ceil(exerciseCatalog.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = exerciseCatalog.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutExercise, setWorkoutExercise] = useState(null);

  return (
    <div className="space-y-8">
      {/* Catalog items */}
      <div className="space-y-6">
        {currentItems.length === 0 ? (
          <NoExercisesFound message="No exercises match your filters. Try resetting your filters." />
        ) : (
          currentItems.map((item) => (
            <CatalogItem
              key={item.id}
              item={item}
              exerciseType={exerciseType}
              exerciseCatalog={exerciseCatalog}
              onViewExercise={setSelectedExercise}
              onAddWorkout={setWorkoutExercise}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination totalPages={totalPages} scrollTargetRef={listRef} />

      {/* Modals */}
      <ModalCatalog
        open={!!selectedExercise}
        onOpenChange={(open) => {
          if (!open) setSelectedExercise(null);
        }}
        item={selectedExercise}
        imgSrc={
          selectedExercise && selectedExercise.image_url
            ? `${process.env.NEXT_PUBLIC_SUPABASE_IMG_URL}/${selectedExercise.image_url}`
            : "/images/placeholder.jpg"
        }
      />

      <ModalAddToWorkout
        open={!!workoutExercise}
        onOpenChange={(open) => {
          if (!open) setWorkoutExercise(null);
        }}
        item={workoutExercise}
        exerciseCatalog={exerciseCatalog}
        exerciseType={exerciseType}
      />
    </div>
  );
}

export default CatalogList;
