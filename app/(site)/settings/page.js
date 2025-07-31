import ProfileForm from "@/app/(site)/settings/_components/ProfileForm";
import { loadSettingData } from "@/lib/loadSettingData";
import { auth } from "@/utils/supabase/auth";

export default async function page() {
  const session = await auth();
  const { settings } = await loadSettingData(session.user.user_id);
  return (
    <div className="">
      <h2 className="mb-1 text-xl font-semibold">Profile Details</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage your profile settings.
      </p>
      <ProfileForm settings={settings} />
    </div>
  );
}
