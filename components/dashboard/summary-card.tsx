import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  helper?: string;
}

export function SummaryCard({ title, value, helper }: SummaryCardProps) {
  return (
    <Card className="bg-gradient-to-b from-slate-900/80 to-slate-900 text-slate-100 border-slate-800 shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {helper ? (
          <p className="text-xs text-slate-400 mt-1">{helper}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
