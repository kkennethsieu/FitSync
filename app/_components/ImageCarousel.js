"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecommendedWorkout from "./RecommenedWorkout";

export default function ImageCarousel({ exerciseCatalog = [] }) {
  return (
    <div className="relative w-full mx-auto">
      <Carousel opts={{ loop: true }} className="rounded-lg">
        <CarouselContent className="gap-x-4">
          {exerciseCatalog.map((workout) => (
            <CarouselItem
              key={workout.id}
              className="flex items-center justify-center basis-1/4"
            >
              <RecommendedWorkout workout={workout} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute p-2 text-white -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full left-2 top-1/2 hover:bg-opacity-80">
          &#8592;
        </CarouselPrevious>

        <CarouselNext className="absolute p-2 text-white -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full right-2 top-1/2 hover:bg-opacity-80">
          &#8594;
        </CarouselNext>
      </Carousel>
    </div>
  );
}
