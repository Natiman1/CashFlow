"use client";

import { useSidebar } from "@/hooks/SidebarContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";
import { Bell, PanelLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { toggle } = useSidebar();

  const { data: session } = useSession();

  const router = useRouter();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background text-foreground px-6">
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="cursor-pointer">
          <PanelLeft />
        </button>
        <h1 className="text-lg font-semibold ">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative  hover:text-gray-600">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
           
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white">
                  {session?.user?.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const result = await signOut();
                if (result.data) {
                  router.push("/login");
                  router.refresh();
                } else {
                  alert("Error signing out");
                }
              }}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
