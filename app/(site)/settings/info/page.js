import { auth } from "@/utils/supabase/auth";
import InfoForm from "./InfoForm";
import { loadSettingData } from "@/lib/loadSettingData";

export default async function page() {
  const session = await auth();
  const { settings } = await loadSettingData(session.user.user_id);
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold">Basic Info & Goals</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage your personal information and fitness goals to keep your profile
        current and your progress on track.
      </p>
      <InfoForm settings={settings} />
    </div>
  );
}
