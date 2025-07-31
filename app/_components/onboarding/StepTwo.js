"use client";

import GoalSelect from "@/app/(site)/settings/info/GoalSelect";

export default function StepTwo({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">Tell us about your goals</h3>
        <p className="text-sm text-muted-foreground">
          Help us tailor your workout plan by sharing your fitness goals.
        </p>
      </div>
      <GoalSelect settings={data.goals} onChange={onChange} />
    </div>
  );
}
