"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { SidebarProvider } from "@/hooks/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 transition-all duration-300 flex flex-col min-h-0">
        <Topbar />
      
        <main className="flex-1 p-6 min-h-0 overflow-y-auto">{children}</main>
      </div>
    </div>
    </SidebarProvider>
  );
}
