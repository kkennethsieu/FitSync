import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function GoalSelect({ settings, onChange }) {
  const { primaryGoal, targetWorkouts, favCategory, favExercise, targetGoals } =
    settings || {};

  const fitnessGoals = [
    "Lose Weight",
    "Build Muscle",
    "Improve Endurance",
    "Increase Flexibility",
    "General Fitness",
  ];
  const workoutFrequency = [
    "1-2 times per week",
    "3-4 times per week",
    "5-6 times per week",
    "Everyday",
  ];
  const exerciseCategories = [
    "Strength Training",
    "Cardio",
    "Yoga",
    "Pilates",
    "CrossFit",
    "HIIT",
  ];
  const exercises = [
    "Squat",
    "Bench Press",
    "Deadlift",
    "Running",
    "Cycling",
    "Yoga Stretch",
  ];
  const goalTargets = [
    "Lose 5 lbs",
    "Gain 5 lbs Muscle",
    "Run 5K",
    "Increase Flexibility",
    "Complete 10 Workouts",
  ];

  return (
    <>
      <div>
        <Label htmlFor="primary-goal">Primary Fitness Goal</Label>
        <Select
          value={primaryGoal || ""}
          onValueChange={(value) => onChange("primaryGoal", value)}
        >
          <SelectTrigger id="primary-goal" className="w-full">
            <SelectValue placeholder="Select primary fitness goal" />
          </SelectTrigger>
          <SelectContent>
            {fitnessGoals.map((goal) => (
              <SelectItem key={goal} value={goal}>
                {goal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Target workouts per week */}
      <div>
        <Label htmlFor="target-workouts">Target Workouts Per Week</Label>
        <Select
          value={targetWorkouts || ""}
          onValueChange={(value) => onChange("targetWorkouts", value)}
        >
          <SelectTrigger id="target-workouts" className="w-full">
            <SelectValue placeholder="Select target workouts" />
          </SelectTrigger>
          <SelectContent>
            {workoutFrequency.map((freq) => (
              <SelectItem key={freq} value={freq}>
                {freq}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Favorite exercise category */}
      <div>
        <Label htmlFor="fav-category">Favorite Exercise Category</Label>
        <Select
          value={favCategory || ""}
          onValueChange={(value) => onChange("favCategory", value)}
        >
          <SelectTrigger id="fav-category" className="w-full">
            <SelectValue placeholder="Select favorite exercise category" />
          </SelectTrigger>
          <SelectContent>
            {exerciseCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Favorite exercise */}
      <div>
        <Label htmlFor="fav-exercise">Favorite Exercise</Label>
        <Select
          value={favExercise || ""}
          onValueChange={(value) => onChange("favExercise", value)}
        >
          <SelectTrigger id="fav-exercise" className="w-full">
            <SelectValue placeholder="Select favorite exercise" />
          </SelectTrigger>
          <SelectContent>
            {exercises.map((ex) => (
              <SelectItem key={ex} value={ex}>
                {ex}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Target goals */}
      <div>
        <Label htmlFor="target-goals">Target Goals</Label>
        <Select
          value={targetGoals || ""}
          onValueChange={(value) => onChange("targetGoals", value)}
        >
          <SelectTrigger id="target-goals" className="w-full">
            <SelectValue placeholder="Select target goals" />
          </SelectTrigger>
          <SelectContent>
            {goalTargets.map((goal) => (
              <SelectItem key={goal} value={goal}>
                {goal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default GoalSelect;
