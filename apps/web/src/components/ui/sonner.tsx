"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster"
      toastOptions={{
        classNames: {
          toast:
            "border shadow-lg bg-background text-foreground",
          success:
            "bg-emerald-500 text-white border-emerald-600",
          warning:
            "bg-amber-500 text-white border-amber-600",
          error:
            "bg-red-500 text-white border-red-600",
          description: "text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground",
          cancelButton:
            "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
