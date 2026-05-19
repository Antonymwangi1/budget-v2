"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ItemSchema = z.object({
  label: z.string().min(1, "Label is required"),
  amount: z.coerce.number().positive("Must be greater than 0"),
  tag: z.string().optional(),
  isRecurring: z.coerce.boolean().optional().default(false),
  recurrenceType: z.string().optional(),
  date: z.string().optional(),
});

async function getUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthenticated");
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");
  return user;
}

export async function getBudgetWithItems(budgetId: string) {
  const user = await getUser();

  const budget = await prisma.budget.findFirst({
    where: { id: budgetId, userId: user.id },
    include: { items: { orderBy: { date: "desc" } } },
  });

  if (!budget) throw new Error("Budget not found");
  return budget;
}

export async function createBudgetItem(budgetId: string, formData: unknown) {
  const user = await getUser();

  const budget = await prisma.budget.findFirst({
    where: { id: budgetId, userId: user.id },
  });
  if (!budget) return { error: "Budget not found" };

  const parsed = ItemSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { isRecurring, recurrenceType, date, ...rest } = parsed.data;

  await prisma.budgetItem.create({
    data: {
      ...rest,
      budgetId,
      isRecurring,
      recurrenceType: isRecurring ? recurrenceType : null,
      date: date ? new Date(date) : new Date(),
    },
  });

  revalidatePath(`/dashboard/budgets/${budgetId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteBudgetItem(itemId: string, budgetId: string) {
  const user = await getUser();

  const item = await prisma.budgetItem.findFirst({
    where: { id: itemId, budget: { userId: user.id } },
  });
  if (!item) return { error: "Item not found" };

  await prisma.budgetItem.delete({ where: { id: itemId } });

  revalidatePath(`/dashboard/budgets/${budgetId}`);
  revalidatePath("/dashboard");
  return { success: true };
}
