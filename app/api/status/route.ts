import { NextResponse } from "next/server";
import { getMissionControlSnapshot } from "@/server/status";

export async function GET() {
  const snapshot = await getMissionControlSnapshot();
  return NextResponse.json(snapshot, { headers: { "Cache-Control": "no-store" } });
}
