interface Props {
  spent: number;
  allocation: number;
}

export function getUtilization(spent: number, allocation: number) {
  if (allocation === 0) return { pct: 0, status: "healthy" as const };
  const pct = (spent / allocation) * 100;
  if (pct >= 100) return { pct, status: "critical" as const };
  if (pct >= 90) return { pct, status: "high" as const };
  return { pct, status: "healthy" as const };
}

const styles = {
  healthy: "bg-success/15 text-[#545000]",
  high: "bg-warning/15 text-[#7a3800]",
  critical: "bg-danger/15 text-[#801800]",
};

const labels = {
  healthy: "Healthy",
  high: "High",
  critical: "Critical",
};

export default function UtilizationBadge({ spent, allocation }: Props) {
  const { status } = getUtilization(spent, allocation);
  return (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
