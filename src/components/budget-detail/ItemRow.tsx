"use client";

import { useState, useTransition } from "react";
import { IconTrash, IconRepeat, IconEdit } from "@tabler/icons-react";
import { deleteBudgetItem } from "@/lib/actions/budgetItem";
import { useCurrency } from "../providers/CurrencyProfider";
import EditItemModal from "./EditItemModal";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface Props {
  item: {
    id: string;
    label: string;
    amount: number;
    tag: string | null;
    isRecurring: boolean;
    recurrenceType: string | null;
    date: Date;
  };
  budgetId: string;
  color: string;
}

export default function ItemRow({ item, budgetId, color }: Props) {
  const currency = useCurrency();
  const [isPending, startTransition] = useTransition();
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBudgetItem(item.id, budgetId);
      setShowConfirm(false);
    });
  };

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-canvas/40 transition-colors">
        {/* Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-medium"
          style={{ background: `${color}18`, color }}
        >
          {item.label[0].toUpperCase()}
        </div>

        {/* Label + meta */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-content-text truncate">
            {item.label}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            {item.isRecurring && (
              <span className="flex items-center gap-1 text-[10px] text-content-muted">
                <IconRepeat size={10} />
                {item.recurrenceType}
              </span>
            )}
            <span className="text-[10px] text-content-muted">
              {new Date(item.date).toLocaleDateString("en-KE", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>

        {/* Tag */}
        {item.tag && (
          <span
            className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{ background: `${color}18`, color }}
          >
            {item.tag}
          </span>
        )}

        {/* Amount */}
        <p className="text-sm font-medium font-mono text-content-text flex-shrink-0">
          {currency} {item.amount.toLocaleString()}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setShowEdit(true)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-content-muted hover:bg-border hover:text-content-text transition-colors"
          >
            <IconEdit size={14} />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={isPending}
            className="w-7 h-7 rounded-md flex items-center justify-center text-content-muted hover:text-danger hover:bg-danger/5 transition-colors"
          >
            <IconTrash size={14} />
          </button>
        </div>
      </div>

      {showEdit && (
        <EditItemModal
          budgetId={budgetId}
          item={item}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          title="Delete item"
          description={`Are you sure you want to delete "${item.label}"? This cannot be undone.`}
          confirmLabel="Delete item"
          onConfirm={handleDelete}
          onClose={() => setShowConfirm(false)}
          isPending={isPending}
        />
      )}
    </>
  );
}
