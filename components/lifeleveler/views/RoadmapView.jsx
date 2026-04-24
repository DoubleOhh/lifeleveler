import MilestoneStepper from "../MilestoneStepper.jsx";
import { milestones } from "@/data/mockData.js";

export default function RoadmapView() {
  const done = milestones.filter((m) => m.state === "done").length;
  const pct = Math.round((done / milestones.length) * 100);

  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      <header className="px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-glow">
          Growth Roadmap
        </p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight">
          From IC to <span className="gl-gradient-text">Director</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {done} of {milestones.length} milestones conquered · {pct}% to North Star
        </p>
      </header>

      <div className="gl-card p-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>5-year trajectory</span>
          <span className="text-foreground">{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-primary transition-all duration-700 ease-soft"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <MilestoneStepper milestones={milestones} />
    </div>
  );
}
