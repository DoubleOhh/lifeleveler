import { useMemo, useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import TaskCard from "../TaskCard.jsx";
import { tasks as initialTasks } from "@/data/mockData.js";

const filters = ["All", "High", "Medium", "Low"];

export default function ActionStreamView() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? tasks : tasks.filter((t) => t.priority === filter)),
    [tasks, filter]
  );

  const completed = tasks.filter((t) => t.done).length;
  const earned = tasks.filter((t) => t.done).reduce((s, t) => s + t.xp, 0);

  const toggle = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      <header className="px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-glow">
          Today's Action Stream
        </p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight">
          {tasks.length - completed} quests left
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {completed}/{tasks.length} done · {earned} XP earned today
        </p>
      </header>

      <div className="gl-card flex items-center gap-2 p-2">
        <Filter className="ml-2 h-4 w-4 text-muted-foreground" />
        <ul className="flex flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((f) => (
            <li key={f}>
              <button
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  filter === f
                    ? "bg-gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul className="space-y-3">
        {visible.map((t, i) => (
          <li
            key={t.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
          >
            <TaskCard task={t} onToggle={toggle} />
          </li>
        ))}
      </ul>

      <div className="gl-card flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">AI Coach suggestion</p>
          <p className="text-xs text-muted-foreground">
            Pair the SQL quest with the PRD draft — they unlock the "Data-Informed PM" badge.
          </p>
        </div>
      </div>
    </div>
  );
}
