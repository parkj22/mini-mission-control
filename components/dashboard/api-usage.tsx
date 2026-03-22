import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApiUsage } from "@/lib/data";

const trendColor: Record<ApiUsage["trend"], string> = {
  up: "text-emerald-300",
  down: "text-rose-300",
  flat: "text-slate-400",
};

interface ApiUsageProps {
  usage: ApiUsage[];
}

export function ApiUsagePanel({ usage }: ApiUsageProps) {
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-100">API Usage (today)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {usage.map((provider) => (
          <div
            key={provider.provider}
            className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-100">
                {provider.provider}
              </p>
              <p className="text-xs text-slate-500">
                {provider.tokens.toLocaleString()} tokens
              </p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-slate-100">
                ${provider.costUsd.toFixed(2)}
              </p>
              <p className={`text-xs ${trendColor[provider.trend]}`}>{provider.trend}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
