import Image from "next/image";
import { formatDisplayDate, getToday } from "@/app/_helper/helper";

function TodayCard() {
  const currentDate = getToday();
  return (
    <div className="relative overflow-hidden rounded-lg h-26">
      <Image
        src="/images/invitePromo.jpg"
        alt="Premium promo"
        width={200}
        height={200}
        className="object-cover w-full h-full brightness-75"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-35"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-6 space-y-3 text-center text-white">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-90">
            Today
          </p>
          <p className="text-2xl font-extrabold">
            {formatDisplayDate(currentDate)}
          </p>
          <p className="text-xs italic opacity-75">Keep pushing forward!</p>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;
