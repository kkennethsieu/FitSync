"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function CatalogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(initialQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }

      params.delete("page"); // Reset pagination
      router.push(`?${params.toString()}`, { scroll: false });
    }, 300); // Debounce delay

    return () => clearTimeout(timeout); // Cancel on new keystroke
  }, [searchInput, router]);

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-bold">Search Exercises</h2>
      <Input
        type="text"
        placeholder="e.g. Push-up, Squat..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
