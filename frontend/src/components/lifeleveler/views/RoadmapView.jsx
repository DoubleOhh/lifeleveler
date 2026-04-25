import { useState } from "react";
import MilestoneStepper from "../MilestoneStepper.jsx";
import { milestones } from "@/data/mockData.js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

const dummyGoals = [
  { id: "1", title: "Reach LeetCode Hard" },
  { id: "2", title: "Add 500 LinkedIn Contacts" },
  { id: "3", title: "Build a portfolio website" },
  { id: "4", title: "Master Python" },
];

export default function RoadmapView() {
  const [selectedGoal, setSelectedGoal] = useState(dummyGoals[0].title);
  const done = milestones.filter((m) => m.state === "done").length;
  const pct = Math.round((done / milestones.length) * 100);

  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      <header className="px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-glow">
          Growth Roadmap
        </p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight">
          From IC to <span className="gl-gradient-text">Director</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {done} of {milestones.length} milestones conquered · {pct}% to North Star
        </p>
      </header>


      <div className="py-4 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
  <span>Goal</span>
  
  <DropdownMenu>
    <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border border-border px-3 py-1.5 text-foreground hover:bg-muted transition-colors">
      {selectedGoal}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      {dummyGoals.map((goal) => (
        <DropdownMenuItem
          key={goal.id}
          onClick={() => setSelectedGoal(goal.title)}
          className="cursor-pointer"
        >
          {goal.title}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>

  <button 
    className="inline-flex items-center justify-center rounded-md border border-border p-1.5 text-foreground hover:bg-muted transition-colors"
    aria-label="Add new goal"
  >
    <Plus size={16} />
  </button>
</div>

      <MilestoneStepper milestones={milestones} />
    </div>
  );
}
