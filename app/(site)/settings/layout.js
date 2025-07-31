import SettingsSidebar from "@/app/(site)/settings/_components/SettingsSideBar";

export const metadata = {
  title: "Settings | FitSync",
  description: "Settings FitSync",
};

export default function SettingsLayout({ children }) {
  return (
    <div className="flex h-full overflow-hidden text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 ">
      {/* Sidebar - fixed */}
      <aside className="hidden xl:flex xl:flex-col xl:justify-between xl:px-6 xl:py-5">
        <aside className="w-full max-w-xs p-6 space-y-6 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 sm:w-64">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Settings
          </h2>
          <SettingsSidebar />
        </aside>
      </aside>

      {/* Scrollable main content */}
      <main className="flex-1 px-4 py-5 overflow-y-auto xl:px-6 xl:py-5">
        {children}
      </main>
    </div>
  );
}
