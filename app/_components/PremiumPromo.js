import Image from "next/image";
import LinkWithProgress from "./LinkWithProgress";

function PremiumPromo() {
  return (
    <div className="relative h-48 overflow-hidden rounded-lg">
      <Image
        src="/images/invitePromo.jpg"
        alt="Premium promo"
        width={200}
        height={200}
        className="object-cover w-full h-full brightness-75"
      />
      <div className="absolute inset-0 bg-black opacity-25"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-6 space-y-3 text-center text-white">
        <h5 className="text-sm font-semibold drop-shadow-md">
          🔓 Unlock Premium Features — Upgrade to Pro
        </h5>
        <p className="text-xs leading-tight drop-shadow-sm">
          🚀 Get 50% Off Your First Month! Access advanced tools, customization,
          and more.
        </p>
        <LinkWithProgress
          href="/settings/billing"
          className="px-4 py-2 mt-2 text-xs font-medium transition bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Upgrade Now
        </LinkWithProgress>
      </div>
    </div>
  );
}

export default PremiumPromo;
