"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function LevelFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedLevel = searchParams.get("level");

  const handleSelect = (level) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedLevel === level) {
      params.delete("level");
    } else {
      params.set("level", level);
    }

    params.delete("page"); // Reset pagination

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-bold">Filter by Level</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
        {levels.map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <Checkbox
              id={level}
              checked={selectedLevel === level}
              onCheckedChange={() => handleSelect(level)}
            />
            <label htmlFor={level} className="text-sm">
              {level}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
