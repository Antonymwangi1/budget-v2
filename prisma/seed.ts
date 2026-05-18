import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const clerkId = "user_3Dtf1cFaLz561shz0J9JcE7l0MR";
  const email = "mwangiantony247@gmail.com";

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {},
    create: { clerkId, email, currency: "KES" },
  });

  const budgets = [
    {
      name: "Rent & Utilities",
      allocation: 50000,
      category: "Housing",
      color: "#d79921",
    },
    {
      name: "Groceries & Food",
      allocation: 32000,
      category: "Food",
      color: "#b8bb26",
    },
    {
      name: "Transport",
      allocation: 20000,
      category: "Transport",
      color: "#83a598",
    },
    {
      name: "Health & Wellness",
      allocation: 15000,
      category: "Health",
      color: "#689d6a",
    },
    {
      name: "Entertainment",
      allocation: 12000,
      category: "Lifestyle",
      color: "#b16286",
    },
    {
      name: "Emergency Savings",
      allocation: 13500,
      category: "Savings",
      color: "#fe8019",
    },
  ];

  for (const b of budgets) {
    await prisma.budget.create({
      data: {
        ...b,
        userId: user.id,
        items: {
          create: [
            {
              label: "Item 1",
              amount: b.allocation * 0.4,
              tag: "Essential",
              date: new Date(),
            },
            {
              label: "Item 2",
              amount: b.allocation * 0.3,
              tag: "Variable",
              date: new Date(),
            },
          ],
        },
      },
    });
  }

  console.log("Seed complete");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
