import { useState } from "react";
import { Link } from "react-router";
import EventCard from "../components/EventCard";
import { allEvents } from "../data/mockData";
function EventsPage() {
  const [events, setEvents] = useState(allEvents);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    const filtered = allEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.id.toLowerCase().includes(term),
    );
    setEvents(filtered);
  };
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Events
        </h2>
        <input
          type="text"
          placeholder="Search events..."
          onChange={handleSearch}
          className="rounded border border-gray-300 px-3 py-1.5
            text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2
            lg:grid-cols-3"
      >
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block transition-transform hover:-translate-y-1"
          >
            <EventCard event={event} />
          </Link>
        ))}
        {events.length === 0 && (
          <p className="col-span-full text-gray-500 dark:text-gray-400">
            No events found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
export default EventsPage;
