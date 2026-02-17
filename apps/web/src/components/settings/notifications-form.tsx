"use client";

import { updateSettings, UserSettings } from "@/actions/settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface NotificationsFormProps {
  settings: UserSettings;
}

export function NotificationsForm({ settings }: NotificationsFormProps) {
  const [budgetAlerts, setBudgetAlerts] = useState(
    settings.notifications.budgetAlerts,
  );
  const [monthlyReports, setMonthlyReports] = useState(
    settings.notifications.monthlyReports,
  );
  const [loading, setLoading] = useState(false);

  async function onBudgetAlertsChange(checked: boolean) {
    setLoading(true);
    setBudgetAlerts(checked);

    const result = await updateSettings({
      notifications: {
        ...settings.notifications,
        budgetAlerts: checked,
        monthlyReports,
      },
    });

    if (result.error) {
      toast.error(result.error);
      setBudgetAlerts(!checked);
    } else {
      toast.success("Budget alerts updated");
    }
    setLoading(false);
  }

  async function onMonthlyReportsChange(checked: boolean) {
    setLoading(true);
    setMonthlyReports(checked);

    const result = await updateSettings({
      notifications: {
        ...settings.notifications,
        monthlyReports: checked,
        budgetAlerts,
      },
    });

    if (result.error) {
      toast.error(result.error);
      setMonthlyReports(!checked);
    } else {
      toast.success("Monthly reports updated");
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your alerts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="budget-alerts" className="flex flex-col space-y-1">
            <span>Budget Alerts</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Receive notifications when you exceed your budget limits.
            </span>
          </Label>
          <Switch
            id="budget-alerts"
            checked={budgetAlerts}
            onCheckedChange={onBudgetAlertsChange}
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="monthly-reports" className="flex flex-col space-y-1">
            <span>Monthly Reports</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Receive a monthly summary of your finances.
            </span>
          </Label>
          <Switch
            id="monthly-reports"
            checked={monthlyReports}
            onCheckedChange={onMonthlyReportsChange}
            disabled={loading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
