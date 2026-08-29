import type { Event, ApiRSVP, NewRSVP } from "../types/index";

export const API_URL = "http://localhost:3001";

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) {
    throw new Error("Could not load events");
  }
  return res.json();
}

export async function fetchEventById(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/events?id=${id}`);
  if (!res.ok) {
    throw new Error("Could not load that event");
  }
  const matches: Event[] = await res.json();
  if (matches.length === 0) {
    throw new Error(`No event found with id "${id}".`);
  }
  return matches[0];
}

export async function fetchRSVPs(): Promise<ApiRSVP[]> {
  const res = await fetch(`${API_URL}/rsvps`);
  if (!res.ok) {
    throw new Error("Could not load rsvps");
  }
  return res.json();
}

export async function createRSVP(newRSVP: NewRSVP): Promise<ApiRSVP> {
  const res = await fetch(`${API_URL}/rsvps`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRSVP),
  });
  if (!res.ok) {
    throw new Error("Could not save the rsvp");
  }
  return res.json();
}
