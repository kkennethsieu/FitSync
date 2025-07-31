import Image from "next/image";

function SummaryCard({ title, value, image }) {
  return (
    <div className="flex items-center p-4 space-x-4 bg-white rounded-2xl shadow-md  hover:scale-[1.02] transition-all duration-300 w-full max-w-sm dark:bg-gray-800 ">
      <div className="relative flex-shrink-0 w-14 h-14">
        <Image
          src={image}
          alt={`${title} Icon`}
          sizes="(max-width: 768px) 40px, 56px"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export default SummaryCard;
