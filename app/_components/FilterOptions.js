"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilter } from "../_context/FilterContext";

function FilterOptions({ exercise }) {
  const { filters, selectCategory } = useFilter();
  const isSelected = filters.category === exercise.name;

  return (
    <Label key={exercise.id} className="flex items-center gap-2 cursor-pointer">
      <Checkbox
        id={exercise.id}
        checked={isSelected}
        onCheckedChange={() => selectCategory(exercise.name)}
      />
      {exercise.name}
    </Label>
  );
}

export default FilterOptions;
