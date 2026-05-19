"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getRecurringItems() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthenticated");

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      budgets: {
        where: { archived: false },
        include: {
          items: {
            where: { isRecurring: true },
            orderBy: { amount: "desc" },
          },
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  const allItems = user.budgets.flatMap((budget) =>
    budget.items.map((item) => ({
      ...item,
      budgetName: budget.name,
      budgetColor: budget.color,
      budgetCategory: budget.category,
    })),
  );

  const monthly = allItems.filter((i) => i.recurrenceType === "Monthly");
  const weekly = allItems.filter((i) => i.recurrenceType === "Weekly");
  const yearly = allItems.filter((i) => i.recurrenceType === "Yearly");
  const daily = allItems.filter((i) => i.recurrenceType === "Daily");

  // Convert everything to monthly equivalent
  const toMonthly = (item: (typeof allItems)[0]) => {
    switch (item.recurrenceType) {
      case "Daily":
        return item.amount * 30;
      case "Weekly":
        return item.amount * 4.33;
      case "Monthly":
        return item.amount;
      case "Yearly":
        return item.amount / 12;
      default:
        return item.amount;
    }
  };

  const totalMonthlyCommitment = allItems.reduce(
    (sum, item) => sum + toMonthly(item),
    0,
  );

  return {
    allItems,
    grouped: { monthly, weekly, yearly, daily },
    totalMonthlyCommitment,
    currency: user.currency,
  };
}
