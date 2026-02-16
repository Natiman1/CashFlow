import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Settings,
  Wallet,
  Folders,
} from "lucide-react";
import { useSidebar } from "@/hooks/SidebarContext";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
    icon: Folders,
  },
  {
    label: "Budgets",
    href: "/dashboard/budgets",
    icon: Wallet,
  },
  {
    label: "Statistics",
    href: "/dashboard/statistics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`
          fixed z-50 h-screen bg-background border-r transition-all duration-300
          md:static
          ${isOpen ? "w-60 translate-x-0" : "w-0 -translate-x-full "}
        `}
      >
        {isOpen && (
          <div className="">
            <Link href="/">
              <div className="flex h-16 items-center px-6 text-lg font-semibold cursor-pointer">
                CashFlow
              </div>
            </Link>

            <nav className="px-4 py-4 space-y-1 h-full overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 768) close();
                    }}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : " hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </aside>
    </>
  );
}
