import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ExerciseTypeSelect from "@/app/_components/workoutForm/ExerciseTypeSelect";
import ExerciseSelector from "@/app/_components/workoutForm/ExerciseSelector";
import SetInputs from "@/app/_components/workoutForm/SetInputs";

export default function WorkoutForm({
  exerciseCatalog = [],
  exerciseType,
  selectedType,
  setSelectedType,
  selectedExercise,
  setSelectedExercise,
  sets,
  setSets,
  completed,
  setCompleted,
  exerciseInputValue,
  setExerciseInputValue,
  date,
  setDate,
  time,
  setTime,
  workout,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Date */}
      <div className="grid gap-3">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Time */}
      <div className="grid gap-3">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          name="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      {/* Exercise Type */}
      <div className="grid col-span-2 gap-3">
        <ExerciseTypeSelect
          workout={workout}
          selectedType={selectedType}
          exerciseType={exerciseType}
          setSelectedType={setSelectedType}
          setSelectedExercise={setSelectedExercise}
          setExerciseInputValue={setExerciseInputValue}
        />
      </div>

      {/* Exercise Name */}
      {selectedType && (
        <div className="grid col-span-2 gap-3">
          <ExerciseSelector
            workout={workout}
            selectedType={selectedType}
            exerciseCatalog={exerciseCatalog}
            filteredExercises={exerciseCatalog.filter(
              (exercise) => exercise.category === selectedType
            )}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
            exerciseInputValue={exerciseInputValue}
            setExerciseInputValue={setExerciseInputValue}
          />
        </div>
      )}

      {/* Sets */}
      <div className="col-span-2">
        <Label>Sets</Label>
        <SetInputs selectedType={selectedType} sets={sets} setSets={setSets} />
      </div>

      {/* Completed */}
      <div className="flex items-center col-span-2 gap-3 mt-2">
        <Label htmlFor="completed">Completed?</Label>
        <input
          id="completed"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-5 h-5 accent-green-600"
        />
      </div>
    </div>
  );
}
