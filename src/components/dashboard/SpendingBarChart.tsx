"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  data: {
    name: string;
    allocation: number;
    spent: number;
    color: string;
  }[];
  currency: string;
}

export default function SpendingBarChart({ data, currency }: Props) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-medium text-content-text">
          Spending by category
        </h2>
        <span className="text-[14px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
          This month
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--color-content-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-content-muted)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value) => [
              `${currency} ${Number(value).toLocaleString()}`,,
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
          <Bar dataKey="allocation" radius={[3, 3, 0, 0]} opacity={0.25}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="spent" radius={[3, 3, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
