"use client";

import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import AddItemModal from "./AddItemModal";

export default function AddItemButton({ budgetId }: { budgetId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-accent text-sidebar rounded-lg hover:bg-accent-light transition-colors"
      >
        <IconPlus size={15} />
        Add item
      </button>
      {open && (
        <AddItemModal budgetId={budgetId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
