import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AgentStatus } from "@/lib/data";

const stateCopy: Record<AgentStatus["state"], { label: string; color: string }> = {
  running: { label: "Running", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40" },
  idle: { label: "Idle", color: "bg-slate-500/10 text-slate-300 border-slate-500/40" },
  error: { label: "Error", color: "bg-rose-500/10 text-rose-300 border-rose-500/40" },
};

interface AgentGridProps {
  agents: AgentStatus[];
}

export function AgentGrid({ agents }: AgentGridProps) {
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-100">Agents</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-100">{agent.name}</p>
              <Badge className={stateCopy[agent.state].color}>{stateCopy[agent.state].label}</Badge>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{agent.task}</p>
            <p className="text-xs text-slate-500">
              Updated {new Date(agent.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
