"use client";

import LinkWithProgress from "@/app/_components/LinkWithProgress";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: "My Profile", href: "/settings" },
  { name: "Basic Info & Goals", href: "/settings/info" },
  { name: "Notifications", href: "/settings/notification" },
  { name: "Billing", href: "/settings/billing" },
];

export default function SettingsSideBar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <LinkWithProgress
          key={link.href}
          href={link.href}
          className={clsx(
            "text-sm px-3 py-2 rounded transition-colors",
            "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
            pathname === link.href && "bg-gray-100 font-medium dark:bg-gray-700"
          )}
        >
          {link.name}
        </LinkWithProgress>
      ))}
    </nav>
  );
}
