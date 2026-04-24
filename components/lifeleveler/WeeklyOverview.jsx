const dot = {
  completed: "bg-success shadow-[0_0_12px_hsl(var(--success)/0.6)]",
  partial:   "bg-warning",
  missed:    "bg-muted",
};

export default function WeeklyOverview({ days }) {
  const totalXP = days.reduce((s, d) => s + d.xp, 0);
  return (
    <div className="gl-card p-5">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground">Weekly Overview</h3>
          <p className="text-xs text-muted-foreground">Last 7 days · {totalXP} XP earned</p>
        </div>
        <Legend />
      </div>

      <ul className="mt-4 grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <li key={i} className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {d.day}
            </span>
            <span className={`h-3 w-3 rounded-full ${dot[d.status]}`} />
            <span className="text-[10px] font-bold tabular-nums text-foreground/80">
              {d.xp}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Legend() {
  return (
    <ul className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
      <li className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Done</li>
      <li className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Partial</li>
      <li className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-muted" /> Missed</li>
    </ul>
  );
}
