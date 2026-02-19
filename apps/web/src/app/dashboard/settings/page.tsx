import { getSettings } from "@/actions/settings";
import { DataExport } from "@/components/settings/data-export";
import { NotificationsForm } from "@/components/settings/notifications-form";
import { PreferencesForm } from "@/components/settings/preferences-form";
import { ProfileForm } from "@/components/settings/profile-form";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { settings, error } = await getSettings();

  if (error || !settings) {
    if (error === "Unauthorized") redirect("/login");
  }

  const safeSettings = settings || {
    currency: "USD",
    language: "en",
    notifications: { budgetAlerts: true, monthlyReports: false },
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />

      <div className="max-w-2xl space-y-10 mx-auto">
        {/* Profile */}
        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Profile</h3>
            <p className="text-sm text-muted-foreground">
              Update your personal information.
            </p>
          </div>
          <ProfileForm />
        </section>

        {/* Preferences */}
        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Customize your experience.
            </p>
          </div>
          <PreferencesForm settings={safeSettings} />
        </section>

        {/* Notifications */}
        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Configure how you receive alerts.
            </p>
          </div>
          <NotificationsForm settings={safeSettings} />
        </section>

        {/* Data Management */}
        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Data Management</h3>
            <p className="text-sm text-muted-foreground">
              Export or manage your data.
            </p>
          </div>
          <DataExport />
        </section>
      </div>
    </div>
  );
}
