"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const BudgetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  allocation: z.coerce.number().positive("Must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid color"),
});

async function getUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthenticated");
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");
  return user;
}

export async function createBudget(formData: unknown) {
  const user = await getUser();
  const parsed = BudgetSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.budget.create({
    data: { ...parsed.data, userId: user.id },
  });

  revalidatePath("/dashboard/budgets");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateBudget(id: string, formData: unknown) {
  const user = await getUser();
  const parsed = BudgetSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await prisma.budget.updateMany({
    where: { id, userId: user.id },
    data: parsed.data,
  });

  revalidatePath("/dashboard/budgets");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function archiveBudget(id: string) {
  const user = await getUser();

  await prisma.budget.updateMany({
    where: { id, userId: user.id },
    data: { archived: true },
  });

  revalidatePath("/dashboard/budgets");
  return { success: true };
}

export async function deleteBudget(id: string) {
  const user = await getUser();

  await prisma.budget.deleteMany({
    where: { id, userId: user.id },
  });

  revalidatePath("/dashboard/budgets");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getBudgets() {
  const user = await getUser();

  return prisma.budget.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}
