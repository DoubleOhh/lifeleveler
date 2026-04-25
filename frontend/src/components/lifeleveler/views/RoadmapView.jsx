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
  // 1. All hooks must be at the top level
  const [selectedGoal, setSelectedGoal] = useState(dummyGoals[0].title);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: "", deadline: "", description: "" });

  const done = milestones.filter((m) => m.state === "done").length;
  const pct = Math.round((done / milestones.length) * 100);

  // 2. Form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Goal Submitted:", formData);
    setIsAdding(false);
    setFormData({ title: "", deadline: "", description: "" });
  };

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

      {/* Goal & Input Section */}
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
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center justify-center rounded-md border border-border p-1.5 text-foreground hover:bg-muted transition-colors"
          aria-label="Add new goal"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Conditional Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 p-4 border border-border rounded-md bg-muted/20 animate-in fade-in slide-in-from-top-2"
        >
          <div>
            <label className="text-xs font-semibold block mb-1">Title</label>
            <input
              required
              type="text"
              className="w-full rounded-md border border-input p-2 text-sm bg-background"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1">Deadline</label>
            <input
              required
              type="date"
              className="w-full rounded-md border border-input p-2 text-sm bg-background"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1">Description</label>
            <textarea
              required
              rows={3}
              className="w-full rounded-md border border-input p-2 text-sm bg-background"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      <MilestoneStepper milestones={milestones} />
    </div>
  );
}