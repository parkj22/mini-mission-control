export type AgentStatus = {
  id: string;
  name: string;
  state: "idle" | "running" | "error";
  task: string;
  updatedAt: string;
};

export type ProcessStatus = {
  id: string;
  name: string;
  owner: string;
  eta: string;
  status: "running" | "pending" | "completed";
};

export type LogEntry = {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
};

export type ApiUsage = {
  provider: string;
  tokens: number;
  costUsd: number;
  trend: "up" | "down" | "flat";
};

export type MissionControlSnapshot = {
  summary: {
    activeAgents: number;
    runningTasks: number;
    apiCostToday: number;
  };
  agents: AgentStatus[];
  processes: ProcessStatus[];
  logs: LogEntry[];
  apiUsage: ApiUsage[];
};

const now = new Date();

export const mockSnapshot: MissionControlSnapshot = {
  summary: {
    activeAgents: 3,
    runningTasks: 5,
    apiCostToday: 0.82,
  },
  agents: [
    {
      id: "mini",
      name: "Mini",
      state: "running",
      task: "Monitoring Slack + heartbeats",
      updatedAt: new Date(now.getTime() - 60 * 1000).toISOString(),
    },
    {
      id: "scribe",
      name: "Scribe",
      state: "idle",
      task: "Awaiting transcription job",
      updatedAt: new Date(now.getTime() - 5 * 60 * 1000).toISOString(),
    },
    {
      id: "runner",
      name: "Runner",
      state: "error",
      task: "Node pairing diagnostics",
      updatedAt: new Date(now.getTime() - 12 * 60 * 1000).toISOString(),
    },
  ],
  processes: [
    {
      id: "proc-1",
      name: "Heartbeat monitor",
      owner: "Mini",
      eta: "Live",
      status: "running",
    },
    {
      id: "proc-2",
      name: "Mission control UI draft",
      owner: "Mini",
      eta: "12m",
      status: "running",
    },
    {
      id: "proc-3",
      name: "Workspace backup",
      owner: "Ops",
      eta: "2h",
      status: "pending",
    },
  ],
  logs: [
    {
      id: "log-1",
      timestamp: new Date(now.getTime() - 30 * 1000).toISOString(),
      level: "info",
      message: "Heartbeat_OK | Slack #mini-dev",
    },
    {
      id: "log-2",
      timestamp: new Date(now.getTime() - 90 * 1000).toISOString(),
      level: "warn",
      message: "API usage > 80% of budget (Codex)",
    },
    {
      id: "log-3",
      timestamp: new Date(now.getTime() - 5 * 60 * 1000).toISOString(),
      level: "info",
      message: "New branch feature/project-setup created",
    },
    {
      id: "log-4",
      timestamp: new Date(now.getTime() - 12 * 60 * 1000).toISOString(),
      level: "error",
      message: "Runner: Node pairing failed",
    },
  ],
  apiUsage: [
    {
      provider: "OpenAI / gpt-5.1-codex",
      tokens: 12450,
      costUsd: 0.62,
      trend: "up",
    },
    {
      provider: "Gemini 2.0 Flash",
      tokens: 4800,
      costUsd: 0.11,
      trend: "flat",
    },
    {
      provider: "Anthropic",
      tokens: 0,
      costUsd: 0,
      trend: "flat",
    },
  ],
};
