"use client";

import { useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal";
import { getProfile } from "@/lib/data-service";
import { useSession } from "next-auth/react";

export default function ClientOnboarding() {
  const { data: session } = useSession();
  const user = session?.user;

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!user?.user_id) return;

      const data = await getProfile(user?.user_id);
      setProfile(data);

      if (!data?.onboarding) {
        setShowOnboarding(true);
      }
    }

    fetchData();
  }, [user]);

  function handleClose() {
    setShowOnboarding(false);
  }

  if (!showOnboarding || !profile) return null;

  return (
    <OnboardingModal
      isOpen={showOnboarding}
      onClose={handleClose}
      profile={profile}
    />
  );
}
