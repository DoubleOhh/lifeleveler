import { Check, Lock, Sparkles } from "lucide-react";

const stateConfig = {
  done:     { ring: "border-success bg-success text-background", line: "bg-success", chip: "bg-success/15 text-success" },
  active:   { ring: "border-primary bg-gradient-primary text-primary-foreground gl-glow animate-pulse-glow", line: "bg-border", chip: "bg-primary/15 text-primary-glow" },
  upcoming: { ring: "border-border bg-surface text-muted-foreground", line: "bg-border", chip: "bg-muted text-muted-foreground" },
};

export default function MilestoneStepper({ milestones }) {
  return (
    <ol className="relative">
      {milestones.map((m, i) => {
        const cfg = stateConfig[m.state];
        const isLast = i === milestones.length - 1;
        return (
          <li key={m.id} className="relative flex gap-4 pb-6">
            {!isLast && (
              <span
                aria-hidden
                className={`absolute left-[19px] top-10 h-[calc(100%-1.5rem)] w-0.5 ${cfg.line}`}
              />
            )}

            <div
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${cfg.ring}`}
            >
              {m.state === "done"   && <Check className="h-5 w-5" strokeWidth={3} />}
              {m.state === "active" && <Sparkles className="h-5 w-5" />}
              {m.state === "upcoming" && <Lock className="h-4 w-4" />}
            </div>

            <div className="flex-1 gl-card p-4">
              <span className={`gl-chip ${cfg.chip}`}>{m.horizon}</span>
              <h4 className="mt-2 text-base font-bold text-foreground">{m.title}</h4>
              {m.state === "active" && (
                <p className="mt-2 text-xs text-muted-foreground">
                  3 of 5 sub-quests complete · keep your streak alive 🔥
                </p>
              )}
              {m.state === "done" && (
                <p className="mt-2 text-xs text-success">Conquered · +800 XP</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
