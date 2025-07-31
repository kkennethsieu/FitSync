"use client";

import ToggleItem from "@/app/_components/workoutForm/ToggleItem";
import { useState } from "react";
import Buttons from "../_components/Buttons";
import ToggleNotification from "./ToggleNotification";
import toast from "react-hot-toast";
import { updateProfile } from "@/lib/data-service";

function NotificationForm({ settings }) {
  const [formData, setFormData] = useState(settings);

  // Extract notifications object or fallback to defaults
  const notifications = formData.notifications || {
    dailyReminder: false,
    missedWorkout: false,
    milestoneNotification: false,
    mobilePush: false,
    desktopPush: false,
    emailNotification: false,
  };

  function handleChange(field, value) {
    if (field.startsWith("notifications.")) {
      const notifField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notifField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
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
      <div className="max-w-md space-y-6">
        <h3 className="text-lg font-semibold">Notify me when...</h3>

        <ToggleNotification
          label="Enable daily workout reminders"
          enabled={notifications.dailyReminder}
          onChange={(val) => handleChange("notifications.dailyReminder", val)}
        />
        <ToggleNotification
          label="Remind me when I miss a planned workout"
          enabled={notifications.missedWorkout}
          onChange={(val) => handleChange("notifications.missedWorkout", val)}
        />
        <ToggleNotification
          label="Milestone notification"
          enabled={notifications.milestoneNotification}
          onChange={(val) =>
            handleChange("notifications.milestoneNotification", val)
          }
        />
      </div>

      <hr />

      <div className="max-w-md space-y-6">
        <h3 className="text-lg font-semibold">Push Notifications</h3>

        <ToggleNotification
          label="Mobile push notifications"
          description="Get notified on your mobile device."
          enabled={notifications.mobilePush}
          onChange={(val) => handleChange("notifications.mobilePush", val)}
        />
        <ToggleNotification
          label="Desktop push notifications"
          description="Receive notifications on your desktop."
          enabled={notifications.desktopPush}
          onChange={(val) => handleChange("notifications.desktopPush", val)}
        />
        <ToggleNotification
          label="Email notifications"
          description="Get email alerts about your activities."
          enabled={notifications.emailNotification}
          onChange={(val) =>
            handleChange("notifications.emailNotification", val)
          }
        />
      </div>

      <Buttons onCancel={handleCancel} />
    </form>
  );
}

export default NotificationForm;
