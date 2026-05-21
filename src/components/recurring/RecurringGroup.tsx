"use client";

import { useCurrency } from "../providers/CurrencyProfider";
import { IconRepeat } from "@tabler/icons-react";

interface RecurringItem {
  id: string;
  label: string;
  amount: number;
  recurrenceType: string | null;
  budgetName: string;
  budgetColor: string;
  budgetCategory: string;
  tag: string | null;
}

interface Props {
  title: string;
  items: RecurringItem[];
  monthlyNote?: string;
}

export default function RecurringGroup({ title, items, monthlyNote }: Props) {
  const currency = useCurrency();

  if (items.length === 0) return null;

  const total = items.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Group header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-canvas/50">
        <div className="flex items-center gap-2">
          <IconRepeat size={14} className="text-accent" />
          <span className="text-sm font-medium text-content-text">{title}</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium font-mono text-content-text">
            {currency} {total.toLocaleString()}
          </p>
          {monthlyNote && (
            <p className="text-[10px] text-content-muted">{monthlyNote}</p>
          )}
        </div>
      </div>

      {/* Items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-canvas/40 transition-colors"
        >
          {/* Color dot + icon */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-medium"
            style={{
              background: `${item.budgetColor}18`,
              color: item.budgetColor,
            }}
          >
            {item.label[0].toUpperCase()}
          </div>

          {/* Label + budget */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-content-text truncate">
              {item.label}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: item.budgetColor }}
              />
              <p className="text-[11px] text-content-muted truncate">
                {item.budgetName} · {item.budgetCategory}
              </p>
            </div>
          </div>

          {/* Tag */}
          {item.tag && (
            <span
              className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{
                background: `${item.budgetColor}18`,
                color: item.budgetColor,
              }}
            >
              {item.tag}
            </span>
          )}

          {/* Amount */}
          <p className="text-sm font-medium font-mono text-content-text flex-shrink-0">
            {currency} {item.amount.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
