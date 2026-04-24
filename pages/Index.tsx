import { useState } from "react";
import GlobalHeader from "@/components/lifeleveler/GlobalHeader.jsx";
import BottomNav from "@/components/lifeleveler/BottomNav.jsx";
import DashboardView from "@/components/lifeleveler/views/DashboardView.jsx";
import ActionStreamView from "@/components/lifeleveler/views/ActionStreamView.jsx";
import RoadmapView from "@/components/lifeleveler/views/RoadmapView.jsx";
import ProfileView from "@/components/lifeleveler/views/ProfileView.jsx";
import { player } from "@/data/mockData.js";

const views = {
  dashboard: DashboardView,
  stream: ActionStreamView,
  roadmap: RoadmapView,
  profile: ProfileView,
};

const Index = () => {
  const [active, setActive] = useState("dashboard");
  const ViewComponent = views[active];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GlobalHeader player={player} />
      <main className="mx-auto max-w-xl px-4 pb-28 pt-5">
        <ViewComponent />
      </main>
      <BottomNav active={active} onChange={setActive} />
    </div>
  );
};

export default Index;
