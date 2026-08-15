import type { RSVP } from "../types/index";
interface RSVPBadgeProps {
  rsvp: RSVP;
  children?: React.ReactNode;
}
const RSVPBadge: React.FC<RSVPBadgeProps> = ({ rsvp, children }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        RSVP Details
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        <span className="font-semibold">Event ID:</span>{" "}
        {rsvp.eventId}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        <span className="font-semibold">Status:</span>{" "}
        <span className="capitalize">{rsvp.status}</span>
      </p>
      {children && (
        <div className="mt-3 rounded bg-green-50 p-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
          {children}
        </div>
      )}
    </div>
  );
};
export default RSVPBadge;
