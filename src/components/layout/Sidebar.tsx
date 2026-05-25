"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useUIStore } from "@/lib/store";
import {
  IconLayoutDashboard,
  IconWallet,
  IconRepeat,
  IconChartPie,
  IconSettings,
  IconChevronRight,
  IconChartBar,
  IconX,
  IconLogout,
} from "@tabler/icons-react";

const navItems = [
  {
    section: "Overview",
    links: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: IconLayoutDashboard,
        exact: true,
      },
      { href: "/dashboard/budgets", label: "Budgets", icon: IconWallet },
    ],
  },
  {
    section: "Manage",
    links: [
      { href: "/dashboard/recurring", label: "Recurring", icon: IconRepeat },
      { href: "/dashboard/settings", label: "Settings", icon: IconSettings },
    ],
  },
];

export default function Sidebar({
  currencyBadge,
}: {
  currencyBadge?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useClerk();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : (user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "U");

  const sidebarContent = (
    <aside className="w-[220px] min-w-[220px] h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-[18px] border-b border-sidebar-border">
        <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
          <IconChartBar size={16} color="#1d2021" stroke={2} />
        </div>
        <span className="text-sidebar-text text-base font-medium tracking-tight">
          Budget Set
        </span>
        {currencyBadge}
        <button
          onClick={closeSidebar}
          className="md:hidden ml-1 text-sidebar-muted hover:text-sidebar-text transition-colors"
        >
          <IconX size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((group) => (
          <div key={group.section}>
            <p className="text-[11px] font-medium text-sidebar-muted tracking-widest uppercase px-5 pt-4 pb-1.5">
              {group.section}
            </p>
            {group.links.map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeSidebar}
                  className={`
                    relative flex items-center gap-2.5 px-5 py-2.5 text-sm transition-colors duration-100
                    ${
                      active
                        ? "text-accent-light bg-accent/10 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2.5px] before:h-5 before:bg-accent before:rounded-r-sm"
                        : "text-sidebar-muted hover:text-sidebar-text hover:bg-white/5"
                    }
                  `}
                >
                  <link.icon
                    size={17}
                    stroke={1.75}
                    className="flex-shrink-0"
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border">
        {/* User info */}
        <div className="px-5 py-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-info flex items-center justify-center text-xs font-medium text-sidebar flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sidebar-text text-sm font-medium truncate">
              {user?.firstName
                ? `${user.firstName} ${user.lastName ?? ""}`.trim()
                : (user?.emailAddresses?.[0]?.emailAddress ?? "User")}
            </p>
            <p className="text-sidebar-muted text-xs">Personal · Free</p>
          </div>
          <IconChevronRight
            size={14}
            className="text-sidebar-muted flex-shrink-0"
          />
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="w-full flex items-center gap-2.5 px-5 py-3 text-sm text-sidebar-muted hover:text-danger hover:bg-danger/5 transition-colors border-t border-sidebar-border"
        >
          <IconLogout size={16} stroke={1.75} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:flex h-screen">{sidebarContent}</div>

      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeSidebar}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
