import type { User, Event, RSVP } from "../types/index";
export const attendee: User = {
  id: 1,
  name: "Regina Angeli Cadeliña",
  email: "regina@example.com",
  role: "attendee",
  isActive: true,
};
export const allEvents: Event[] = [
  {
    id: "EVT-001",
    title: "Tech Conference 2026",
    date: "2026-10-15",
    location: "Main Hall",
  },
  {
    id: "EVT-002",
    title: "React Developer Meetup",
    date: "2026-11-02",
    location: "Room 404",
  },
  {
    id: "EVT-003",
    title: "Startup Pitch Night",
    date: "2026-12-10",
    location: "Auditorium A",
  },
];

export const allRSVPs: RSVP[] = [
  {
    id: 1,
    userId: 1,
    eventId: "EVT-001",
    status: "confirmed",
    timestamp: new Date(),
  },
  {
    id: 2,
    userId: 1,
    eventId: "EVT-002",
    status: "waitlisted",
    timestamp: new Date(),
  },
];
