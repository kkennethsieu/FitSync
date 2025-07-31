"use client";
import BasicInfoForm from "./BasicInfoForm";
import GoalSettingsForm from "./GoalSettingsForm";
import Buttons from "../_components/Buttons";
import { useState } from "react";
import { updateProfile } from "@/lib/data-service";
import toast from "react-hot-toast";

function InfoForm({ settings }) {
  const [formData, setFormData] = useState(settings);

  function handleChange(field, value) {
    if (field.startsWith("goals.")) {
      const goalField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        goals: {
          ...prev.goals,
          [goalField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  }

  function handleCancel() {
    setFormData(settings);
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
  return (
    <form className="max-w-2xl p-6 space-y-10" onSubmit={handleSubmit}>
      {/* Basic Info Section */}
      <BasicInfoForm settings={formData} onChange={handleChange} />

      <hr />

      {/* Goal Settings Section */}
      <GoalSettingsForm
        settings={formData.goals || {}}
        onChange={(field, value) => handleChange(`goals.${field}`, value)}
      />
      <Buttons onCancel={handleCancel} />
    </form>
  );
}

export default InfoForm;
