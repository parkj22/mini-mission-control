import { AgentGrid } from "@/components/dashboard/agent-grid";
import { ApiUsagePanel } from "@/components/dashboard/api-usage";
import { LogFeed } from "@/components/dashboard/log-feed";
import { ProcessList } from "@/components/dashboard/process-list";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { TaskBoard } from "@/components/kanban/task-board";
import { Button } from "@/components/ui/button";
import { mockTasks } from "@/lib/tasks";
import { getMissionControlSnapshot } from "@/server/status";
import { ArrowUpRight } from "lucide-react";

export default async function Home() {
  const snapshot = await getMissionControlSnapshot();

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Mini Mission Control</p>
            <h1 className="text-4xl font-semibold tracking-tight">Live agent + runtime overview</h1>
            <p className="text-base text-slate-400">
              Snapshots refresh on load. Wire up Socket.IO/WebSockets later for real-time streaming.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800">
              <a href="/api/status" target="_blank" rel="noreferrer">
                Raw API snapshot
              </a>
            </Button>
            <Button className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              Trigger sync
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Active agents"
            value={snapshot.summary.activeAgents}
            helper={`Updated ${new Date(snapshot.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
          />
          <SummaryCard title="Running tasks" value={snapshot.summary.runningTasks} helper="Includes heartbeats + cron" />
          <SummaryCard title="API cost (today)" value={`$${snapshot.summary.apiCostToday.toFixed(2)}`} helper="Across all providers" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <AgentGrid agents={snapshot.agents} />
          <ApiUsagePanel usage={snapshot.apiUsage} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <ProcessList processes={snapshot.processes} />
          <LogFeed logs={snapshot.logs} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Task board</h2>
              <p className="text-sm text-slate-400">Drag + drop mock tasks across columns.</p>
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-600">Kanban</span>
          </div>
          <TaskBoard tasks={mockTasks} />
        </section>
      </div>
    </div>
  );
}
