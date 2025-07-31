"use server";

import { signIn, signOut } from "@/utils/supabase/auth";

export async function signInAction(formData) {
  const provider = formData.get("provider");
  if (provider === "google") {
    await signIn("google", { redirectTo: "/" });
  }
  if (provider === "github") await signIn("github", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
