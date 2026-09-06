import type { ApiRSVP } from "../types/index";

interface RSVPBadgeProps {
  rsvp: ApiRSVP;
  children?: React.ReactNode;
}

const statusColor: Record<ApiRSVP["status"], string> = {
  confirmed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  waitlisted: "bg-muted text-muted-foreground",
};

const RSVPBadge: React.FC<RSVPBadgeProps> = ({ rsvp, children }) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Event {rsvp.eventId}</h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor[rsvp.status]}`}
        >
          {rsvp.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Guest: <span className="font-medium text-foreground">{rsvp.guestName}</span>
      </p>
      <p className="text-sm text-muted-foreground">
        Party of <span className="font-medium text-foreground">{rsvp.guestCount}</span>
      </p>
      {children && (
        <div className="mt-3 rounded-lg bg-muted p-2 text-xs text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
};
export default RSVPBadge;
