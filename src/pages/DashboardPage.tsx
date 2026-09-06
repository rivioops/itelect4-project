import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import EventCard from "../components/EventCard";
import UserCard from "../components/UserCard";
import type { User, Event } from "../types/index";
import { attendee } from "../data/mockData";
import { fetchEvents } from "../api/client";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: events, isPending, isError } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  return (
    <div>
      {/* Hero banner */}
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-muted">
        <div className="px-10 py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Welcome to
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Event RSVP System
          </h1>
          <p className="mt-3 text-muted-foreground max-w-sm mx-auto text-sm">
            Browse upcoming events, manage your RSVPs, and check your guest details all in one place.
          </p>
          <Link
            to="/events"
            className="mt-6 inline-block rounded-lg border border-foreground bg-foreground px-6 py-2 text-sm font-semibold text-background transition hover:opacity-80"
          >
            Browse Events
          </Link>
        </div>
      </div>

      {/* Selected user indicator */}
      {selectedUser && (
        <p className="mb-4 text-sm font-medium text-foreground">
          Selected: <span className="text-muted-foreground">{selectedUser.name}</span>
        </p>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard user={attendee} onSelect={setSelectedUser} />
        {isPending ? (
          <div className="animate-pulse rounded-xl border border-border bg-muted p-6 h-28" />
        ) : isError ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            Error loading events — is json-server running?
          </div>
        ) : (
          events?.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="block transition-transform hover:-translate-y-0.5">
              <EventCard event={event} variant="compact" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
export default DashboardPage;
