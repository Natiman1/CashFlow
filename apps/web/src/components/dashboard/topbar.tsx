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
import { Bell, PanelLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "@/actions/notifications";
import { useEffect, useState, useCallback, startTransition } from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean | null;
  createdAt: Date | null;
}

export default function Topbar() {
  const { toggle } = useSidebar();

  const { data: session } = useSession();

  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  const fetchNotifications = useCallback(async () => {
    const res = (await getNotifications()) as Notification[];
    setNotificationList(res);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      const res = await getNotifications();
      if (isMounted) {
        startTransition(() => {
          setNotificationList(res as Notification[]);
        });
      }
    }

    initialize();

    // Listen for transaction added event
    const handleTransactionAdded = () => {
      setTimeout(() => {
        if (isMounted) initialize();
      }, 500);
    };

    window.addEventListener("transaction-added", handleTransactionAdded);

    return () => {
      isMounted = false;
      window.removeEventListener("transaction-added", handleTransactionAdded);
    };
  }, []); // Use getNotifications as stable dependency

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const handleMarkAsRead = async (id: string) => {
    if (session?.user.email === "demo@cashflow.app") {
      toast.error("Demo account is read-only");
      return;
    }
    await markNotificationAsRead(id);
    await fetchNotifications();
  };

  const handleDelete = async (id: string) => {
    if (session?.user.email === "demo@cashflow.app") {
      toast.error("Demo account is read-only");
      return;
    }
    await deleteNotification(id);
    await fetchNotifications();
  };

  const router = useRouter();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background text-foreground px-6">
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="cursor-pointer">
          <PanelLeft />
        </button>
        <h1 className="text-lg font-semibold ">Dashboard</h1>
      </div>

      {/* notifications */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative outline-none cursor-pointer">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs font-normal text-muted-foreground">
                  {unreadCount} unread
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-100 overflow-y-auto">
              {notificationList.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notificationList.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className={cn(
                      "flex flex-col items-start gap-1 p-4 cursor-default focus:bg-accent group relative",
                      !n.read && "bg-emerald-50/50 dark:bg-emerald-950/20",
                    )}
                    onClick={() => !n.read && handleMarkAsRead(n.id)}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-medium",
                          !n.read && "text-emerald-600 dark:text-emerald-400",
                        )}
                      >
                        {n.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {n.createdAt
                          ? formatDistanceToNow(new Date(n.createdAt), {
                              addSuffix: true,
                            })
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 w-full">
                      <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                        {n.message}
                      </p>
                      {!n.read && (
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(n.id);
                        }}
                        className="text-red-500 cursor-pointer lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity p-1 lg:hover:bg-red-50 lg:dark:hover:bg-red-950/30 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* user menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer outline-none">
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
                  router.push("/");
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
