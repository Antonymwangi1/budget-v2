"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import {
  IconEdit,
  IconArchive,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react";
import { archiveBudget, unarchiveBudget, deleteBudget } from "@/lib/actions/budget";
import BudgetModal from "./BudgetModel";
import ConfirmModal from "@/components/ui/ConfirmModal";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 90;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < dropdownHeight + 16;

      setDropdownStyle({
        top: openUpward
          ? rect.top + window.scrollY - dropdownHeight - 4
          : rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen((v) => !v);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleArchive = () => {
    startTransition(async () => {
      await archiveBudget(budget.id);
      setOpen(false);
    });
  };

  const handleUnarchive = () => {
    startTransition(async () => {
      await unarchiveBudget(budget.id);
      setOpen(false);
    });
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBudget(budget.id);
      setShowConfirm(false);
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

        <button
          ref={buttonRef}
          onClick={handleOpen}
          className="w-7 h-7 rounded-md flex items-center justify-center text-content-muted hover:bg-border hover:text-content-text transition-colors"
        >
          <IconDotsVertical size={14} />
        </button>
      </div>

      {/* Dropdown rendered at fixed position — escapes overflow:hidden */}
      {open && (
        <div
          ref={dropdownRef}
          className="fixed z-50 bg-surface border border-border rounded-lg shadow-md w-36 py-1 text-sm"
          style={{ top: dropdownStyle.top, right: dropdownStyle.right }}
        >
          {!budget.archived ? (
            <button
              onClick={handleArchive}
              disabled={isPending}
              className="w-full flex items-center gap-2 px-3 py-2 text-content-muted hover:bg-canvas hover:text-content-text transition-colors"
            >
              <IconArchive size={14} />
              Archive
            </button>
          ) : (
            <button
              onClick={handleUnarchive}
              disabled={isPending}
              className="w-full flex items-center gap-2 px-3 py-2 text-content-muted hover:bg-canvas hover:text-content-text transition-colors"
            >
              <IconArchive size={14} />
              Unarchive
            </button>
          )}
          <button
            onClick={() => {
              setShowConfirm(true);
              setOpen(false);
            }}
            disabled={isPending}
            className="w-full flex items-center gap-2 px-3 py-2 text-danger hover:bg-danger/5 transition-colors"
          >
            <IconTrash size={14} />
            Delete
          </button>
        </div>
      )}

      {showEdit && (
        <BudgetModal onClose={() => setShowEdit(false)} existing={budget} />
      )}

      {showConfirm && (
        <ConfirmModal
          title="Delete budget"
          description={`Are you sure you want to delete "${budget.name}"? All items inside this budget will also be permanently deleted.`}
          confirmLabel="Delete budget"
          onConfirm={handleDelete}
          onClose={() => setShowConfirm(false)}
          isPending={isPending}
        />
      )}
    </>
  );
}
