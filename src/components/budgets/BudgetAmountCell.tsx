'use client'

import { useCurrency } from "../providers/CurrencyProfider"

export default function BudgetAmountCell({ amount }: { amount: number }) {
  const currency = useCurrency()
  return (
    <span className="text-sm text-content-text">
      {currency} {amount.toLocaleString()}
    </span>
  )
}