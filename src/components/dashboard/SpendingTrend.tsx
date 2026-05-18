"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { month: string; spent: number }[];
  currency: string;
}

export default function SpendingTrend({ data, currency }: Props) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-content-text">
          Spending trend
        </h2>
        <span className="text-[14px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
          Last 6 months
        </span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d79921" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#d79921" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
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
              `${currency} ${Number(value).toLocaleString()}`,
              "Spent",
            ]}
            contentStyle={{
              background: "var(--color-surface)",
              border: "0.5px solid var(--color-border)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "var(--color-content-text)",
            }}
          />
          <Area
            type="monotone"
            dataKey="spent"
            stroke="#d79921"
            strokeWidth={2}
            fill="url(#spendGrad)"
            dot={{ fill: "#d79921", strokeWidth: 0, r: 3 }}
            activeDot={{
              fill: "#d79921",
              stroke: "var(--color-surface)",
              strokeWidth: 2,
              r: 4,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
