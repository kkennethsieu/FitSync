function NoWorkoutFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 text-center border rounded-lg ">
      <h3 className="mb-2 text-xl font-semibold text-orange-600">
        No workouts recorded this month
      </h3>
      <p className="mb-4 text-muted-foreground">
        You're just one workout away from building momentum 💪
      </p>
      <p className="text-sm text-gray-500">
        Once you log a workout, your progress charts and insights will appear
        here.
      </p>
    </div>
  );
}

export default NoWorkoutFound;
