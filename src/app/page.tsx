export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-canvas p-8">
      <h1 className="text-content-text text-2xl font-semibold mb-2">
        Tailwind v3 + Gruvbox — system check
      </h1>
      <p className="text-content-muted text-sm mb-8">
        If every block below has a color, Tailwind is reading the CSS variables
        correctly.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <div className="bg-sidebar rounded-lg p-4">
          <p className="text-sidebar-text text-sm font-medium">bg-sidebar</p>
          <p className="text-sidebar-muted text-xs mt-1">
            #1d2021 — sidebar bg
          </p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-content-text text-sm font-medium">bg-surface</p>
          <p className="text-content-muted text-xs mt-1">
            #faf7f0 — card surface
          </p>
        </div>

        <div className="bg-accent rounded-lg p-4">
          <p className="text-sidebar text-sm font-medium">bg-accent</p>
          <p className="text-sidebar-surface text-xs mt-1">
            #d79921 — gruvbox amber
          </p>
        </div>

        <div className="bg-success rounded-lg p-4">
          <p className="text-sidebar text-sm font-medium">bg-success</p>
          <p className="text-sidebar-surface text-xs mt-1">
            #b8bb26 — gruvbox green
          </p>
        </div>

        <div className="bg-danger rounded-lg p-4">
          <p className="text-sidebar-text text-sm font-medium">bg-danger</p>
          <p className="text-sidebar-muted text-xs mt-1">
            #fb4934 — gruvbox red
          </p>
        </div>

        <div className="bg-info rounded-lg p-4">
          <p className="text-sidebar text-sm font-medium">bg-info</p>
          <p className="text-sidebar-surface text-xs mt-1">
            #83a598 — gruvbox blue
          </p>
        </div>
      </div>
    </div>
  );
}
