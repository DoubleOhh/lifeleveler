import { Flame, Zap } from "lucide-react";

export default function GlobalHeader({ player }) {
  const pct = Math.min(100, Math.round((player.xp / player.xpToNext) * 100));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-xl items-center gap-3 px-4 py-3">
        {/* Level badge */}
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-extrabold shadow-[var(--shadow-glow)]">
          {player.level}
          <span className="absolute -bottom-1 -right-1 rounded-md bg-surface px-1 text-[9px] font-bold uppercase tracking-wider text-primary-glow border border-border">
            Lv
          </span>
        </div>

        {/* XP bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1 text-foreground">
              <Zap className="h-3 w-3 text-xp" />
              {player.xp.toLocaleString()} XP
            </span>
            <span>{player.xpToNext.toLocaleString()}</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="relative h-full rounded-full bg-gradient-xp transition-all duration-700 ease-soft"
              style={{ width: `${pct}%` }}
            >
              <div
                className="absolute inset-0 animate-shine"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="flex h-11 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 font-bold text-foreground">
          <Flame className="h-4 w-4 text-streak" />
          <span>{player.streak}</span>
          <span className="text-[10px] font-semibold uppercase text-muted-foreground">d</span>
        </div>
      </div>
    </header>
  );
}
