import type { Metadata } from "next";
import { AgentCard } from "@/components/agents/agent-card";
import { mockAgents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Agents | Mini Mission Control",
  description: "Overview of OpenClaw agents and their current status.",
};

export default function AgentsPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Agents</p>
          <h1 className="text-4xl font-semibold tracking-tight">Operational roster</h1>
          <p className="text-base text-slate-400">
            Mock data for now. Replace with the live Agent Registry API when the backend is ready.
          </p>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mockAgents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </section>
      </div>
    </div>
  );
}
