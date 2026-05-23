"use client";

import { useClerk } from "@clerk/nextjs";

export default function ManageAccountButton() {
  const { openUserProfile } = useClerk();

  return (
    <button
      onClick={() => openUserProfile()}
      className="px-3 py-1.5 text-xs border border-border rounded-lg text-content-muted hover:bg-canvas transition-colors flex-shrink-0"
    >
      Manage
    </button>
  );
}
