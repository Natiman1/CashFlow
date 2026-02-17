"use client";

import { updateSettings, UserSettings } from "@/actions/settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface PreferencesFormProps {
  settings: UserSettings;
}

export function PreferencesForm({ settings }: PreferencesFormProps) {
  const [currency, setCurrency] = useState(settings.currency);
  const [language, setLanguage] = useState(settings.language);
  const [loading, setLoading] = useState(false);

  async function onCurrencyChange(value: string) {
    setLoading(true);
    setCurrency(value);

    const result = await updateSettings({ currency: value, language });

    if (result.error) {
      toast.error(result.error);
      setCurrency(settings.currency);
    } else {
      toast.success("Currency updated");
    }
    setLoading(false);
  }

  async function onLanguageChange(value: string) {
    setLoading(true);
    setLanguage(value);

    const result = await updateSettings({ language: value, currency });

    if (result.error) {
      toast.error(result.error);
      setLanguage(settings.language);
    } else {
      toast.success("Language updated");
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={currency}
            onValueChange={onCurrencyChange}
            disabled={loading}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="JPY">JPY (¥)</SelectItem>
              <SelectItem value="ETB">ETB (Br)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This will be used for display purposes.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={language}
            onValueChange={onLanguageChange}
            disabled={loading}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="et">Amharic (Ethiopia)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choose your preferred language for the interface.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
