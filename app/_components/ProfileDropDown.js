"use client";

import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import SettingsSideBar from "../(site)/settings/_components/SettingsSideBar";
import LogoutConfirmationModal from "../login/_components/LogoutConfirmationModal";
import LinkWithProgress from "./LinkWithProgress";

const menuItems = [
  { label: "Dashboard", href: "/", icon: "/icons/dashboard.svg" },
  { label: "Activities", href: "/activities", icon: "/icons/running.svg" },
  { label: "Analytics", href: "/analytics", icon: "/icons/analytics.svg" },
  { label: "Catalog", href: "/catalog", icon: "/icons/exercise.svg" },
  { label: "Settings", href: "/settings", icon: "/icons/settings.svg" },
];

export default function ProfileDropDown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarTimeout = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSettingsHover = (show) => {
    clearTimeout(sidebarTimeout.current);
    sidebarTimeout.current = setTimeout(() => {
      setShowSidebar(show);
    }, 250); // 250ms delay
  };

  return (
    <>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          asChild
          className="flex items-center gap-1 px-2 py-1 transition-colors duration-200 border rounded cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Profile options"
        >
          <ChevronDown size={34} />
        </Popover.Trigger>

        <Popover.Content
          side="bottom"
          align="end"
          className="z-50 w-56 p-2 space-y-1 origin-top-right scale-100 bg-white rounded-md shadow-lg dark:bg-gray-800 animate-popover-fade"
        >
          <ul className="flex flex-col space-y-1">
            {menuItems.map(({ href, label, icon }) => {
              const isSettings = label === "Settings";

              return (
                <li
                  key={href}
                  onMouseEnter={() => isSettings && handleSettingsHover(true)}
                  onMouseLeave={() => isSettings && handleSettingsHover(false)}
                >
                  <LinkWithProgress
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors ${
                      isActive(href)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Image
                      src={icon}
                      width={20}
                      height={20}
                      alt={`${label} icon`}
                      className={
                        isActive(href)
                          ? "filter invert"
                          : "dark:filter dark:invert"
                      }
                    />
                    <span>{label}</span>
                  </LinkWithProgress>

                  {/* Inject SettingsSidebar inline below */}
                  {isSettings && showSidebar && (
                    <div className="pt-2">
                      <SettingsSideBar />
                    </div>
                  )}
                </li>
              );
            })}

            {/* Logout */}
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  setShowLogoutModal(true);
                }}
                className="flex items-center w-full gap-2 px-3 py-2 text-sm text-left text-gray-700 rounded hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Image
                  src="/icons/logout.svg"
                  width={20}
                  height={20}
                  alt="logout icon"
                  className="dark:filter dark:invert"
                />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Root>

      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onOpenChange={setShowLogoutModal}
      />
    </>
  );
}
