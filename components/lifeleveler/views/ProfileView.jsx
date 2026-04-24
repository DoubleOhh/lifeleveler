import { Award, Flame, Target, Zap } from "lucide-react";
import { badges, player } from "@/data/mockData.js";

const stats = [
  { label: "Level",   value: player.level,          Icon: Award,  tone: "text-primary-glow" },
  { label: "XP",      value: player.xp.toLocaleString(), Icon: Zap,    tone: "text-xp" },
  { label: "Streak",  value: `${player.streak}d`,   Icon: Flame,  tone: "text-streak" },
  { label: "Badges",  value: badges.length,         Icon: Target, tone: "text-success" },
];

export default function ProfileView() {
  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      <div className="gl-card overflow-hidden">
        <div className="h-24 bg-gradient-primary" />
        <div className="-mt-10 px-5 pb-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-surface-elevated text-3xl font-extrabold gl-gradient-text">
            {player.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <h2 className="mt-3 text-xl font-extrabold">{player.name}</h2>
          <p className="text-sm text-muted-foreground">{player.title}</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, Icon, tone }) => (
          <li key={label} className="gl-card p-4">
            <Icon className={`h-5 w-5 ${tone}`} />
            <p className="mt-2 text-2xl font-extrabold tabular-nums">{value}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
          </li>
        ))}
      </ul>

      <div className="gl-card p-5">
        <h3 className="text-base font-bold">North Star</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Become a Director of Product who ships beloved AI-native software within 5 years.
        </p>
      </div>
    </div>
  );
}
