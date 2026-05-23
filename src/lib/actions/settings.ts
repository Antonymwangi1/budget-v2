"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CURRENCIES } from "@/lib/currencies";

const SettingsSchema = z.object({
  currency: z.enum(CURRENCIES.map((c) => c.code) as [string, ...string[]]),
});

async function getUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthenticated");
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");
  return user;
}

export async function getSettings() {
  return getUser();
}

export async function updateCurrency(formData: unknown) {
  const user = await getUser();
  const parsed = SettingsSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.user.update({
    where: { id: user.id },
    data: { currency: parsed.data.currency },
  });

  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteAllData() {
  const user = await getUser();

  await prisma.budget.deleteMany({
    where: { userId: user.id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/budgets");
  revalidatePath("/dashboard/recurring");
  return { success: true };
}
