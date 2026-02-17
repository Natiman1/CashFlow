import { getSettings } from "@/actions/settings";
import { DataExport } from "@/components/settings/data-export";
import { NotificationsForm } from "@/components/settings/notifications-form";
import { PreferencesForm } from "@/components/settings/preferences-form";
import { ProfileForm } from "@/components/settings/profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { settings, error } = await getSettings();

  if (error || !settings) {
    // improved error handling or redirect to login if unauthorized
    // For now, let's assume if unauthorized getSettings returns error
    if (error === "Unauthorized") redirect("/login");
    // Handle other errors gracefully, maybe show a toast or error message components
    // For simplicity in this iteration, we might render a fallback or empty state,
    // but better to pass default settings if possible or handle in UI
  }

  // Fallback settings if fetch fails but we want to show the page (e.g. strict null checks)
  const safeSettings = settings || {
    currency: "USD",
    language: "en",
    notifications: { budgetAlerts: true, monthlyReports: false },
  };

  return (
    <div className="space-y-6 p-4 lg:p-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 mx-auto">
        <div className="flex-1 lg:max-w-2xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile" className="cursor-pointer">
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="cursor-pointer">
                Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" className="cursor-pointer">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="data" className="cursor-pointer">
                Data Management
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4 ">
              <ProfileForm />
            </TabsContent>
            <TabsContent value="preferences" className="space-y-4">
              <PreferencesForm settings={safeSettings} />
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <NotificationsForm settings={safeSettings} />
            </TabsContent>
            <TabsContent value="data" className="space-y-4">
              <DataExport />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
