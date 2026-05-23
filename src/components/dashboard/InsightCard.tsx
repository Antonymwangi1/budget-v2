import { ReactNode } from "react";

interface InsightCardProps {
  label: string;
  value: string;
  sub: string;
  accent: "amber" | "green" | "red" | "blue";
  icon: ReactNode;
}

const accentMap = {
  amber: "before:bg-accent",
  green: "before:bg-success",
  red: "before:bg-danger",
  blue: "before:bg-info",
};

export default function InsightCard({
  label,
  value,
  sub,
  accent,
  icon,
}: InsightCardProps) {
  return (
    <div
      className={`
        relative bg-surface border border-border rounded-xl p-4 overflow-hidden
        before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]
        ${accentMap[accent]}
      `}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-content-muted uppercase tracking-wider mb-2">
        {icon}
        {label}
      </div>
      <div className="text-2xl md:text-xl font-medium text-content-text tracking-tight leading-none mb-1.5">
        {value}
      </div>
      <div className="text-xs text-content-muted">{sub}</div>
    </div>
  );
}
