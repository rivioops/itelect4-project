import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../components/EventCard";
import UserCard from "../components/UserCard";
import type { User, Event } from "../types/index";
import { attendee } from "../data/mockData";
import { fetchEvents } from "../api/client";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: events, isPending, isError } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
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
        {isPending ? (
          <div className="animate-pulse rounded-lg bg-gray-200 p-5 dark:bg-gray-700" />
        ) : isError ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">Error loading events</div>
        ) : (
          events?.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))
        )}
      </div>
    </div>
  );
}
export default DashboardPage;
