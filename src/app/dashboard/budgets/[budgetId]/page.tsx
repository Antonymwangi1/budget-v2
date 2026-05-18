export default function BudgetDetailPage({
  params,
}: {
  params: { budgetId: string };
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-content-muted text-sm">
        Budget detail for {params.budgetId} — coming in Phase 7
      </p>
    </div>
  );
}
