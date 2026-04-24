import { Check, Clock, Flame, Sparkles, Zap } from "lucide-react";

const priorityStyles = {
  High:   "bg-destructive/15 text-destructive border-destructive/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low:    "bg-primary-glow/15 text-primary-glow border-primary-glow/30",
};

const categoryIcon = {
  Product:     "🧭",
  Network:     "🤝",
  Learn:       "📚",
  Data:        "📊",
  Communicate: "🎙️",
};

export default function TaskCard({ task, onToggle }) {
  const { title, priority, estimate, xp, done, category } = task;

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-4 transition-all ease-soft ${
        done
          ? "border-success/30 bg-success/5"
          : "border-border bg-surface hover:border-primary/40 hover:-translate-y-0.5"
      }`}
    >
      {!done && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent"
        />
      )}

      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          aria-pressed={done}
          aria-label={done ? "Mark as not done" : "Mark as done"}
          className={`relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition-all ease-soft ${
            done
              ? "border-success bg-success text-background animate-task-pop"
              : "border-border bg-surface-elevated hover:border-primary hover:animate-pulse-glow"
          }`}
        >
          {done && <Check className="h-4 w-4" strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>{categoryIcon[category] || "✨"}</span>
            <span>{category}</span>
            <span>·</span>
            <span className={`gl-chip border ${priorityStyles[priority]}`}>{priority}</span>
          </div>

          <h4
            className={`mt-1.5 text-[15px] font-semibold leading-snug ${
              done ? "text-muted-foreground line-through" : "text-foreground"
            }`}
          >
            {title}
          </h4>

          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {estimate}
            </span>
            <span className="flex items-center gap-1 font-bold text-xp">
              <Zap className="h-3.5 w-3.5" />
              +{xp} XP
            </span>
            {priority === "High" && !done && (
              <span className="flex items-center gap-1 text-streak">
                <Flame className="h-3.5 w-3.5" />
                Streak boost
              </span>
            )}
            {done && (
              <span className="ml-auto flex items-center gap-1 font-semibold text-success">
                <Sparkles className="h-3.5 w-3.5" />
                Earned
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
