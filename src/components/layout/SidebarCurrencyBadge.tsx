import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { getCurrencySymbol } from '@/components/settings/CurrencySelector'

export default async function SidebarCurrencyBadge() {
  try {
    const { userId: clerkId } = await auth()
    if (!clerkId) return null
    const user = await prisma.user.findUnique({ where: { clerkId } })
    if (!user) return null
    return (
      <span className="ml-auto text-[10px] font-medium text-accent bg-accent/10 px-1.5 py-0.5 rounded-sm tracking-wide">
        {getCurrencySymbol(user.currency || 'KES')}
      </span>
    )
  } catch {
    return null
  }
}