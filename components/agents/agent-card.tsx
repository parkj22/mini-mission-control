import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AgentProfile } from "@/lib/agents";
import { cn } from "@/lib/utils";

const statusStyles = {
  working: {
    border: "border-emerald-500/60",
    badge: "bg-emerald-500/10 text-emerald-200 border-emerald-400/40",
    glow: "shadow-[0_0_45px_rgba(16,185,129,0.35)]",
  },
  idle: {
    border: "border-slate-600/70",
    badge: "bg-slate-500/10 text-slate-200 border-slate-500/30",
    glow: "shadow-none",
  },
  error: {
    border: "border-rose-500/60",
    badge: "bg-rose-500/10 text-rose-200 border-rose-400/40",
    glow: "shadow-[0_0_35px_rgba(244,63,94,0.3)]",
  },
} satisfies Record<AgentProfile["status"], { border: string; badge: string; glow: string }>;

const statusCopy: Record<AgentProfile["status"], string> = {
  working: "Working",
  idle: "Idle",
  error: "Error",
};

function formatTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function AgentCard({ name, role, status, model, lastActive, focus }: AgentProfile) {
  const style = statusStyles[status];

  return (
    <Card
      className={cn(
        "relative overflow-hidden border bg-slate-900/70 text-slate-100 transition hover:-translate-y-0.5",
        style.border,
        status === "working" ? "before:absolute before:inset-[-30%] before:bg-emerald-500/10 before:blur-3xl before:content-['']" : undefined,
        style.glow,
      )}
    >
      <CardHeader className="relative space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          <Badge className={style.badge}>{statusCopy[status]}</Badge>
        </div>
        <p className="text-sm text-slate-400">{role}</p>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-slate-500">Model</p>
          <p className="text-sm font-medium text-slate-100">{model}</p>
        </div>
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-widest text-slate-500">Focus</p>
          <p className="text-sm text-slate-200">{focus}</p>
        </div>
        <p className="text-xs text-slate-500">Last active · {formatTimestamp(lastActive)}</p>
      </CardContent>
    </Card>
  );
}
