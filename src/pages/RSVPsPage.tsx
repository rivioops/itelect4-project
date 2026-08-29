import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RSVPBadge from "../components/RSVPBadge";
import { fetchRSVPs, createRSVP } from "../api/client";
import type { ApiRSVP } from "../types/index";

function RSVPsPage() {
  const [eventId, setEventId] = useState("");
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery<ApiRSVP[]>({
    queryKey: ["rsvps"],
    queryFn: fetchRSVPs,
  });

  const addRSVP = useMutation({
    mutationFn: createRSVP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      setEventId("");
    },
  });

  const handleAdd = (): void => {
    addRSVP.mutate({
      userId: 1, // hardcoded user for now
      eventId: eventId,
      status: "pending",
      timestamp: new Date().toISOString(),
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading RSVPs...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load RSVPs.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My RSVPs
      </h2>
      
      <div className="mb-6 flex gap-2 max-w-sm">
        <input
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          placeholder="Event ID (e.g. EVT-001)"
          className="w-full rounded border border-gray-300 p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleAdd}
          disabled={eventId === "" || addRSVP.isPending}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          {addRSVP.isPending ? "Saving..." : "Add"}
        </button>
      </div>

      {addRSVP.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addRSVP.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((r) => (
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
