import { LayoutDashboard, ListChecks, Map, User } from "lucide-react";

const items = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "stream",    label: "Stream",    Icon: ListChecks },
  { id: "roadmap",   label: "Roadmap",   Icon: Map },
  { id: "profile",   label: "Profile",   Icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl">
      <ul className="mx-auto grid max-w-xl grid-cols-4">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                onClick={() => onChange(id)}
                className="group relative flex w-full flex-col items-center gap-1 py-2.5"
                aria-label={label}
              >
                <span
                  className={`flex h-10 w-12 items-center justify-center rounded-xl transition-all ease-soft ${
                    isActive
                      ? "bg-gradient-primary text-primary-foreground gl-glow"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
