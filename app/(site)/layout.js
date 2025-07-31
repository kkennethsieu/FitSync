import InvitePromo from "@/app/_components/InvitePromo";
import Logo from "@/app/_components/Logo";
import Navbar from "@/app/_components/Navbar";
import ProfileCard from "@/app/_components/ProfileCard";
import { getUserThemePreference } from "@/lib/data-service";
import { auth } from "@/utils/supabase/auth";
import ClientOnboarding from "../_components/onboarding/ClientOnboarding";
import ThemeProvider from "../_context/ThemeContext";

export const metadata = {
  title: "Dashboard | FitSync",
  description: "Workout Tracker",
};

export default async function DashboardLayout({ children }) {
  const session = await auth();
  const userTheme = session
    ? await getUserThemePreference(session.user.user_id)
    : null;

  return (
    <ThemeProvider initialTheme={userTheme}>
      <div className="grid h-screen grid-rows-[auto_1fr] xl:grid-cols-[250px_1fr] grid-cols-1 bg-white text-gray-900 dark:bg-gray-900 dark:text-zinc-100">
        {/* Client-only Onboarding Modal */}
        <ClientOnboarding />

        {/* Header: Logo and ProfileCard side-by-side on mobile, split on xl+ */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300 dark:border-gray-700 xl:col-span-2 xl:border-r-0 xl:px-6 xl:py-4 xl:justify-end xl:gap-8">
          {/* Show Logo on mobile and as sidebar on xl+ */}
          <div className="xl:hidden">
            <Logo />
          </div>
          <div className="hidden xl:block xl:absolute xl:left-6 xl:top-6 xl:max-h-24">
            <Logo />
          </div>

          {/* ProfileCard always on right */}
          <ProfileCard />
        </div>

        {/* Sidebar (only shown on xl+) */}
        <aside className="hidden xl:flex xl:flex-col xl:justify-between xl:px-6 xl:py-5 xl:border-r xl:border-gray-300 dark:xl:border-gray-700">
          <Navbar />
          <InvitePromo />
        </aside>

        {/* Main Content */}
        <main className="px-4 py-5 overflow-y-auto text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 xl:col-start-2 xl:px-6 xl:py-5">
          <>{children}</>
        </main>
      </div>
    </ThemeProvider>
  );
}
