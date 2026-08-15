import RSVPBadge from "../components/RSVPBadge";
import { allRSVPs } from "../data/mockData";
function RSVPsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My RSVPs
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {allRSVPs.map((r) => (
          <RSVPBadge key={r.id} rsvp={r}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Registered for Event: {r.eventId}
            </p>
          </RSVPBadge>
        ))}
      </div>
    </div>
  );
}
export default RSVPsPage;
