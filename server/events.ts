export type MissionEvent = {
  agent: string;
  type: string;
  message: string;
  timestamp: number;
};

const MAX_EVENTS = 100;

let events: MissionEvent[] = [
  {
    agent: "Mini",
    type: "info",
    message: "Bootstrapped dashboard runtime",
    timestamp: Date.now() - 1000 * 60 * 5,
  },
  {
    agent: "Atlas",
    type: "warn",
    message: "Gateway latency spike detected",
    timestamp: Date.now() - 1000 * 60 * 3,
  },
  {
    agent: "Pulse",
    type: "success",
    message: "Sent Slack digest",
    timestamp: Date.now() - 1000 * 45,
  },
];

export function getEvents(limit = 25): MissionEvent[] {
  return events.slice(-limit).reverse();
}

export function addEvent(input: MissionEvent): MissionEvent {
  const event = { ...input, timestamp: input.timestamp ?? Date.now() };
  events = [...events, event].slice(-MAX_EVENTS);
  return event;
}

export function resetEvents(seed?: MissionEvent[]) {
  events = seed ? [...seed] : [];
}
