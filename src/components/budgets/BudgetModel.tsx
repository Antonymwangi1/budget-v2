"use client";

import { useState, useTransition } from "react";
import { IconX } from "@tabler/icons-react";
import { createBudget, updateBudget } from "@/lib/actions/budget";
import { getCurrencySymbol } from "../settings/CurrencySelector";

const COLORS = [
  "#d79921",
  "#b8bb26",
  "#83a598",
  "#689d6a",
  "#fe8019",
  "#b16286",
  "#458588",
  "#fb4934",
  "#fabd2f",
];

const CATEGORIES = [
  "Housing",
  "Food",
  "Transport",
  "Health",
  "Savings",
  "Lifestyle",
  "Education",
  "Custom",
];

interface Props {
  onClose: () => void;
  existing?: {
    id: string;
    name: string;
    allocation: number;
    currency: string;
    category: string;
    color: string;
  };
}

export default function BudgetModal({ onClose, existing }: Props) {
  const [name, setName] = useState(existing?.name ?? "");
  const [allocation, setAllocation] = useState(
    String(existing?.allocation ?? ""),
  );
  const [category, setCategory] = useState(existing?.category ?? "Housing");
  const [customCategory, setCustomCategory] = useState("");
  const [color, setColor] = useState(existing?.color ?? "#d79921");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isCustom = category === "Custom";
  const finalCategory = isCustom ? customCategory : category;
    
  const handleSubmit = () => {
    setError("");
    startTransition(async () => {
      const payload = { name, allocation, category: finalCategory, color };
      const result = existing
        ? await updateBudget(existing.id, payload)
        : await createBudget(payload);

      if (result.error) {
        setError(result.error);
        return;
      }
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface border border-border rounded-xl w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-medium text-content-text">
            {existing ? "Edit budget" : "New budget"}
          </h2>
          <button
            onClick={onClose}
            className="text-content-muted hover:text-content-text transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-content-muted mb-1.5">
              Budget name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Custom PC Build"
              className="w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text placeholder:text-content-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Allocation */}
          <div>
            <label className="block text-xs font-medium text-content-muted mb-1.5">
              Allocation
            </label>
            <input
              type="number"
              value={allocation}
              onChange={(e) => setAllocation(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text placeholder:text-content-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-content-muted mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`
                    px-2 py-1.5 text-xs rounded-lg border transition-colors
                    ${
                      category === cat
                        ? "border-accent bg-accent/10 text-accent font-medium"
                        : "border-border text-content-muted hover:border-accent/50 hover:text-content-text"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
            {isCustom && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g. Tech & Gadgets"
                className="mt-2 w-full px-3 py-2 text-sm bg-canvas border border-border rounded-lg text-content-text placeholder:text-content-muted focus:outline-none focus:border-accent transition-colors"
              />
            )}
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-medium text-content-muted mb-1.5">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ background: c }}
                  className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                    color === c
                      ? "ring-2 ring-offset-2 ring-content-text scale-110"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 bg-canvas rounded-lg px-3 py-2.5 border border-border">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            <span className="text-sm font-medium text-content-text truncate">
              {name || "Budget name"}
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium ml-1 flex-shrink-0"
              style={{
                background: `${color}20`,
                color: color,
              }}
            >
              {finalCategory || "Category"}
            </span>
            <span className="ml-auto text-sm font-medium text-content-text flex-shrink-0">
               {Number(allocation || 0).toLocaleString()}
            </span>
          </div>

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
            {isPending
              ? "Saving..."
              : existing
                ? "Save changes"
                : "Create budget"}
          </button>
        </div>
      </div>
    </div>
  );
}
