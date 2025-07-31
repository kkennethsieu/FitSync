export function countWorkoutsFromFiltered(workouts, sessionGapMinutes = 60) {
  const GAP_MS = sessionGapMinutes * 60 * 1000;

  // Sort by date and time ascending
  workouts.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });

  let workoutCount = 0;
  let lastDate = null;
  let lastTimestamp = null;

  for (const workout of workouts) {
    const currentTime = new Date(
      `${workout.date}T${workout.time}:00`
    ).getTime();

    if (
      lastDate !== workout.date ||
      lastTimestamp === null ||
      currentTime - lastTimestamp > GAP_MS
    ) {
      workoutCount++;
    }

    lastDate = workout.date;
    lastTimestamp = currentTime;
  }

  return workoutCount;
}
