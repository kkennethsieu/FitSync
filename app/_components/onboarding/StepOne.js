"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function StepOne({ data, onChange }) {
  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">Tell us about yourself</h3>
        <p className="text-sm text-muted-foreground">
          This helps us personalize your FitSync workout experience.
        </p>
      </div>

      {/* Age */}
      <div className="space-y-1.5">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          min={1}
          max={120}
          placeholder="e.g., 25"
          value={data?.age || ""}
          onChange={(e) => onChange("age", e.target.value)}
        />
      </div>

      {/* Gender */}
      <div className="space-y-1.5">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={data?.gender || ""}
          onValueChange={(value) => onChange("gender", value)}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {genders.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Height */}
      <div className="space-y-1.5">
        <Label htmlFor="height">Height (in)</Label>
        <Input
          id="height"
          type="number"
          min={30}
          max={300}
          placeholder="e.g., 175"
          value={data.height || ""}
          onChange={(e) => onChange("height", e.target.value)}
        />
      </div>

      {/* Weight */}
      <div className="space-y-1.5">
        <Label htmlFor="weight">Weight (lbs)</Label>
        <Input
          id="weight"
          type="number"
          min={10}
          max={500}
          placeholder="e.g., 150"
          value={data.weight || ""}
          onChange={(e) => onChange("weight", e.target.value)}
        />
      </div>
    </div>
  );
}
