import { supabase } from "@/utils/supabase/client";

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
  return data;
}

export async function createProfile(newUser) {
  const { data, error } = await supabase.from("profiles").insert([newUser]);

  if (error) {
    console.error(error);
    throw new Error("Profile could not be created");
  }
  return data;
}

export async function getProfile(user_id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.error(error);
    throw new Error("Error fetching profile");
  }
  return data[0];
}

export async function updateProfile(user_id, updates) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates })
    .eq("user_id", user_id)
    .select("*")
    .single(); // ensures exactly one row is returned

  if (error) {
    console.error(error);
    throw new Error("Profile could not be updated");
  }

  return data;
}

export async function updateUserThemePreference(user_id, theme) {
  const darkMode = theme === "dark"; // convert string to boolean

  const { data, error } = await supabase
    .from("profiles")
    .update({ darkMode }) // boolean value
    .eq("user_id", user_id)
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("User theme preference could not be updated");
  }

  return data;
}

export async function getUserThemePreference(user_id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("darkMode")
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("User theme preference could not be fetched");
  }

  return data.darkMode ? "dark" : "light"; // Convert boolean to string
}
