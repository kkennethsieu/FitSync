"use client";
import Image from "next/image";

import LinkWithProgress from "./LinkWithProgress";

function MotivationalCard({ src, text }) {
  return (
    <div className="relative h-40 overflow-hidden shadow-xl sm:h-48 md:h-56 lg:h-64 rounded-2xl group">
      {/* Background Image */}
      <Image
        src={src}
        alt="Motivational background"
        width={800}
        height={300}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out cursor-pointer group-hover:scale-105"
        priority
      />

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex items-end justify-end px-4 py-3 text-right sm:px-6 sm:py-4 md:px-10 md:py-6">
        <LinkWithProgress
          href="/activities"
          className="flex items-center max-w-xs p-3 text-sm italic text-white transition-colors border rounded-lg shadow-lg cursor-pointer sm:text-base bg-black/30 backdrop-blur-sm hover:bg-gray-900"
        >
          {text}
        </LinkWithProgress>
      </div>
    </div>
  );
}

export default MotivationalCard;
