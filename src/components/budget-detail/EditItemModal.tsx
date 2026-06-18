"use client";

import { useState, useTransition } from "react";
import { IconX } from "@tabler/icons-react";
import { updateBudgetItem } from "@/lib/actions/budgetItem";

const RECURRENCE_TYPES = ["Daily", "Weekly", "Monthly", "Yearly"];

interface Props {
  budgetId: string;
  item: {
    id: string;
    label: string;
    amount: number;
    tag: string | null;
    isRecurring: boolean;
    recurrenceType: string | null;
    date: Date;
  };
  onClose: () => void;
}

export default function EditItemModal({ budgetId, item, onClose }: Props) {
  const [label, setLabel] = useState(item.label);
  const [amount, setAmount] = useState(String(item.amount));
  const [tag, setTag] = useState(item.tag ?? "");
  const [date, setDate] = useState(
    new Date(item.date).toISOString().split("T")[0],
  );
  const [isRecurring, setIsRecurring] = useState(item.isRecurring);
  const [recurrenceType, setRecurrenceType] = useState(
    item.recurrenceType ?? "Monthly",
  );
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    setError("");
    startTransition(async () => {
      const result = await updateBudgetItem({
        itemId: item.id,
        budgetId,
        formData: {
          label,
          amount,
          tag,
          date,
          isRecurring,
          recurrenceType,
        },
      });
      if (result.error) {
        setError(result.error);
        return;
      }
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface border border-border rounded-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-medium text-content-text">Edit item</h2>
          <button
            onClick={onClose}
            className="text-content-muted hover:text-content-text transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Label */}
          <div>
            <label className="block text-xs font-medium text-content-muted mb-1.5">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text placeholder:text-content-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-content-muted mb-1.5">
                Amount (KES)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text placeholder:text-content-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-content-muted mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block text-xs font-medium text-content-muted mb-1.5">
              Tag{" "}
              <span className="text-content-muted font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. Component, Essential"
              className="w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text placeholder:text-content-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Recurring toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-content-text">Recurring</p>
              <p className="text-xs text-content-muted">
                Repeats on a schedule
              </p>
            </div>
            <button
              onClick={() => setIsRecurring((v) => !v)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                isRecurring ? "bg-accent" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  isRecurring ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Recurrence type */}
          {isRecurring && (
            <div>
              <label className="block text-xs font-medium text-content-muted mb-1.5">
                Recurrence
              </label>
              <div className="grid grid-cols-4 gap-2">
                {RECURRENCE_TYPES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRecurrenceType(r)}
                    className={`
                      px-2 py-1.5 text-xs rounded-lg border transition-colors
                      ${
                        recurrenceType === r
                          ? "border-accent bg-accent/10 text-accent font-medium"
                          : "border-border text-content-muted hover:border-accent/50"
                      }
                    `}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-xs text-danger">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-content-muted border border-border rounded-lg hover:bg-canvas transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-accent text-sidebar rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
