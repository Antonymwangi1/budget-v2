"use client";

import { usePathname } from "next/navigation";
import { useUIStore } from "@/lib/store";
import { IconBell, IconMenu2 } from "@tabler/icons-react";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: new Date().toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    }),
  },
  "/dashboard/budgets": { title: "Budgets", subtitle: "Manage your budgets" },
  "/dashboard/settings": { title: "Settings", subtitle: "Your preferences" },
  "/dashboard/reports": { title: "Reports", subtitle: "Spending insights" },
  "/dashboard/recurring": { title: "Recurring", subtitle: "Scheduled items" },
};

export default function Topbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useUIStore();

  const current = pageTitles[pathname] ?? { title: "Budget V2", subtitle: "" };

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center px-4 md:px-6 gap-3 flex-shrink-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={toggleSidebar}
        className="md:hidden w-9 h-9 rounded-lg border border-border flex items-center justify-center text-content-muted hover:bg-border transition-colors flex-shrink-0"
      >
        <IconMenu2 size={18} />
      </button>

      {/* Page title */}
      <div>
        <h1 className="text-2xl font-medium text-content-text tracking-tight leading-tight">
          {current.title}
        </h1>
        {current.subtitle && (
          <p className="text-sm text-content-muted leading-tight">
            {current.subtitle}
          </p>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <div className="hidden sm:flex items-center bg-border rounded-full p-0.5 gap-0.5">
          <span className="px-2.5 py-1 rounded-full text-sm font-medium bg-surface text-content-text">
            Light
          </span>
          <span className="px-2.5 py-1 rounded-full text-sm text-content-muted cursor-pointer">
            Dark
          </span>
        </div>

        {/* Notification bell */}
        <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-content-muted hover:bg-border transition-colors relative">
          <IconBell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>
      </div>
    </header>
  );
}
