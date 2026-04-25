import { useEffect, useMemo, useState } from "react";
import MilestoneStepper from "../MilestoneStepper.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
const DEMO_USER_ID = 1;

function formatGoalDeadline(deadline) {
  if (!deadline) {
    return "No deadline";
  }

  const parsedDate = new Date(deadline);
  if (Number.isNaN(parsedDate.getTime())) {
    return "No deadline";
  }

  return parsedDate.toLocaleDateString();
}

export default function RoadmapView() {
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: "", deadline: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadGoals = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/users/${DEMO_USER_ID}/goals`);
        if (!response.ok) {
          throw new Error("Unable to load roadmap goals.");
        }

        const data = await response.json();
        if (!isMounted) {
          return;
        }

        setGoals(data);
        setSelectedGoalId((currentSelectedGoalId) =>
          currentSelectedGoalId ?? data[0]?.id ?? null
        );
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Unable to load roadmap goals.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadGoals();

    return () => {
      isMounted = false;
    };
  }, []);

  const milestones = useMemo(
    () =>
      goals.map((goal) => ({
        id: goal.id,
        title: goal.title,
        horizon: formatGoalDeadline(goal.deadline),
        state: goal.state,
      })),
    [goals]
  );

  const selectedGoal = useMemo(
    () => goals.find((goal) => goal.id === selectedGoalId) ?? null,
    [goals, selectedGoalId]
  );

  const done = milestones.filter((m) => m.state === "done").length;
  const pct = milestones.length ? Math.round((done / milestones.length) * 100) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: DEMO_USER_ID,
          title: formData.title,
          description: formData.description,
          deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null,
          category: "career",
          state: "upcoming",
          progress_percent: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create goal.");
      }

      const createdGoal = await response.json();
      setGoals((prevGoals) => [...prevGoals, createdGoal]);
      setSelectedGoalId(createdGoal.id);
      setIsAdding(false);
      setFormData({ title: "", deadline: "", description: "" });
    } catch (submitError) {
      setError(submitError.message || "Unable to create goal.");
    } finally {
      setIsSubmitting(false);
    }
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
            {selectedGoal?.title ?? "No goals yet"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {goals.map((goal) => (
              <DropdownMenuItem
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
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

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

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
              disabled={isSubmitting}
              className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="gl-card p-4 text-sm text-muted-foreground">Loading roadmap...</div>
      ) : (
        <MilestoneStepper milestones={milestones} />
      )}
    </div>
  );
}
