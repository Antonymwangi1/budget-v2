"use client";

import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import BudgetModal from "./BudgetModel";

export default function CreateBudgetButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-accent text-sidebar rounded-lg hover:bg-accent-light transition-colors"
      >
        <IconPlus size={15} />
        New budget
      </button>
      {open && <BudgetModal onClose={() => setOpen(false)} />}
    </>
  );
}
