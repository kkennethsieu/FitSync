import { auth } from "@/utils/supabase/auth";
import NotificationForm from "./NotificationForm";
import { loadSettingData } from "@/lib/loadSettingData";

export default async function page() {
  const session = await auth();
  const { settings } = await loadSettingData(session.user.user_id);
  return (
    <>
      <div>
        <h2 className="mb-1 text-xl font-semibold">My Notifications</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Customize how and when you get notified about your workouts and
          milestones.
        </p>
      </div>
      <NotificationForm settings={settings} />
    </>
  );
}
