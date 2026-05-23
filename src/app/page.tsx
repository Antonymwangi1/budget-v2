import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import {
  IconChartBar,
  IconWallet,
  IconRepeat,
  IconBell,
  IconChartPie,
  IconCoin,
  IconArrowRight,
  IconCheck,
  IconLayoutDashboard,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconWallet,
    title: "Budget tracking",
    description:
      "Create budgets for anything. Rent, food, a PC build, a holiday trip. Track every shilling in and out.",
    color: "#d79921",
  },
  {
    icon: IconRepeat,
    title: "Recurring expenses",
    description:
      "Mark items as recurring and see your total monthly commitment at a glance before you spend a cent.",
    color: "#83a598",
  },
  {
    icon: IconBell,
    title: "Smart alerts",
    description:
      "Get notified when a budget hits 90% so you can adjust before you overspend.",
    color: "#fb4934",
  },
  {
    icon: IconChartPie,
    title: "Visual insights",
    description:
      "Bar charts, donut charts, and trend lines give you a clear picture of where your money goes.",
    color: "#b8bb26",
  },
  {
    icon: IconCoin,
    title: "Multi-currency",
    description:
      "Works with KES, USD, EUR, GBP, NGN and more. Switch currency any time in settings.",
    color: "#fe8019",
  },
  {
    icon: IconChartBar,
    title: "Spending trends",
    description:
      "See how your spending changes month over month with a 6 month area trend chart.",
    color: "#b16286",
  },
];

const benefits = [
  "Know exactly where your money goes",
  "Never overspend a budget again",
  "Track one-time and recurring expenses",
  "Works on any device mobile and desktop",
  "Your data, your control",
  "Free to use",
];

export default async function LandingPage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  return (
    <div className="min-h-screen" style={{ background: "#1d2021" }}>
      {/* NAVBAR — dark */}
      <nav
        className="sticky top-0 z-10 border-b"
        style={{
          background: "#1d2021",
          borderColor: "rgba(168,153,132,0.12)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "#d79921" }}
            >
              <IconChartBar size={16} color="#1d2021" stroke={2} />
            </div>
            <span
              className="text-base font-medium"
              style={{ color: "#ebdbb2" }}
            >
              Budget Set
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ background: "#d79921", color: "#1d2021" }}
              >
                <IconLayoutDashboard size={15} />
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm transition-colors rounded-lg"
                  style={{ color: "#a89984" }}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{ background: "#d79921", color: "#1d2021" }}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO — dark */}
      <section
        className="border-b"
        style={{ borderColor: "rgba(168,153,132,0.12)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-16 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{
              background: "rgba(215,153,33,0.1)",
              borderColor: "rgba(215,153,33,0.2)",
              color: "#fabd2f",
            }}
          >
            <IconCoin size={13} />
            Personal budget tracking built for real life
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-4"
            style={{ color: "#ebdbb2" }}
          >
            Know where your money
            <br />
            <span style={{ color: "#d79921" }}>goes every month</span>
          </h1>

          <p
            className="text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ color: "#a89984" }}
          >
            Budget V2 is a modern personal finance tool that helps you create
            budgets, track spending, and understand your financial habits
            without the complexity of enterprise software.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
                style={{ background: "#d79921", color: "#1d2021" }}
              >
                <IconLayoutDashboard size={15} />
                Go to your dashboard
                <IconArrowRight size={15} />
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
                  style={{ background: "#d79921", color: "#1d2021" }}
                >
                  Start tracking for free
                  <IconArrowRight size={15} />
                </Link>
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 px-6 py-3 text-sm rounded-lg transition-colors w-full sm:w-auto justify-center border"
                  style={{
                    color: "#a89984",
                    borderColor: "rgba(168,153,132,0.2)",
                  }}
                >
                  Sign in to your account
                </Link>
              </>
            )}
          </div>

          {/* Mini dashboard preview */}
          <div
            className="mt-12 rounded-xl border p-4 text-left max-w-2xl mx-auto"
            style={{
              background: "#282828",
              borderColor: "rgba(168,153,132,0.12)",
            }}
          >
            <div
              className="flex items-center gap-2 mb-4 pb-3 border-b"
              style={{ borderColor: "rgba(168,153,132,0.12)" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#fb4934" }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#fabd2f" }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#b8bb26" }}
              />
              <span className="text-xs ml-2" style={{ color: "#665c54" }}>
                Budget Set — Dashboard
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                {
                  label: "Total budget",
                  value: "KSh 142,500",
                  color: "#d79921",
                },
                { label: "Total spent", value: "KSh 98,240", color: "#b8bb26" },
                { label: "Over budget", value: "2 budgets", color: "#fb4934" },
                { label: "Remaining", value: "KSh 44,260", color: "#83a598" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-lg p-3 border"
                  style={{
                    background: "#3c3836",
                    borderColor: "rgba(168,153,132,0.1)",
                    borderTopColor: card.color,
                    borderTopWidth: 2,
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: "#7c6f64" }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-sm font-medium font-mono"
                    style={{ color: "#ebdbb2" }}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="mt-3 rounded-lg p-3 border"
              style={{
                background: "#3c3836",
                borderColor: "rgba(168,153,132,0.1)",
              }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-[11px]" style={{ color: "#7c6f64" }}>
                  Spending by category
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(215,153,33,0.1)",
                    color: "#d79921",
                  }}
                >
                  This month
                </span>
              </div>
              <div className="flex items-end gap-2 h-12">
                {[
                  { h: "100%", color: "#d79921" },
                  { h: "70%", color: "#b8bb26" },
                  { h: "55%", color: "#83a598" },
                  { h: "35%", color: "#689d6a" },
                  { h: "28%", color: "#b16286" },
                  { h: "42%", color: "#fe8019" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: bar.h,
                      background: bar.color,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS STRIP — light */}
      <section
        className="border-b"
        style={{ background: "#f2ede2", borderColor: "#d5cdb8" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {benefits.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 text-sm"
                style={{ color: "#7c6f64" }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(152,151,26,0.15)" }}
                >
                  <IconCheck size={10} color="#98971a" />
                </div>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES — light */}
      <section style={{ background: "#f2ede2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-medium tracking-tight mb-2"
              style={{ color: "#3c3836" }}
            >
              Everything you need to manage money
            </h2>
            <p
              className="text-sm max-w-md mx-auto"
              style={{ color: "#7c6f64" }}
            >
              Built around how real people actually think about budgeting not
              how accountants do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-5 border transition-colors"
                style={{ background: "#faf7f0", borderColor: "#d5cdb8" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${f.color}18` }}
                >
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <h3
                  className="text-sm font-medium mb-1.5"
                  style={{ color: "#3c3836" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#7c6f64" }}
                >
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — dark */}
      <section
        className="border-t border-b"
        style={{
          background: "#282828",
          borderColor: "rgba(168,153,132,0.12)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-medium tracking-tight mb-2"
              style={{ color: "#ebdbb2" }}
            >
              How it works
            </h2>
            <p className="text-sm" style={{ color: "#a89984" }}>
              Up and running in under two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create your budgets",
                description:
                  "Add budgets for each spending category — housing, food, transport, or anything custom like a PC build or holiday trip.",
              },
              {
                step: "02",
                title: "Log your expenses",
                description:
                  "Add items to each budget as you spend. Mark recurring ones like rent or subscriptions so they show up automatically.",
              },
              {
                step: "03",
                title: "See the full picture",
                description:
                  "Your dashboard updates in real time — charts, utilization badges, and alerts tell you exactly where you stand.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div
                  className="text-3xl font-medium font-mono"
                  style={{ color: "rgba(215,153,33,0.3)" }}
                >
                  {s.step}
                </div>
                <h3
                  className="text-sm font-medium"
                  style={{ color: "#ebdbb2" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#a89984" }}
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — light */}
      <section style={{ background: "#f2ede2" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div
            className="rounded-2xl px-6 py-12 border"
            style={{ background: "#faf7f0", borderColor: "#d5cdb8" }}
          >
            <h2
              className="text-2xl font-medium tracking-tight mb-3"
              style={{ color: "#3c3836" }}
            >
              {isLoggedIn
                ? "Welcome back — your dashboard is ready"
                : "Ready to take control of your finances?"}
            </h2>
            <p
              className="text-sm mb-6 max-w-md mx-auto"
              style={{ color: "#7c6f64" }}
            >
              {isLoggedIn
                ? "Pick up where you left off. Your budgets, items, and insights are waiting."
                : "Join Budget V2 and start understanding your money — for free, no credit card required."}
            </p>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{ background: "#d79921", color: "#1d2021" }}
              >
                <IconLayoutDashboard size={15} />
                Go to dashboard
                <IconArrowRight size={15} />
              </Link>
            ) : (
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{ background: "#d79921", color: "#1d2021" }}
              >
                Get started for free
                <IconArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER — dark */}
      <footer
        className="border-t"
        style={{
          background: "#1d2021",
          borderColor: "rgba(168,153,132,0.12)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: "#d79921" }}
            >
              <IconChartBar size={11} color="#1d2021" stroke={2} />
            </div>
            <span className="text-xs" style={{ color: "#665c54" }}>
              Budget Set
            </span>
          </div>
          <p className="text-xs" style={{ color: "#665c54" }}>
            Built by{" "}
            <span style={{ color: "#a89984", fontWeight: 500 }}>
              Antony Mwangi
            </span>{" "}
            · Nairobi, Kenya
          </p>
        </div>
      </footer>
    </div>
  );
}
