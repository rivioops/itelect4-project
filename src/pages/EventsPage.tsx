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
    return <div className="animate-pulse p-6">Loading events...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} -- is json-server running on port 3001?
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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Events
        </h2>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search events..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded border border-gray-300 px-3 py-1.5
            text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block transition-transform hover:-translate-y-1"
          >
            <EventCard event={event} />
          </Link>
        ))}
        {filteredEvents.length === 0 && (
          <p className="col-span-full text-gray-500 dark:text-gray-400">
            No events found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
export default EventsPage;
