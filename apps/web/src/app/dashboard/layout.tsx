"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { SidebarProvider } from "@/hooks/SidebarContext";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const isDemo = session?.user.email === "demo@cashflow.app";
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background  ">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 transition-all duration-300 flex flex-col min-h-0 min-w-0 overflow-x-hidden">
          {isDemo && (
            <div className="bg-yellow-100 p-2 text-center">
              <p className="text-sm text-yellow-700">
                Demo account is read-only.
              </p>
            </div>
          )}

          <Topbar />

          <main className="flex-1 p-6 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden bg-background  2xl:max-w-5xl 2xl:mx-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
