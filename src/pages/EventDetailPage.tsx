import { useParams, useNavigate } from "react-router";
import EventCard from "../components/EventCard";
import { allEvents } from "../data/mockData";
function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = allEvents.find((e) => e.id === id);
  
  if (event === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No event found with ID "{id}".
      </div>
    );
  }

  return (
    <div>
      <h2
        className="mb-4 text-2xl font-bold text-gray-900
dark:text-white"
      >
        {event.title}
      </h2>
      <div className="max-w-sm">
        <EventCard event={event} />
      </div>
      <button
        onClick={() => navigate("/events")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm
font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Events
      </button>
    </div>
  );
}
export default EventDetailPage;
