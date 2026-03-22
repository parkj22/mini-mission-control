'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ActivityTone = "success" | "info" | "warn" | "error";

type ActivityItem = {
  id: string;
  agent: string;
  action: string;
  tone: ActivityTone;
  timestamp: string;
};

const toneStyles: Record<ActivityTone, string> = {
  success: "text-emerald-300",
  info: "text-sky-300",
  warn: "text-amber-300",
  error: "text-rose-300",
};

const seedEvents: Omit<ActivityItem, "id" | "timestamp">[] = [
  { agent: "Mini", action: "synced kanban board", tone: "success" },
  { agent: "Atlas", action: "deployed gateway patch", tone: "info" },
  { agent: "Pulse", action: "sent Slack digest", tone: "success" },
  { agent: "Runner", action: "failed node pairing", tone: "error" },
  { agent: "Quill", action: "drafted mission brief", tone: "info" },
  { agent: "Scribe", action: "completed transcription", tone: "success" },
  { agent: "Glimmer", action: "analyzed camera frame", tone: "info" },
  { agent: "Sentry", action: "raised anomaly warning", tone: "warn" },
  { agent: "Mini", action: "completed task board update", tone: "success" },
];

const MAX_ENTRIES = 12;

export function LiveActivityFeed() {
  const pointerRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ActivityItem[]>(() =>
    seedEvents.slice(0, 5).map((event, index) => ({
      ...event,
      id: `seed-${index}`,
      timestamp: new Date(Date.now() - index * 90 * 1000).toISOString(),
    })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const seed = seedEvents[pointerRef.current % seedEvents.length];
        pointerRef.current += 1;
        const nextItem: ActivityItem = {
          ...seed,
          id: `${seed.agent}-${Date.now()}`,
          timestamp: new Date().toISOString(),
        };
        return [nextItem, ...prev].slice(0, MAX_ENTRIES);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [items]);

  const rendered = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/80 px-3 py-2 text-xs font-mono text-slate-200"
        >
          <div className="flex flex-col">
            <span className="text-slate-400">{item.agent}</span>
            <span className={cn("text-sm", toneStyles[item.tone])}>▸ {item.action}</span>
          </div>
          <Badge className="bg-transparent text-slate-500 border border-slate-800">
            {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Badge>
        </div>
      )),
    [items],
  );

  return (
    <Card className="bg-slate-950/80 border border-slate-800/80 text-slate-100">
      <CardHeader>
        <CardTitle className="text-sm font-semibold tracking-[0.3em] text-slate-400">Live activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={scrollRef}
          className="h-72 space-y-2 overflow-y-auto rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950/60 p-2"
        >
          {rendered}
        </div>
      </CardContent>
    </Card>
  );
}
