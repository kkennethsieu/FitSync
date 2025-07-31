import { Oswald } from "next/font/google";
import Image from "next/image";
import LinkWithProgress from "./LinkWithProgress";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function Logo() {
  return (
    <LinkWithProgress href="/" className="flex items-center space-x-2">
      <Image src="/logo.png" width={70} height={70} alt="logo" />
      <span
        className={`${oswald.className} font-bold text-2xl text-gray-800 dark:text-gray-100`}
      >
        FITSYNC
      </span>
    </LinkWithProgress>
  );
}

export default Logo;
