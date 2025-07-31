import Image from "next/image";

export default function InvitePromo() {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <Image
        src="/images/invitePromo.jpg"
        alt="Invite promo"
        width={250}
        height={250}
        className="brightness-65"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-3 text-xs text-white drop-shadow-md">
          Invite your friends and start working out together
        </h2>
        <button className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700">
          Invite Now
        </button>
      </div>
    </div>
  );
}
