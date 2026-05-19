"use client";

import { useCurrency } from "../providers/CurrencyProfider";

interface Props {
  allocation: number;
  spent: number;
  remaining: number;
}

export default function BudgetSummaryCards({
  allocation,
  spent,
  remaining,
}: Props) {
  const currency = useCurrency();

  const cards = [
    { label: "Allocation", value: allocation, color: "before:bg-accent" },
    { label: "Spent", value: spent, color: "before:bg-danger" },
    { label: "Remaining", value: remaining, color: "before:bg-info" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map(({ label, value, color }) => (
        <div
          key={label}
          className={`relative bg-surface border border-border rounded-xl p-4 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] ${color}`}
        >
          <p className="text-[11px] font-medium text-content-muted uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-xl md:text-xl font-medium text-content-text tracking-tight">
            {currency} {value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
