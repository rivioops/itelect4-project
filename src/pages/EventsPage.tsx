import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../components/EventCard";
import useUiStore from "../store/uiStore";
import { fetchEvents } from "../api/client";
import type { Event } from "../types/index";

function EventsPage() {
  const { data, isPending, isError, error } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);

  if (isPending) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-border bg-muted h-24" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        {error.message} &mdash; is json-server running on port 3001?
      </div>
    );
  }

  const filteredEvents = data.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Browse</p>
          <h2 className="text-2xl font-bold text-foreground">Events</h2>
        </div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search events..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block transition-transform hover:-translate-y-0.5"
          >
            <EventCard event={event} />
          </Link>
        ))}
        {filteredEvents.length === 0 && (
          <p className="col-span-full text-sm text-muted-foreground">
            No events found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
export default EventsPage;
