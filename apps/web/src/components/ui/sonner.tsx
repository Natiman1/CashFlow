"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      richColors
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--primary)",
          "--normal-text": "var(--primary-foreground)",
          "--normal-border": "var(--border)",

          /* success */
          "--success-bg": "var(--primary)",
          "--success-text": "var(--primary-foreground)",
          "--success-border": "var(--primary)",
          "--success-icon": "var(--primary-foreground)",
          "--success-icon-foreground": "var(--primary)",

          /* info */
          "--info-bg": "var(--muted)",
          "--info-text": "var(--foreground)",
          "--info-border": "var(--border)",
          "--info-icon": "var(--foreground)",
          "--info-icon-foreground": "var(--muted)",

          /* warning */
          "--warning-bg": "var(--warning)",
          "--warning-text": "var(--warning-foreground)",
          "--warning-border": "var(--warning)",
          "--warning-icon": "var(--warning-foreground)",
          "--warning-icon-foreground": "var(--warning)",

          /* error */
          "--error-bg": "var(--destructive)",
          "--error-text": "var(--destructive-foreground)",
          "--error-border": "var(--destructive)",
          "--error-icon": "var(--destructive-foreground)",
          "--error-icon-foreground": "var(--destructive)",

          /* loading */
          "--loading-bg": "var(--muted)",
          "--loading-text": "var(--foreground)",
          "--loading-border": "var(--border)",
          "--loading-icon": "var(--foreground)",
          "--loading-icon-foreground": "var(--muted)",

          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
