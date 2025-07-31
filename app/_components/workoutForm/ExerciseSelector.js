import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function ExerciseSelector({
  filteredExercises,
  selectedExercise,
  setSelectedExercise,
  exerciseInputValue,
  setExerciseInputValue,
  workout,
}) {
  const isEditing = !!workout;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Label>Exercise</Label>
      <div className="relative">
        {isEditing ? (
          <Input value={selectedExercise?.name || ""} disabled />
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              {/* Read-only input: opens dropdown, not editable */}
              <Input
                className="text-left cursor-pointer"
                placeholder="Search exercises..."
                value={selectedExercise?.name || ""}
                readOnly
                onClick={() => setOpen(true)}
              />
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[500px]">
              <Command>
                <CommandInput
                  placeholder="Type to search..."
                  value={exerciseInputValue}
                  onValueChange={setExerciseInputValue}
                />
                <CommandList className="overflow-y-auto max-h-40">
                  {filteredExercises.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      No exercises found.
                    </div>
                  ) : (
                    filteredExercises.map((exercise) => (
                      <CommandItem
                        className="justify-start w-full text-left"
                        key={exercise.name}
                        value={exercise.name}
                        onSelect={() => {
                          setSelectedExercise(exercise);
                          setExerciseInputValue(""); // clear search box
                          setOpen(false);
                        }}
                      >
                        {exercise.name}
                      </CommandItem>
                    ))
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
}
