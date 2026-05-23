import { getRecurringItems } from '@/lib/actions/recurring'
import { getCurrencySymbol } from '@/lib/currencies'
import RecurringSummaryCards from '@/components/recurring/RecurringSummaryCards'
import RecurringGroup from '@/components/recurring/RecurringGroup'
import { IconRepeat } from '@tabler/icons-react'

export default async function RecurringPage() {
  const {
    grouped,
    totalMonthlyCommitment,
    currency,
  } = await getRecurringItems()

  const { monthly, weekly, yearly, daily } = grouped

  const totalCount =
    monthly.length + weekly.length + yearly.length + daily.length

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-base font-medium text-content-text">Recurring</h1>
        <p className="text-xs text-content-muted mt-0.5">
          {totalCount} recurring {totalCount === 1 ? 'item' : 'items'} across all budgets
        </p>
      </div>

      {/* Summary cards */}
      <RecurringSummaryCards
        totalMonthlyCommitment={totalMonthlyCommitment}
        monthlyCount={monthly.length}
        weeklyCount={weekly.length}
        yearlyCount={yearly.length}
        dailyCount={daily.length}
      />

      {/* Empty state */}
      {totalCount === 0 && (
        <div className="bg-surface border border-border rounded-xl px-4 py-16 text-center">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <IconRepeat size={20} className="text-accent" />
          </div>
          <p className="text-sm font-medium text-content-text mb-1">
            No recurring items yet
          </p>
          <p className="text-xs text-content-muted">
            When you add a budget item and mark it as recurring, it will appear here.
          </p>
        </div>
      )}

      {/* Grouped lists */}
      <div className="flex flex-col gap-4">
        <RecurringGroup
          title="Monthly"
          items={monthly}
        />
        <RecurringGroup
          title="Weekly"
          items={weekly}
          monthlyNote={`≈ ${getCurrencySymbol(currency || 'KSh')} ${Math.round(
            weekly.reduce((s, i) => s + i.amount * 4.33, 0)
          ).toLocaleString()} / mo`}
        />
        <RecurringGroup
          title="Yearly"
          items={yearly}
          monthlyNote={`≈ ${getCurrencySymbol(currency || 'KSh')} ${Math.round(
            yearly.reduce((s, i) => s + i.amount / 12, 0)
          ).toLocaleString()} / mo`}
        />
        <RecurringGroup
          title="Daily"
          items={daily}
          monthlyNote={`≈ ${getCurrencySymbol(currency || 'KSh')} ${Math.round(
            daily.reduce((s, i) => s + i.amount * 30, 0)
          ).toLocaleString()} / mo`}
        />
      </div>
    </div>
  )
}