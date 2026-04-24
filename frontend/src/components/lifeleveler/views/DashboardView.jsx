import BadgeCarousel from "../BadgeCarousel.jsx";
import CareerHealth from "../CareerHealth.jsx";
import SkillRadar from "../SkillRadar.jsx";
import WeeklyOverview from "../WeeklyOverview.jsx";
import { badges, player, skills, weeklyActivity } from "@/data/mockData.js";

export default function DashboardView() {
  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      <div className="px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-glow">
          Welcome back
        </p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight">
          {player.name.split(" ")[0]}, you're <span className="gl-gradient-text">on fire</span>.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{player.title}</p>
      </div>

      <CareerHealth score={player.careerHealth} />
      <BadgeCarousel badges={badges} />
      <WeeklyOverview days={weeklyActivity} />
      <SkillRadar skills={skills} />
    </div>
  );
}
