import { useSidebar } from "@/hooks/SidebarContext";
import { Bell, PanelLeft } from "lucide-react";




export default function Topbar() {
  const { toggle } = useSidebar();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="cursor-pointer"><PanelLeft /></button>
      <h1 className="text-lg font-semibold text-gray-900">
        Dashboard
      </h1>
      </div>
        

      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500" />
        </button>

        <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-medium">
          N
        </div>
      </div>
    </header>
  );
}
