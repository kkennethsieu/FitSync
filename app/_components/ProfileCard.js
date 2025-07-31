import { auth } from "@/utils/supabase/auth";
import Image from "next/image";
import React from "react";
import ProfileDropDown from "./ProfileDropDown";
import ThemeToggle from "./ThemeToggle";

export default async function ProfileCard() {
  const session = await auth();

  return (
    <div className="flex items-center max-w-full px-2 py-2 space-x-3 text-gray-800 rounded-md bg-gray-50 w-max dark:bg-gray-800 dark:text-gray-100 sm:px-3 sm:py-3">
      {/* Profile Icon */}
      {session ? (
        <Image
          className="rounded-full"
          src={session.user.image || `/images/placeholder.jpg`}
          width={40}
          height={40}
          alt={session.user.name}
          referrerPolicy="no-referrer"
        />
      ) : null}

      {/* Name: hide on xs to save space */}
      <div className="hidden min-w-0 text-sm font-medium truncate sm:block">
        {session?.user.name || "Sign In Here"}
      </div>

      <ThemeToggle />

      {/* Dropdown Button */}
      <ProfileDropDown />
    </div>
  );
}
