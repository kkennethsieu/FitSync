"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function BasicInfoForm({ settings, onChange }) {
  const { age, gender, height, weight, unit_height, unit_weight } = settings;
  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Basic Info</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Provide some basic info to personalize your workout tracker experience.
      </p>

      <div className="max-w-md space-y-4">
        {/* Age */}
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="e.g., 30"
            value={age}
            onChange={(e) => onChange("age", e.target.value)}
            min={1}
            max={120}
          />
        </div>

        {/* Gender */}
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={gender}
            onValueChange={(value) => onChange("gender", value)}
          >
            <SelectTrigger id="gender" className="w-full">
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
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 175"
              value={height}
              onChange={(e) => onChange("height", e.target.value)}
              min={30}
              max={300}
            />
          </div>
          <div className="w-32">
            <Label htmlFor="height-unit" className="invisible">
              Height Unit
            </Label>
            <Input id="unit_height" value={unit_height} disabled />
          </div>
        </div>

        {/* Weight */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => onChange("weight", e.target.value)}
              min={10}
              max={500}
            />
          </div>
          <div className="w-32">
            <Label htmlFor="weight-unit" className="invisible">
              Weight Unit
            </Label>
            <Input id="unit_weight" value={unit_weight} disabled />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BasicInfoForm;
