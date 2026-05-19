"use client";

import { useState, useTransition } from "react";
import { updateCurrency } from "@/lib/actions/settings";
import { CURRENCIES, getCurrencySymbol } from "@/lib/currencies";


export { getCurrencySymbol };

export default function CurrencySelector({ current }: { current: string }) {
  const [value, setValue] = useState(current);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setSaved(false);
    startTransition(async () => {
      await updateCurrency({ currency: newValue });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {saved && <span className="text-xs text-success font-medium">Saved</span>}
      <select
        value={value}
        onChange={handleChange}
        disabled={isPending}
        className="px-3 py-1.5 text-sm bg-canvas border border-border rounded-lg text-content-text focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol} — {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}
