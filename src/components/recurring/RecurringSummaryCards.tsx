'use client'

import { useCurrency } from '../providers/CurrencyProfider'
import { IconRepeat, IconCalendar, IconCoin, IconTrendingUp } from '@tabler/icons-react'

interface Props {
  totalMonthlyCommitment: number
  monthlyCount: number
  weeklyCount: number
  yearlyCount: number
  dailyCount: number
}

export default function RecurringSummaryCards({
  totalMonthlyCommitment,
  monthlyCount,
  weeklyCount,
  yearlyCount,
  dailyCount,
}: Props) {
  const currency = useCurrency()

  const totalCount = monthlyCount + weeklyCount + yearlyCount + dailyCount
  const yearlyEquivalent = totalMonthlyCommitment * 12

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="relative bg-surface border border-border rounded-xl p-4 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-accent">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-content-muted uppercase tracking-wider mb-2">
          <IconCoin size={13} />
          Monthly commitment
        </div>
        <p className="text-2xl md:text-3xl font-medium text-content-text tracking-tight leading-none mb-1.5 font-mono">
          {currency} {Math.round(totalMonthlyCommitment).toLocaleString()}
        </p>
        <p className="text-xs text-content-muted">per month (all converted)</p>
      </div>

      <div className="relative bg-surface border border-border rounded-xl p-4 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-info">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-content-muted uppercase tracking-wider mb-2">
          <IconTrendingUp size={13} />
          Yearly equivalent
        </div>
        <p className="text-2xl md:text-3xl font-medium text-content-text tracking-tight leading-none mb-1.5 font-mono">
          {currency} {Math.round(yearlyEquivalent).toLocaleString()}
        </p>
        <p className="text-xs text-content-muted">projected annual spend</p>
      </div>

      <div className="relative bg-surface border border-border rounded-xl p-4 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-success">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-content-muted uppercase tracking-wider mb-2">
          <IconRepeat size={13} />
          Total recurring
        </div>
        <p className="text-2xl md:text-3xl font-medium text-content-text tracking-tight leading-none mb-1.5">
          {totalCount}
        </p>
        <p className="text-xs text-content-muted">active recurring items</p>
      </div>

      <div className="relative bg-surface border border-border rounded-xl p-4 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-warning">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-content-muted uppercase tracking-wider mb-2">
          <IconCalendar size={13} />
          Breakdown
        </div>
        <div className="flex flex-col gap-1 mt-1">
          {[
            { label: 'Monthly', count: monthlyCount },
            { label: 'Weekly', count: weeklyCount },
            { label: 'Yearly', count: yearlyCount },
            { label: 'Daily', count: dailyCount },
          ].filter(r => r.count > 0).map(({ label, count }) => (
            <div key={label} className="flex justify-between text-xs">
              <span className="text-content-muted">{label}</span>
              <span className="font-medium text-content-text">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}