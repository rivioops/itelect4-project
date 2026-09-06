import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../components/EventCard";
import { fetchEventById } from "../api/client";
import type { Event } from "../types/index";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery<Event>({
    queryKey: ["events", id],
    queryFn: () => fetchEventById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return (
      <div className="animate-pulse rounded-xl border border-border bg-muted h-40 max-w-sm" />
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
        Event Detail
      </p>
      <h2 className="mb-6 text-2xl font-bold text-foreground">{data.title}</h2>
      <EventCard event={data} />
      <button
        onClick={() => navigate("/events")}
        className="mt-6 rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
      >
        ← Back to Events
      </button>
    </div>
  );
}
export default EventDetailPage;
