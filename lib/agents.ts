export type AgentOperationalStatus = "working" | "idle" | "error";

export type AgentProfile = {
  id: string;
  name: string;
  role: string;
  model: string;
  status: AgentOperationalStatus;
  lastActive: string;
  focus: string;
};

const now = new Date();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60 * 1000).toISOString();

export const mockAgents: AgentProfile[] = [
  {
    id: "mini",
    name: "Mini",
    role: "Lead Engineer",
    model: "GPT-5.1 Codex",
    status: "working",
    lastActive: minutesAgo(1),
    focus: "Mission control orchestration",
  },
  {
    id: "scribe",
    name: "Scribe",
    role: "Transcription Ops",
    model: "Whisper Turbo",
    status: "idle",
    lastActive: minutesAgo(7),
    focus: "Awaiting inbox audio",
  },
  {
    id: "atlas",
    name: "Atlas",
    role: "Infra Guardian",
    model: "Claude 3.7",
    status: "working",
    lastActive: minutesAgo(3),
    focus: "Gateway uptime + node pairing",
  },
  {
    id: "runner",
    name: "Runner",
    role: "Automation Pilot",
    model: "Gemini 2.0 Pro",
    status: "error",
    lastActive: minutesAgo(14),
    focus: "Failed task dispatch",
  },
  {
    id: "pulse",
    name: "Pulse",
    role: "Heartbeat Watch",
    model: "GPT-4.1 Mini",
    status: "working",
    lastActive: minutesAgo(2),
    focus: "Slack + email sweeps",
  },
  {
    id: "quill",
    name: "Quill",
    role: "Writer",
    model: "Claude 3.5 Sonnet",
    status: "idle",
    lastActive: minutesAgo(22),
    focus: "Standing by for memo draft",
  },
  {
    id: "glimmer",
    name: "Glimmer",
    role: "Vision Analyst",
    model: "GPT-4.1 Vision",
    status: "working",
    lastActive: minutesAgo(5),
    focus: "Camera frame triage",
  },
  {
    id: "sentry",
    name: "Sentry",
    role: "Security",
    model: "Llama Guard",
    status: "idle",
    lastActive: minutesAgo(30),
    focus: "Drift detection",
  },
];
