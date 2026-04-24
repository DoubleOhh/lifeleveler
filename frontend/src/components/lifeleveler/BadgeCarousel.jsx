const tierStyles = {
  Gold:   "from-xp/30 to-xp/0 border-xp/40 text-xp",
  Silver: "from-primary-glow/25 to-primary-glow/0 border-primary-glow/40 text-primary-glow",
  Bronze: "from-streak/25 to-streak/0 border-streak/40 text-streak",
};

export default function BadgeCarousel({ badges }) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <h3 className="text-base font-bold text-foreground">Skill Badges</h3>
          <p className="text-xs text-muted-foreground">{badges.length} earned this season</p>
        </div>
        <button className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
          View all →
        </button>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-3">
          {badges.map((b) => (
            <li
              key={b.id}
              className={`group relative flex h-32 w-28 shrink-0 flex-col items-center justify-center rounded-2xl border bg-gradient-to-b ${tierStyles[b.tier]} p-3 text-center transition-transform ease-soft hover:-translate-y-1`}
            >
              <span className="text-3xl drop-shadow">{b.icon}</span>
              <span className="mt-2 text-sm font-bold text-foreground leading-tight">
                {b.name}
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider opacity-80">
                {b.tier}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
