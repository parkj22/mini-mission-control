import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProcessStatus } from "@/lib/data";

const statusVariants: Record<ProcessStatus["status"], string> = {
  running: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/40",
  completed: "bg-slate-500/10 text-slate-300 border-slate-500/40",
};

interface ProcessListProps {
  processes: ProcessStatus[];
}

export function ProcessList({ processes }: ProcessListProps) {
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-100">Active Processes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {processes.map((process) => (
          <div
            key={process.id}
            className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-100">{process.name}</p>
              <p className="text-xs text-slate-400">
                Owner · {process.owner} • ETA {process.eta}
              </p>
            </div>
            <Badge className={statusVariants[process.status]}>{process.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
