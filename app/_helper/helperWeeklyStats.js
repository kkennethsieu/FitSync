import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

export function getWorkoutsThisWeek(workouts, options = { weekStartsOn: 1 }) {
  const now = new Date();
  const weekStart = startOfWeek(now, options);
  const weekEnd = endOfWeek(now, options);

  return workouts
    .filter(({ date }) => {
      if (!date) return false;
      const workoutDate = new Date(date);
      return isWithinInterval(workoutDate, { start: weekStart, end: weekEnd });
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// function calculateProgress(workouts, challenge) {
//   const { weekStartDate, weekEndDate, category, targetCount } = challenge;

//   const completedWorkouts = workouts.filter((w) => {
//     const workoutDate = new Date(w.date);
//     const inWeek =
//       workoutDate >= new Date(weekStartDate) &&
//       workoutDate <= new Date(weekEndDate);
//     const matchesCategory = category === "all" || w.category === category;
//     return w.completed && inWeek && matchesCategory;
//   });

//   const completedCount = completedWorkouts.length;
//   const progressPercent = Math.min((completedCount / targetCount) * 100, 100);

//   return { completedCount, progressPercent };
// }

export function weeklyWorkoutStats(weeklyWorkouts) {
  return weeklyWorkouts.reduce((acc, workout) => {
    if (workout.completed) {
      acc[workout.category] = (acc[workout.category] || 0) + 1;
    }
    return acc;
  }, {});
}

export async function reportWorkoutCompleted(user_id, workoutCategory) {
  const response = await fetch("/api/updateChallengeProgress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, workoutCategory }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error updating challenge:", errorData);
    return null;
  }

  const data = await response.json();
  return data.challenge;
}
