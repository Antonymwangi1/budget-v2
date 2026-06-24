# Budget V2

A modern, production quality personal finance web app built with Next.js 16, Prisma, and Clerk. Track budgets, monitor spending, and understand your financial habits without the complexity of enterprise software.

**Live demo:** [budget-set-v2.vercel.app](https://budget-set-v2.vercel.app)

---

## Features

- **Budget tracking** - Create budgets for any category. Custom categories supported. Name it anything from "Housing" to "Custom PC Build"
- **Budget items** - Log expenses against each budget with tags, dates, and recurring support
- **Recurring expenses** - Mark items as recurring (daily, weekly, monthly, yearly) and see your total monthly commitment at a glance
- **Smart notifications** - Bell alerts when any budget hits 90% (High) or 100% (Critical) utilization
- **Dashboard analytics** - Spending by category bar chart, allocation donut chart, and 6-month area trend line all powered by Recharts with real database data
- **Utilization badges** - Healthy / High / Critical badges with color-coded progress bars on every budget
- **Multi-currency** - KES, USD, EUR, GBP, NGN, UGX, TZS and more switch any time in settings
- **Light and dark mode** - Gruvbox-inspired design system with `data-theme` toggle, persisted in localStorage
- **Fully responsive** - Mobile first layout with hamburger drawer sidebar on small screens
- **Auth** - Managed authentication via Clerk with styled sign in and sign up forms

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS v3 + Gruvbox CSS variable design system |
| Auth | Clerk (managed auth, webhooks) |
| Database | PostgreSQL - local dev, Supabase production |
| ORM | Prisma 6 with `@prisma/adapter-pg` driver adapter |
| Charts | Recharts |
| Client state | Zustand |
| Validation | Zod |
| Icons | Tabler Icons |
| Font | Plus Jakarta Sans + JetBrains Mono |
| Deployment | Vercel |

---

## Architecture decisions

**App Router + Server Components** - Data fetching happens on the server by default. Pages like the dashboard and budgets list are Server Components that query the database directly no API routes, no `useEffect`, no loading spinners for initial renders. Client Components handle only interactivity (modals, charts, toggles).

**Server Actions for mutations** - Create, update, archive, and delete operations use Next.js Server Actions instead of REST API routes. This eliminates boilerplate, keeps mutations type safe end to end, and allows `revalidatePath()` to refresh server data automatically after every change.

**Prisma 6 driver adapter pattern** - Uses `@prisma/adapter-pg` with a `pg` Pool instead of the old singleton pattern. This gives explicit control over connection pooling, works correctly in serverless environments, and is the Prisma 6 recommended approach.

**CurrencyProvider context** - Currency is fetched once at the dashboard layout level and distributed via React context. No component below the layout needs to hit the database for currency zero redundant queries.

**Ownership validation on all mutations** - Every Server Action that modifies data includes `userId` in the Prisma `where` clause alongside the record `id`. This prevents any authenticated user from modifying another user's data even if they know the record ID.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                   # Landing page (auth-aware)
│   ├── sign-in/                   # Clerk sign-in (catch-all)
│   ├── sign-up/                   # Clerk sign-up (catch-all)
│   ├── dashboard/
│   │   ├── layout.tsx             # Sidebar + topbar shell
│   │   ├── page.tsx               # Dashboard analytics
│   │   ├── budgets/
│   │   │   ├── page.tsx           # Budgets list
│   │   │   └── [budgetId]/
│   │   │       └── page.tsx       # Budget detail + items
│   │   ├── recurring/
│   │   │   └── page.tsx           # Recurring items
│   │   └── settings/
│   │       └── page.tsx           # User settings
│   └── api/
│       └── webhooks/
│           └── clerk/
│               └── route.ts       # Clerk user.created webhook
├── components/
│   ├── layout/                    # Sidebar, Topbar, NotificationBell, ThemeToggle
│   ├── dashboard/                 # InsightCard, SpendingBarChart, AllocationDonut, SpendingTrend
│   ├── budgets/                   # BudgetModal, BudgetActions, UtilizationBadge
│   ├── budget-detail/             # AddItemModal, EditItemModal, ItemRow, BudgetSummaryCards
│   ├── recurring/                 # RecurringGroup, RecurringSummaryCards
│   ├── settings/                  # CurrencySelector, ManageAccountButton, DeleteAllButton
│   ├── providers/                 # CurrencyProvider (React context)
│   └── ui/                        # ConfirmModal (reusable)
├── lib/
│   ├── prisma.ts                  # PrismaClient singleton with pg driver adapter
│   ├── currencies.ts              # Currency codes, labels, symbols — shared server/client
│   ├── store.ts                   # Zustand UI store (sidebar open state)
│   ├── dashboard.ts               # getDashboardData server function
│   └── actions/
│       ├── budget.ts              # Budget Server Actions
│       ├── budgetItem.ts          # Budget item Server Actions
│       ├── recurring.ts           # Recurring data fetching
│       ├── notifications.ts       # Notification computation
│       ├── settings.ts            # Settings Server Actions
│       └── user.ts                # User currency fetching
└── middleware.ts                  # Clerk route protection
```

---

## Local development

### Prerequisites

- Node.js 18+
- PostgreSQL running locally
- A Clerk account

### Setup

**1. Clone the repository:**

```bash
git clone https://github.com/Antonymwangi1/budget-v2.git
cd budget-v2
```

**2. Install dependencies:**

```bash
npm install
```

**3. Create environment files:**

Create `.env`:

```bash
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/budget-v2-db"
DIRECT_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/budget-v2-db"
CLERK_WEBHOOK_SECRET="whsec_placeholder"
```

Create `.env.local`:

```bash
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/budget-v2-db"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
CLERK_WEBHOOK_SECRET="whsec_placeholder"
```

**4. Create the local database:**

```bash
psql -U postgres -c "CREATE DATABASE budget-v2-db;"
```

**5. Run migrations:**

```bash
npx prisma migrate dev
```

**6. Seed the database:**

Get your Clerk user ID by visiting `/api/me` after starting the dev server, then update `prisma/seed.ts` with your real values and run:

```bash
npm run seed
```

**7. Start the dev server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Roadmap

- [ ] Clerk production mode + webhook for automatic user creation
- [ ] Reports page with monthly breakdown and CSV export
- [ ] Budget search and filter on the budgets page
- [ ] PWA manifest for mobile install
- [ ] M-Pesa Daraja API integration for automatic transaction import
- [ ] Notification history and read/unread state

---

## Author

**Antony Mwangi** — Full-stack developer based in Nairobi, Kenya

- GitHub: [@Antonymwangi1](https://github.com/Antonymwangi1)
- LinkedIn: [linkedin.com/in/antony-mwangi](https://linkedin.com/in/antony-mwangi)

---

*Built as both a portfolio piece and a personal daily use tool.*