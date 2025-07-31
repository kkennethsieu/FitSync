"use client";
import NoActivity from "@/app/_components/NoActivity";
import WorkoutTable from "@/app/_components/WorkoutTable";

function TodayWorkoutCard({
  sortedPlannedWorkouts,
  exerciseType,
  exerciseCatalog,
}) {
  const strengthData = sortedPlannedWorkouts.filter(
    (item) => item.category === "Strength Training" && item.completed === false
  );
  const cardioData = sortedPlannedWorkouts.filter(
    (item) => item.category === "Cardio" && item.completed === false
  );
  const flexibilityData = sortedPlannedWorkouts.filter(
    (item) =>
      item.category === "Stretching/Flexibility" && item.completed === false
  );
  const mobilityData = sortedPlannedWorkouts.filter(
    (item) => item.category === "Mobility" && item.completed === false
  );
  const plyometricsData = sortedPlannedWorkouts.filter(
    (item) => item.category === "Plyometrics" && item.completed === false
  );
  const hiitData = sortedPlannedWorkouts.filter(
    (item) => item.category === "HIIT" && item.completed === false
  );

  const noWorkoutsPlanned =
    strengthData.length === 0 &&
    cardioData.length === 0 &&
    flexibilityData.length === 0 &&
    mobilityData.length === 0 &&
    plyometricsData.length === 0 &&
    hiitData.length === 0;

  const sections = [
    { label: "Strength Training", data: strengthData },
    { label: "Cardio", data: cardioData },
    { label: "Flexibility", data: flexibilityData },
    { label: "Mobility", data: mobilityData },
    { label: "Plyometrics", data: plyometricsData },
    { label: "HIIT", data: hiitData },
  ];

  return (
    <div className="px-4 py-6 mb-5 space-y-6 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h5 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Planned Workouts
      </h5>

      {noWorkoutsPlanned ? (
        <NoActivity
          title="💤 No Workouts Planned for Today."
          description="Ready to move? Add a workout or get a recommended routine to keep your progress going!"
        />
      ) : (
        <div className="space-y-6">
          {sections.map(
            ({ label, data }) =>
              data.length > 0 && (
                <WorkoutTable
                  key={label}
                  category={label}
                  data={data}
                  exerciseType={exerciseType}
                  exerciseCatalog={exerciseCatalog}
                />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default TodayWorkoutCard;
