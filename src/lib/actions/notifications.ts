"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getUtilization } from "@/components/budgets/UtilizationBadge";

export type AppNotification = {
  id: string;
  budgetId: string;
  budgetName: string;
  budgetColor: string;
  message: string;
  severity: "critical" | "high";
  pct: number;
};

export async function getNotifications(): Promise<AppNotification[]> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return [];

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      budgets: {
        where: { archived: false },
        include: { items: true },
      },
    },
  });

  if (!user) return [];

  const notifications: AppNotification[] = [];

  for (const budget of user.budgets) {
    const spent = budget.items.reduce((s, i) => s + i.amount, 0);
    const { pct, status } = getUtilization(spent, budget.allocation);

    if (status === "critical") {
      notifications.push({
        id: `${budget.id}-critical`,
        budgetId: budget.id,
        budgetName: budget.name,
        budgetColor: budget.color,
        message: `Over budget — ${Math.round(pct)}% used`,
        severity: "critical",
        pct,
      });
    } else if (status === "high") {
      notifications.push({
        id: `${budget.id}-high`,
        budgetId: budget.id,
        budgetName: budget.name,
        budgetColor: budget.color,
        message: `Approaching limit — ${Math.round(pct)}% used`,
        severity: "high",
        pct,
      });
    }
  }

  // Critical first, then high
  return notifications.sort((a, b) => b.pct - a.pct);
}
