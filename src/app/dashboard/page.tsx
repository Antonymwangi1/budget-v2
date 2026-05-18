import { getDashboardData } from "@/lib/dashboard";
import InsightCard from "@/components/dashboard/InsightCard";
import SpendingBarChart from "@/components/dashboard/SpendingBarChart";
import AllocationDonut from "@/components/dashboard/AllocationDonut";
import SpendingTrend from "@/components/dashboard/SpendingTrend";
import {
  IconCoin,
  IconTrendingUp,
  IconAlertTriangle,
  IconPigMoney,
} from "@tabler/icons-react";

export default async function DashboardPage() {
  const data = await getDashboardData();

  const {
    totalAllocation,
    totalSpent,
    remaining,
    overBudgetCount,
    categoryData,
    allocationSplit,
    trend,
    currency,
  } = data;

  const spentPct =
    totalAllocation > 0
      ? ((totalSpent / totalAllocation) * 100).toFixed(1)
      : "0";

  return (
    <div className="flex flex-col gap-5">
      {/* Insight cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <InsightCard
          label="Total budget"
          value={`${currency} ${totalAllocation.toLocaleString()}`}
          sub="This month"
          accent="amber"
          icon={<IconCoin size={13} />}
        />
        <InsightCard
          label="Total spent"
          value={`${currency} ${totalSpent.toLocaleString()}`}
          sub={`${spentPct}% of budget used`}
          accent="green"
          icon={<IconTrendingUp size={13} />}
        />
        <InsightCard
          label="Over budget"
          value={String(overBudgetCount)}
          sub={
            overBudgetCount === 0 ? "All budgets healthy" : "budgets critical"
          }
          accent="red"
          icon={<IconAlertTriangle size={13} />}
        />
        <InsightCard
          label="Remaining"
          value={`${currency} ${remaining.toLocaleString()}`}
          sub="Left to spend"
          accent="blue"
          icon={<IconPigMoney size={13} />}
        />
      </div>

      {/* Bar + Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-[1.8fr_1fr]">
        <SpendingBarChart data={categoryData} currency={currency ?? ""} />
        <AllocationDonut
          data={allocationSplit}
          currency={currency ?? ""}
          totalSpent={totalSpent}
          totalAllocation={totalAllocation}
        />
      </div>

      {/* Trend */}
      <SpendingTrend data={trend} currency={currency ?? ""} />
    </div>
  );
}
