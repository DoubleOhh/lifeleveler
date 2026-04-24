// Mock dataset powering the LifeLeveler demo experience.

export const player = {
  name: "Alex Chen",
  title: "Product Designer → Senior PM",
  level: 12,
  xp: 1840,
  xpToNext: 2400,
  streak: 17,
  careerHealth: 78,
};

export const badges = [
  { id: "b1", name: "Storyteller", icon: "📖", tier: "Gold", earnedAt: "Mar 22" },
  { id: "b2", name: "Data Whisperer", icon: "📊", tier: "Silver", earnedAt: "Apr 02" },
  { id: "b3", name: "Network Builder", icon: "🤝", tier: "Gold", earnedAt: "Apr 09" },
  { id: "b4", name: "Public Speaker", icon: "🎤", tier: "Bronze", earnedAt: "Apr 14" },
  { id: "b5", name: "Strategist", icon: "♟️", tier: "Silver", earnedAt: "Apr 18" },
  { id: "b6", name: "Mentor", icon: "🌱", tier: "Bronze", earnedAt: "Apr 21" },
];

// Activity for the last 7 days. status: "completed" | "partial" | "missed"
export const weeklyActivity = [
  { day: "M", status: "completed", xp: 220 },
  { day: "T", status: "completed", xp: 310 },
  { day: "W", status: "partial", xp: 90 },
  { day: "T", status: "completed", xp: 280 },
  { day: "F", status: "completed", xp: 340 },
  { day: "S", status: "missed", xp: 0 },
  { day: "S", status: "partial", xp: 120 },
];

export const tasks = [
  {
    id: "t1",
    title: "Draft a 1-page PRD for the onboarding redesign",
    category: "Product",
    priority: "High",
    estimate: "25 min",
    xp: 120,
    done: false,
  },
  {
    id: "t2",
    title: "Reach out to 2 PMs at fintech startups on LinkedIn",
    category: "Network",
    priority: "Medium",
    estimate: "15 min",
    xp: 80,
    done: false,
  },
  {
    id: "t3",
    title: "Read 'Inspired' — Chapter 8: Empowered Teams",
    category: "Learn",
    priority: "Low",
    estimate: "20 min",
    xp: 60,
    done: true,
  },
  {
    id: "t4",
    title: "Run SQL query: weekly active users by cohort",
    category: "Data",
    priority: "High",
    estimate: "30 min",
    xp: 140,
    done: false,
  },
  {
    id: "t5",
    title: "Record a 2-min Loom demoing the new prototype",
    category: "Communicate",
    priority: "Medium",
    estimate: "10 min",
    xp: 70,
    done: false,
  },
];

export const milestones = [
  { id: "m1", title: "Ship onboarding v2", horizon: "Q2 · 2025", state: "done" },
  { id: "m2", title: "Lead a cross-functional initiative", horizon: "Q3 · 2025", state: "active" },
  { id: "m3", title: "Promotion to Senior PM", horizon: "1 year", state: "upcoming" },
  { id: "m4", title: "Launch a public side product", horizon: "2 years", state: "upcoming" },
  { id: "m5", title: "Director of Product", horizon: "5 years", state: "upcoming" },
];

// Skill radar — values 0..100
export const skills = [
  { name: "Strategy",   current: 72, target: 90 },
  { name: "Execution",  current: 80, target: 85 },
  { name: "Data",       current: 58, target: 80 },
  { name: "Leadership", current: 50, target: 85 },
  { name: "Comms",      current: 75, target: 88 },
  { name: "Design",     current: 84, target: 80 },
];
