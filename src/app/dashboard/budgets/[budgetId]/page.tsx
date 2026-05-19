import { getBudgetWithItems } from "@/lib/actions/budgetItem";
import { getUtilization } from "@/components/budgets/UtilizationBadge";
import UtilizationBadge from "@/components/budgets/UtilizationBadge";
import ItemRow from "@/components/budget-detail/ItemRow";
import AddItemButton from "@/components/budget-detail/AddItemButton";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default async function BudgetDetailPage({
  params,
}: {
  params: { budgetId: string };
}) {
  const budget = await getBudgetWithItems(params.budgetId);
  const spent = budget.items.reduce((s, i) => s + i.amount, 0);
  const remaining = budget.allocation - spent;
  const { pct, status } = getUtilization(spent, budget.allocation);

  const progressColor =
    status === "critical"
      ? "bg-danger"
      : status === "high"
        ? "bg-warning"
        : "bg-success";

  return (
    <div className="flex flex-col gap-5">
      {/* Back */}
      <Link
        href="/dashboard/budgets"
        className="flex items-center gap-1.5 text-xs text-content-muted hover:text-content-text transition-colors w-fit"
      >
        <IconArrowLeft size={13} />
        Back to budgets
      </Link>

      {/* Budget header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: budget.color }}
            />
            <h1 className="text-lg font-medium text-content-text">
              {budget.name}
            </h1>
            <UtilizationBadge spent={spent} allocation={budget.allocation} />
          </div>
          <p className="text-xs text-content-muted pl-5">
            {budget.category} · {budget.archived ? "Archived" : "Active"}
          </p>
        </div>
        <AddItemButton budgetId={budget.id} />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Allocation",
            value: budget.allocation,
            color: "before:bg-accent",
          },
          { label: "Spent", value: spent, color: "before:bg-danger" },
          { label: "Remaining", value: remaining, color: "before:bg-info" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={`relative bg-surface border border-border rounded-xl p-4 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] ${color}`}
          >
            <p className="text-[11px] font-medium text-content-muted uppercase tracking-wider mb-2">
              {label}
            </p>
            <p className="text-xl md:text-2xl font-medium text-content-text font-mono tracking-tight">
              {value.toLocaleString()}
            </p>
            <p className="text-[11px] text-content-muted mt-1">KES</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <div className="flex justify-between text-xs text-content-muted mb-2">
          <span>Budget utilization</span>
          <span
            className={
              status === "critical"
                ? "text-danger font-medium"
                : status === "high"
                  ? "text-warning font-medium"
                  : "text-success font-medium"
            }
          >
            {Math.min(Math.round(pct), 100)}% used
          </span>
        </div>
        <div className="h-2.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${progressColor}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-content-text">
            Items ({budget.items.length})
          </h2>
        </div>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {budget.items.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-content-muted">
              No items yet. Add your first one.
            </div>
          )}
          {budget.items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              budgetId={budget.id}
              color={budget.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
