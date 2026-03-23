import { NextRequest, NextResponse } from "next/server";
import { addEvent, getEvents, type MissionEvent } from "@/server/events";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 25, 100) : 25;
  return NextResponse.json({ events: getEvents(limit) });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<MissionEvent>;
    if (!body.agent || !body.type || !body.message) {
      return NextResponse.json({ error: "agent, type, and message are required" }, { status: 400 });
    }
    const event = addEvent({
      agent: body.agent,
      type: body.type,
      message: body.message,
      timestamp: body.timestamp ?? Date.now(),
    });
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
}
