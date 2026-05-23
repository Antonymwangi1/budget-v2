import { getSettings } from "@/lib/actions/settings";
import CurrencySelector from "@/components/settings/CurrencySelector";
import { IconCoin, IconUser, IconPalette } from "@tabler/icons-react";
import { currentUser } from "@clerk/nextjs/server";
import ManageAccountButton from "@/components/settings/ManageAccountButton";
import ThemeToggle from "@/components/layout/ThemeToggle";
import DeleteAllButton from "@/components/settings/DeleteAllButton";

export default async function SettingsPage() {
  const [settings, clerkUser] = await Promise.all([
    getSettings(),
    currentUser(),
  ]);

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div>
        <h1 className="text-base font-medium text-content-text">Settings</h1>
        <p className="text-xs text-content-muted mt-0.5">
          Manage your account preferences
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border bg-canvas/50">
          <h2 className="text-xs font-medium text-content-muted uppercase tracking-wider">
            Profile
          </h2>
        </div>
        <div className="px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center text-sm font-medium text-sidebar flex-shrink-0">
            {clerkUser?.firstName?.[0]}
            {clerkUser?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-content-text">
              {clerkUser?.firstName} {clerkUser?.lastName}
            </p>
            <p className="text-xs text-content-muted">
              {clerkUser?.emailAddresses?.[0]?.emailAddress} · Managed by Clerk
            </p>
          </div>

          <ManageAccountButton />
        </div>
      </div>

      {/* Preferences card */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border bg-canvas/50">
          <h2 className="text-xs font-medium text-content-muted uppercase tracking-wider">
            Preferences
          </h2>
        </div>

        {/* Currency */}
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <IconCoin size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-content-text">Currency</p>
              <p className="text-xs text-content-muted">
                Used across all budgets and reports
              </p>
            </div>
          </div>
          <CurrencySelector current={settings.currency || ""} />
        </div>

        {/* Theme */}
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
              <IconPalette size={16} className="text-info" />
            </div>
            <div>
              <p className="text-sm font-medium text-content-text">Theme</p>
              <p className="text-xs text-content-muted">Light or dark mode</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-surface border border-danger/20 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-danger/20 bg-danger/5">
          <h2 className="text-xs font-medium text-danger uppercase tracking-wider">
            Danger zone
          </h2>
        </div>
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-content-text">
              Clear all data
            </p>
            <p className="text-xs text-content-muted">
              Permanently delete all budgets and items
            </p>
          </div>
         <DeleteAllButton />
        </div>
      </div>
    </div>
  );
}
