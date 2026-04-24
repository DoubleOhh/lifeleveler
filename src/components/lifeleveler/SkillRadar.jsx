// SVG-based skill radar chart. No external libs.
export default function SkillRadar({ skills }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 96;
  const levels = 4;
  const angleStep = (Math.PI * 2) / skills.length;

  const point = (value, i) => {
    const r = (value / 100) * radius;
    const a = -Math.PI / 2 + i * angleStep;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const polygon = (values) =>
    values.map((v, i) => point(v, i).join(",")).join(" ");

  const currentPts = polygon(skills.map((s) => s.current));
  const targetPts  = polygon(skills.map((s) => s.target));

  return (
    <div className="gl-card p-5">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground">Skill Radar</h3>
          <p className="text-xs text-muted-foreground">Current vs. target for Senior PM</p>
        </div>
        <ul className="flex items-center gap-3 text-[10px] uppercase tracking-wider">
          <li className="flex items-center gap-1 text-primary-glow">
            <span className="h-2 w-2 rounded-full bg-primary-glow" /> You
          </li>
          <li className="flex items-center gap-1 text-xp">
            <span className="h-2 w-2 rounded-full bg-xp" /> Target
          </li>
        </ul>
      </div>

      <div className="mt-2 flex justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-[260px] w-[260px]">
          <defs>
            <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.55" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            </radialGradient>
          </defs>

          {/* concentric grid */}
          {Array.from({ length: levels }).map((_, lvl) => {
            const r = ((lvl + 1) / levels) * radius;
            const pts = skills
              .map((_, i) => {
                const a = -Math.PI / 2 + i * angleStep;
                return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
              })
              .join(" ");
            return (
              <polygon
                key={lvl}
                points={pts}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
            );
          })}

          {/* axes */}
          {skills.map((_, i) => {
            const [x, y] = point(100, i);
            return (
              <line
                key={i}
                x1={cx} y1={cy} x2={x} y2={y}
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
            );
          })}

          {/* target polygon */}
          <polygon
            points={targetPts}
            fill="none"
            stroke="hsl(var(--xp))"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* current polygon */}
          <polygon
            points={currentPts}
            fill="url(#radar-fill)"
            stroke="hsl(var(--primary-glow))"
            strokeWidth="2"
          />
          {skills.map((s, i) => {
            const [x, y] = point(s.current, i);
            return <circle key={i} cx={x} cy={y} r="3.5" fill="hsl(var(--primary-glow))" />;
          })}

          {/* labels */}
          {skills.map((s, i) => {
            const [x, y] = point(118, i);
            return (
              <text
                key={s.name}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}
              >
                {s.name}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
