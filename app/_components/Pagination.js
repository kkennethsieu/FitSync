"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages, scrollTargetRef }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const updatePage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page);
    }

    router.push(`?${params.toString()}`, { scroll: false });

    // Defer scroll to allow content to update first
    requestAnimationFrame(() => {
      if (scrollTargetRef?.current) {
        scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => updatePage(i + 1)}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => updatePage(currentPage + 1)}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Next →
        </button>
      )}
    </div>
  );
}
