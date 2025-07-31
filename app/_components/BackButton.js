"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 mt-6 text-white transition bg-indigo-600 rounded hover:bg-indigo-700"
      aria-label="Go back"
    >
      ← Back
    </button>
  );
}
