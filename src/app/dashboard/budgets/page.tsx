import { getBudgets } from "@/lib/actions/budget";
import UtilizationBadge, {
  getUtilization,
} from "@/components/budgets/UtilizationBadge";
import BudgetActions from "@/components/budgets/BudgetAction";
import CreateBudgetButton from "@/components/budgets/CreateBudgetButton";
import Link from "next/link";

export default async function BudgetsPage() {
  const budgets = await getBudgets();

  const active = budgets.filter((b) => !b.archived);
  const archived = budgets.filter((b) => b.archived);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-medium text-content-text">
            All budgets
          </h1>
          <p className="text-xs text-content-muted mt-0.5">
            {active.length} active · {archived.length} archived
          </p>
        </div>
        <CreateBudgetButton />
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1.4fr_1fr_1fr_80px] px-4 py-2.5 text-[10px] font-medium text-content-muted uppercase tracking-widest border-b border-border bg-canvas/50">
          <div>Budget</div>
          <div>Allocation</div>
          <div>Spent</div>
          <div>Remaining</div>
          <div>Status</div>
          <div />
        </div>

        {budgets.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-content-muted">
            No budgets yet. Create your first one.
          </div>
        )}

        {budgets.map((budget) => {
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
            <div
              key={budget.id}
              className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1.4fr_1fr_1fr_80px] px-4 py-3 border-b border-border/50 last:border-0 hover:bg-canvas/40 transition-colors gap-2 md:gap-0 md:items-center"
            >
              {/* Name */}
              <Link
                href={`/dashboard/budgets/${budget.id}`}
                className="flex items-center gap-2.5 hover:underline underline-offset-2"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: budget.color }}
                />
                <div>
                  <p className="text-sm font-medium text-content-text">
                    {budget.name}
                  </p>
                  <p className="text-[11px] text-content-muted">
                    {budget.category}
                  </p>
                </div>
                {budget.archived && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-border text-content-muted">
                    Archived
                  </span>
                )}
              </Link>

              {/* Allocation */}
              <div className="flex md:block items-center justify-between">
                <span className="text-xs text-content-muted md:hidden">
                  Allocation
                </span>
                <div>
                  <p className="text-sm text-content-text font-mono">
                    {budget.allocation.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-content-muted hidden md:block">
                    KES
                  </p>
                </div>
              </div>

              {/* Spent */}
              <div className="flex md:block items-center justify-between">
                <span className="text-xs text-content-muted md:hidden">
                  Spent
                </span>
                <div>
                  <p className="text-sm text-content-text font-mono">
                    {spent.toLocaleString()}
                  </p>
                  <div className="hidden md:block mt-1 h-1 w-full bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${progressColor}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Remaining */}
              <div className="flex md:block items-center justify-between">
                <span className="text-xs text-content-muted md:hidden">
                  Remaining
                </span>
                <p
                  className={`text-sm font-mono ${
                    remaining < 0 ? "text-danger" : "text-content-text"
                  }`}
                >
                  {remaining.toLocaleString()}
                </p>
              </div>

              {/* Status */}
              <div className="flex md:block items-center justify-between">
                <span className="text-xs text-content-muted md:hidden">
                  Status
                </span>
                <UtilizationBadge
                  spent={spent}
                  allocation={budget.allocation}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <BudgetActions budget={budget} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
