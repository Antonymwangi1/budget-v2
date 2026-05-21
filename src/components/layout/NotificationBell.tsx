"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  IconBell,
  IconCheck,
  IconAlertTriangle,
  IconAlertCircle,
} from "@tabler/icons-react";
import {
  getNotifications,
  type AppNotification,
} from "@/lib/actions/notifications";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchNotifications = () => {
    startTransition(async () => {
      const data = await getNotifications();
      setNotifications(data);
      setLoaded(true);
    });
  };

  const handleOpen = () => {
    setOpen((v) => !v);
    if (!open) fetchNotifications();
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Fetch count on mount to show red dot
  useEffect(() => {
    fetchNotifications();
  }, []);

  const hasWarnings = notifications.length > 0;

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={handleOpen}
        className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-content-muted hover:bg-border transition-colors relative"
      >
        <IconBell size={16} />
        {hasWarnings && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 bg-surface border border-border rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-canvas/50">
            <span className="text-sm font-medium text-content-text">
              Notifications
            </span>
            {hasWarnings && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-danger/10 text-danger">
                {notifications.length}{" "}
                {notifications.length === 1 ? "alert" : "alerts"}
              </span>
            )}
          </div>

          {/* Loading */}
          {isPending && !loaded && (
            <div className="px-4 py-8 text-center text-xs text-content-muted">
              Checking budgets...
            </div>
          )}

          {/* All clear */}
          {loaded && !hasWarnings && (
            <div className="px-4 py-8 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <IconCheck size={20} className="text-success" />
              </div>
              <p className="text-sm font-medium text-content-text">
                All budgets healthy
              </p>
              <p className="text-xs text-content-muted text-center">
                No budgets are approaching their limit.
              </p>
            </div>
          )}

          {/* Notification list */}
          {loaded && hasWarnings && (
            <div className="flex flex-col">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    router.push(`/dashboard/budgets/${n.budgetId}`);
                    setOpen(false);
                  }}
                  className="flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-canvas/60 transition-colors text-left w-full"
                >
                  {/* Color dot */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${n.budgetColor}18` }}
                  >
                    {n.severity === "critical" ? (
                      <IconAlertCircle
                        size={16}
                        style={{ color: n.budgetColor }}
                      />
                    ) : (
                      <IconAlertTriangle
                        size={16}
                        style={{ color: n.budgetColor }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-content-text truncate">
                      {n.budgetName}
                    </p>
                    <p className="text-xs text-content-muted mt-0.5">
                      {n.message}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-2 h-1 w-full bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          n.severity === "critical" ? "bg-danger" : "bg-warning"
                        }`}
                        style={{
                          width: `${Math.min(Math.round(n.pct), 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Badge */}
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                      n.severity === "critical"
                        ? "bg-danger/10 text-danger"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {n.severity === "critical" ? "Critical" : "High"}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Footer — link to budgets */}
          {loaded && hasWarnings && (
            <div className="px-4 py-2.5 border-t border-border bg-canvas/50">
              <button
                onClick={() => {
                  router.push("/dashboard/budgets");
                  setOpen(false);
                }}
                className="text-xs text-accent hover:text-accent-light transition-colors font-medium"
              >
                View all budgets →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
