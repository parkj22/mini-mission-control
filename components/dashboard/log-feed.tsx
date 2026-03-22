import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LogEntry } from "@/lib/data";

const levelColor: Record<LogEntry["level"], string> = {
  info: "bg-sky-500/10 text-sky-300 border-sky-500/40",
  warn: "bg-amber-500/10 text-amber-300 border-amber-500/40",
  error: "bg-rose-500/10 text-rose-300 border-rose-500/40",
};

interface LogFeedProps {
  logs: LogEntry[];
}

export function LogFeed({ logs }: LogFeedProps) {
  return (
    <Card className="bg-slate-900/60 border-slate-800 h-full">
      <CardHeader>
        <CardTitle className="text-slate-100">Latest Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3">
                <Badge className={`${levelColor[log.level]} capitalize`}>{log.level}</Badge>
                <div>
                  <p className="text-sm text-slate-100">{log.message}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
