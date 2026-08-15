import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import UserCard from "../components/UserCard";
import type { User } from "../types/index";
import { attendee, allEvents } from "../data/mockData";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
        Could not load events.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsError(true)}
            className="rounded bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-200"
          >
            Simulate Error
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        {selectedUser && (
          <p className="font-semibold text-blue-600 dark:text-blue-400">
            Selected: {selectedUser.name}
          </p>
        )}
        <button
          onClick={() => console.log("Show details")}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
        >
          Show Details
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        <UserCard user={attendee} onSelect={setSelectedUser} />
        {isLoading ? (
          <div className="animate-pulse rounded-lg bg-gray-200 p-5 dark:bg-gray-700" />
        ) : (
          allEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))
        )}
      </div>
    </div>
  );
}
export default DashboardPage;
