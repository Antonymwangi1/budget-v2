import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getDashboardData() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthenticated");

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      budgets: {
        where: { archived: false },
        include: { items: true },
      },
    },
  });

  if (!user) throw new Error("User not found");

  const budgets = user.budgets;

  const totalAllocation = budgets.reduce((sum, b) => sum + b.allocation, 0);
  const totalSpent = budgets.reduce(
    (sum, b) => sum + b.items.reduce((s, i) => s + i.amount, 0),
    0,
  );
  const remaining = totalAllocation - totalSpent;
  const overBudgetCount = budgets.filter((b) => {
    const spent = b.items.reduce((s, i) => s + i.amount, 0);
    return spent >= b.allocation;
  }).length;

  const categoryData = budgets.map((b) => {
    const spent = b.items.reduce((s, i) => s + i.amount, 0);
    return {
      name: b.category,
      allocation: b.allocation,
      spent,
      color: b.color,
    };
  });

  const allocationSplit = budgets.map((b) => ({
    name: b.name,
    value: b.allocation,
    color: b.color,
  }));

  // Trend — last 6 months bucketed by month
  const now = new Date();
  const trend = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const month = date.toLocaleString("en-US", { month: "short" });
    const spent = budgets
      .flatMap((b) => b.items)
      .filter((item) => {
        const d = new Date(item.date);
        return (
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      })
      .reduce((s, i) => s + i.amount, 0);
    return { month, spent };
  });

  return {
    totalAllocation,
    totalSpent,
    remaining,
    overBudgetCount,
    categoryData,
    allocationSplit,
    trend,
    currency: user.currency,
  };
}
