import { mockSnapshot } from "@/lib/data";

export async function getMissionControlSnapshot() {
  // In the future this will call real OpenClaw data sources. For now, return mock data.
  return {
    generatedAt: new Date().toISOString(),
    ...mockSnapshot,
  };
}
