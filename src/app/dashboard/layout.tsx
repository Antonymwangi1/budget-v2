import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import SidebarCurrencyBadge from "@/components/layout/SidebarCurrencyBadge";
import { CurrencyProvider } from "@/components/providers/CurrencyProfider";
import { getUserCurrency } from "@/lib/actions/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currency = await getUserCurrency();

  return (
    <CurrencyProvider currency={currency}>
      <div className="flex h-screen overflow-hidden bg-canvas">
        <Sidebar currencyBadge={<SidebarCurrencyBadge />} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </CurrencyProvider>
  );
}
