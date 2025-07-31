"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const sportsCatalog = [
  "Strength Training",
  "Cardio",
  "Stretching/Flexibility",
  "Plyometrics",
  "Mobility",
  "HIIT",
];

export default function SportsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSport = searchParams.get("sport");

  const handleSelect = (sport) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedSport === sport) {
      params.delete("sport");
    } else {
      params.set("sport", sport);
    }
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-bold">Filter by Type</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
        {sportsCatalog.map((sport) => (
          <div key={sport} className="flex items-center space-x-2">
            <Checkbox
              id={sport}
              checked={selectedSport === sport}
              onCheckedChange={() => handleSelect(sport)}
            />
            <label htmlFor={sport} className="text-sm">
              {sport}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
