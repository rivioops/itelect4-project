import type { Event } from "../types/index";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact";
}

function EventCard({ event, variant = "default" }: EventCardProps) {
  const isCompact = variant === "compact";
  return (
    <div
      className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md ${isCompact ? "p-4" : "p-6"}`}
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
        {event.id}
      </p>
      {!isCompact && (
        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
      )}
      <p className="mt-1 text-sm text-muted-foreground">
        {event.date} &mdash; {event.location}
      </p>
    </div>
  );
}
export default EventCard;
