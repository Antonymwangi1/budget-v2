"use client";

import { useState, useTransition } from "react";
import {
  IconEdit,
  IconArchive,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react";
import { archiveBudget, deleteBudget } from "@/lib/actions/budget";
import BudgetModal from "./BudgetModel";

interface Props {
  budget: {
    id: string;
    name: string;
    allocation: number;
    category: string;
    color: string;
    archived: boolean;
  };
}

export default function BudgetActions({ budget }: Props) {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleArchive = () => {
    startTransition(async () => {
      await archiveBudget(budget.id);
      setOpen(false);
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${budget.name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteBudget(budget.id);
      setOpen(false);
    });
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowEdit(true)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-content-muted hover:bg-border hover:text-content-text transition-colors"
        >
          <IconEdit size={14} />
        </button>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-content-muted hover:bg-border hover:text-content-text transition-colors"
          >
            <IconDotsVertical size={14} />
          </button>
          {open && (
            <div className="absolute right-0 top-8 z-20 bg-surface border border-border rounded-lg shadow-md w-36 py-1 text-sm">
              {!budget.archived && (
                <button
                  onClick={handleArchive}
                  disabled={isPending}
                  className="w-full flex items-center gap-2 px-3 py-2 text-content-muted hover:bg-canvas hover:text-content-text transition-colors"
                >
                  <IconArchive size={14} />
                  Archive
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="w-full flex items-center gap-2 px-3 py-2 text-danger hover:bg-danger/5 transition-colors"
              >
                <IconTrash size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {showEdit && (
        <BudgetModal onClose={() => setShowEdit(false)} existing={budget} />
      )}
    </>
  );
}
