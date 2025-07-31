export default function WorkoutDetails({ workout }) {
  if (workout.category !== "Cardio") {
    return workout.sets?.length > 0 ? (
      <div className="space-y-1">
        {workout.sets.map(({ reps, weight }, i) => (
          <div key={i}>
            Set {i + 1}: {reps} reps{weight ? `, ${weight} lbs` : ""}
          </div>
        ))}
      </div>
    ) : (
      <span className="italic text-gray-400">Add a set</span>
    );
  }

  if (workout.category === "Cardio") {
    return workout.sets?.length > 0 ? (
      <div className="space-y-1">
        {workout.sets.map(({ time, distance }, i) => (
          <div key={i}>
            Segment {i + 1}:{distance && ` ${distance} miles`}
            {time && `, ${time} min`}
          </div>
        ))}
      </div>
    ) : (
      <span className="italic text-gray-400">Add a run segment</span>
    );
  }

  return null;
}
