"use client";

import GoalSelect from "./GoalSelect";

function GoalSettingsForm({ settings, onChange }) {
  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Goal Settings</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Define your fitness goals and preferences to help tailor your workouts.
      </p>

      <div className="max-w-md space-y-6">
        <GoalSelect settings={settings} onChange={onChange} />
      </div>
    </section>
  );
}

export default GoalSettingsForm;
