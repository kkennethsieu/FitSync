import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ExerciseTypeSelect({
  exerciseType = [],
  selectedType,
  setSelectedType,
  setSelectedExercise,
  setExerciseInputValue,
  workout,
}) {
  const handleTypeChange = (value) => {
    setSelectedType(value);
    setSelectedExercise(null);
    setExerciseInputValue("");
  };

  const isEditing = !!workout;

  return (
    <div className="grid gap-3">
      <Label htmlFor="exercise-type">Exercise Type</Label>
      {isEditing ? (
        <Input value={selectedType || ""} disabled />
      ) : (
        <Select value={selectedType ?? ""} onValueChange={handleTypeChange}>
          <SelectTrigger id="exercise-type" className="w-full">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {exerciseType?.length > 0 ? (
              exerciseType.map((type) => (
                <SelectItem key={type.name} value={type.name}>
                  {type.name}
                </SelectItem>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                No Types Available
              </div>
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
