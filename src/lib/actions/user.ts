"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { getCurrencySymbol } from "../currencies";

export async function getUserCurrency(): Promise<string> {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return "Ksh";

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) return "Ksh";

    return getCurrencySymbol(user.currency || "Ksh");
  } catch {
    return "Ksh";
  }
}
