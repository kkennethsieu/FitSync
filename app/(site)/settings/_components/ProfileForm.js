"use client";
import { useState } from "react";
import Buttons from "./Buttons";
import LanguageSection from "./LanguageSection";
import PasswordSection from "./PasswordSection";
import ProfileSection from "./ProfileSection";
import ThemeSection from "./ThemeSection";
import UnitPrefSection from "./UnitPrefSection";
import { updateProfile } from "@/lib/data-service";
import toast from "react-hot-toast";

function ProfileForm({ settings: initialSettings }) {
  const [formData, setFormData] = useState(initialSettings);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updated = await updateProfile(formData.user_id, formData);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  }
  function handleCancel() {
    setFormData(settings);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl p-6 space-y-10">
      <ProfileSection settings={formData} onChange={handleChange} />
      {/* <PasswordSection /> */}
      {/* <LanguageSection /> */}
      <hr />
      <ThemeSection settings={formData} onChange={handleChange} />
      <hr />
      <UnitPrefSection settings={formData} onChange={handleChange} />
      <Buttons onCancel={handleCancel} />
    </form>
  );
}

export default ProfileForm;
