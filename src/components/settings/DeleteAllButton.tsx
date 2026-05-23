"use client";

import { useState, useTransition } from "react";
import { IconTrash, IconAlertTriangle, IconX } from "@tabler/icons-react";
import { deleteAllData } from "@/lib/actions/settings";

export default function DeleteAllButton() {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState("");
  const [isPending, startTransition] = useTransition();

  const CONFIRM_WORD = "DELETE";
  const canDelete = confirmed === CONFIRM_WORD;

  const handleDelete = () => {
    if (!canDelete) return;
    startTransition(async () => {
      await deleteAllData();
      setOpen(false);
      setConfirmed("");
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-xs font-medium text-danger border border-danger/30 rounded-lg hover:bg-danger/5 transition-colors flex-shrink-0"
      >
        Delete all
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface border border-border rounded-xl w-full max-w-md shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-danger/20 bg-danger/5">
              <div className="flex items-center gap-2.5">
                <IconAlertTriangle size={18} className="text-danger" />
                <h2 className="text-base font-medium text-danger">
                  Delete all data
                </h2>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  setConfirmed("");
                }}
                className="text-content-muted hover:text-content-text transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5 flex flex-col gap-4">
              <p className="text-sm text-content-text leading-relaxed">
                This will permanently delete{" "}
                <span className="font-medium">
                  all your budgets and budget items
                </span>
                . Your account will remain active but all financial data will be
                gone.
              </p>

              <div className="bg-danger/5 border border-danger/20 rounded-lg px-4 py-3">
                <p className="text-xs text-danger font-medium mb-1">
                  This action cannot be undone.
                </p>
                <p className="text-xs text-content-muted">
                  All budgets, items, and spending history will be permanently
                  erased.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-content-muted mb-1.5">
                  Type{" "}
                  <span className="font-mono font-semibold text-content-text">
                    DELETE
                  </span>{" "}
                  to confirm
                </label>
                <input
                  type="text"
                  value={confirmed}
                  onChange={(e) => setConfirmed(e.target.value.toUpperCase())}
                  placeholder="DELETE"
                  className="w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text placeholder:text-content-muted focus:outline-none focus:border-danger transition-colors font-mono tracking-widest"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
              <button
                onClick={() => {
                  setOpen(false);
                  setConfirmed("");
                }}
                className="px-4 py-2 text-sm text-content-muted border border-border rounded-lg hover:bg-canvas transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={!canDelete || isPending}
                className="px-4 py-2 text-sm font-medium bg-danger text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              >
                {isPending ? "Deleting..." : "Delete everything"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
