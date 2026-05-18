"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { name: string; value: number; color: string }[];
  currency: string;
  totalSpent: number;
  totalAllocation: number;
}

export default function AllocationDonut({
  data,
  currency,
  totalSpent,
  totalAllocation,
}: Props) {
  const pct =
    totalAllocation > 0 ? Math.round((totalSpent / totalAllocation) * 100) : 0;

  return (
    <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-content-text">
          Allocation split
        </h2>
        <span className="text-[14px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
          {data.length} budgets
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={52}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `${currency} ${Number(value).toLocaleString()}`,
                  "",
                ]}
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "0.5px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "var(--color-content-text)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm font-medium text-content-text">
              {pct}%
            </span>
            <span className="text-[10px] text-content-muted">used</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          {data.map((entry, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: entry.color }}
              />
              <span className="text-content-text truncate">{entry.name}</span>
              <span className="ml-auto text-content-muted flex-shrink-0">
                {Math.round((entry.value / totalAllocation) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
