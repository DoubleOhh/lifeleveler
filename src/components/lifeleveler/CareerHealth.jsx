import { Heart, TrendingUp } from "lucide-react";

export default function CareerHealth({ score }) {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  return (
    <div className="gl-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Career Health
          </p>
          <h2 className="mt-1 text-xl font-bold text-foreground">Strong momentum</h2>
        </div>
        <span className="gl-chip bg-success/15 text-success">
          <TrendingUp className="h-3 w-3" /> +6 this week
        </span>
      </div>

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
            <defs>
              <linearGradient id="health-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
              </linearGradient>
            </defs>
            <circle
              cx="70" cy="70" r={radius}
              stroke="hsl(var(--muted))" strokeWidth="12" fill="none"
            />
            <circle
              cx="70" cy="70" r={radius}
              stroke="url(#health-grad)" strokeWidth="12" fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              className="transition-all duration-1000 ease-soft"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Heart className="h-4 w-4 text-primary-glow" />
            <span className="text-3xl font-extrabold text-foreground tabular-nums">{score}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              / 100
            </span>
          </div>
        </div>

        <ul className="flex-1 space-y-2 text-sm">
          <Stat label="Consistency" value="92%" tone="primary" />
          <Stat label="Skill growth" value="+14%" tone="xp" />
          <Stat label="Network reach" value="48 ppl" tone="muted" />
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  const dot =
    tone === "primary" ? "bg-primary" : tone === "xp" ? "bg-xp" : "bg-muted-foreground";
  return (
    <li className="flex items-center justify-between rounded-lg bg-surface-elevated/60 px-3 py-2">
      <span className="flex items-center gap-2 text-muted-foreground">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </span>
      <span className="font-bold text-foreground tabular-nums">{value}</span>
    </li>
  );
}
