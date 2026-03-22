export type TaskStatus = "backlog" | "in-progress" | "done";

export type MissionTask = {
  id: string;
  title: string;
  tags: string[];
  owner: string;
  timestamp: string;
  status: TaskStatus;
};

const now = new Date();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60 * 1000).toISOString();

export const mockTasks: MissionTask[] = [
  {
    id: "task-1",
    title: "Wire up OpenClaw heartbeat feed",
    tags: ["infra", "cron"],
    owner: "Mini",
    timestamp: minutesAgo(5),
    status: "in-progress",
  },
  {
    id: "task-2",
    title: "Draft mission-control brief",
    tags: ["docs"],
    owner: "Quill",
    timestamp: minutesAgo(25),
    status: "backlog",
  },
  {
    id: "task-3",
    title: "Node pairing diagnostics",
    tags: ["ops", "priority"],
    owner: "Runner",
    timestamp: minutesAgo(15),
    status: "in-progress",
  },
  {
    id: "task-4",
    title: "Daily Slack digest",
    tags: ["comm"],
    owner: "Pulse",
    timestamp: minutesAgo(60),
    status: "done",
  },
  {
    id: "task-5",
    title: "Gemini cost sweep",
    tags: ["cost", "api"],
    owner: "Atlas",
    timestamp: minutesAgo(10),
    status: "backlog",
  },
  {
    id: "task-6",
    title: "Calendar automation",
    tags: ["automation"],
    owner: "Mini",
    timestamp: minutesAgo(80),
    status: "done",
  },
  {
    id: "task-7",
    title: "Realtime socket bridge",
    tags: ["feature"],
    owner: "Atlas",
    timestamp: minutesAgo(3),
    status: "in-progress",
  },
];
