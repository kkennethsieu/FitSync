"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutConfirmationModal from "../login/_components/LogoutConfirmationModal";
import LinkWithProgress from "./LinkWithProgress";

const mainMenu = [
  { href: "/", icon: "/icons/dashboard.svg", label: "Dashboard" },
  { href: "/activities", icon: "/icons/running.svg", label: "Your Activities" },
  { href: "/analytics", icon: "/icons/analytics.svg", label: "Analytics" },
  { href: "/catalog", icon: "/icons/exercise.svg", label: "Exercise Catalog" },
];

const manageMenu = [
  { href: "/settings", icon: "/icons/settings.svg", label: "Settings" },
  { href: "/logout", icon: "/icons/logout.svg", label: "Logout" },
];

function Navbar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const renderLink = ({ href, icon, label }) => {
    const active = isActive(href);

    if (href === "/logout") {
      return (
        <li key={href}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutModal(true);
            }}
            className="flex items-center w-full p-2 space-x-3 text-left text-gray-700 transition-colors duration-200 rounded-md dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Image
              src={icon}
              width={20}
              height={20}
              alt={`${label.toLowerCase()} icon`}
              className="filter dark:invert"
            />
            <span className="text-sm">{label}</span>
          </button>
        </li>
      );
    }

    return (
      <li key={href}>
        <LinkWithProgress
          href={href}
          className={`
            flex items-center space-x-3 p-2 rounded-md transition-colors duration-200
            ${
              active
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            }
          `}
        >
          <Image
            src={icon}
            width={20}
            height={20}
            alt={`${label.toLowerCase()} icon`}
            className={active ? "filter invert " : "dark:filter dark:invert "}
          />
          <span className="text-sm ">{label}</span>
        </LinkWithProgress>
      </li>
    );
  };

  return (
    <>
      <nav className="max-w-full px-2 py-3 bg-white dark:bg-gray-900 sm:max-w-xs md:max-w-none">
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Main Menu
          </h3>
          <ul className="p-0 m-0 space-y-1.5 list-none">
            {mainMenu.map(renderLink)}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Manage
          </h3>
          <ul className="p-0 m-0 list-none">{manageMenu.map(renderLink)}</ul>
        </div>
      </nav>
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onOpenChange={setShowLogoutModal}
      />
    </>
  );
}

export default Navbar;
