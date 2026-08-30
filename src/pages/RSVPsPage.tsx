import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RSVPBadge from "../components/RSVPBadge";
import { fetchRSVPs, createRSVP } from "../api/client";
import { rsvpSchema } from "../schemas/rsvpSchema";
import type { RsvpFormValues } from "../schemas/rsvpSchema";
import type { ApiRSVP } from "../types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RSVPsPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    mode: "onBlur",
    defaultValues: { eventId: "", guestName: "", guestCount: 1 },
  });

  const { data, isPending, isError } = useQuery<ApiRSVP[]>({
    queryKey: ["rsvps"],
    queryFn: fetchRSVPs,
  });

  const addRSVP = useMutation({
    mutationFn: createRSVP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
      reset();
    },
  });

  const onSubmit = (values: RsvpFormValues): void => {
    addRSVP.mutate({
      userId: 1, // hardcoded user for now
      eventId: values.eventId,
      guestName: values.guestName,
      guestCount: values.guestCount,
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
      
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 grid gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div className="grid gap-1.5">
          <Label htmlFor="eventId" className="text-foreground">Event ID</Label>
          <Input id="eventId" {...register("eventId")}
            aria-invalid={errors.eventId ? true : undefined}
            placeholder="EVT-001" />
          {errors.eventId && (
            <p className="text-sm text-red-600">{errors.eventId.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="guestName" className="text-foreground">Guest Name</Label>
          <Input id="guestName" {...register("guestName")}
            aria-invalid={errors.guestName ? true : undefined}
            placeholder="Juan dela Cruz" />
          {errors.guestName && (
            <p className="text-sm text-red-600">{errors.guestName.message}</p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="guestCount" className="text-foreground">Guest Count</Label>
          <Input type="number" id="guestCount" {...register("guestCount", { valueAsNumber: true })}
            aria-invalid={errors.guestCount ? true : undefined}
            placeholder="1" />
          {errors.guestCount && (
            <p className="text-sm text-red-600">{errors.guestCount.message}</p>
          )}
        </div>

        <Button type="submit" disabled={addRSVP.isPending} className="justify-self-start">
          {addRSVP.isPending ? "Saving..." : "Add RSVP"}
        </Button>
      </form>

      {addRSVP.isError && (
        <p className="mb-4 text-sm text-red-700">
          {addRSVP.error.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((r) => (
          <RSVPBadge key={r.id} rsvp={r}>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Registered for Event: {r.eventId} <br />
              Guests: {r.guestName} ({r.guestCount})
            </p>
          </RSVPBadge>
        ))}
      </div>
    </div>
  );
}
export default RSVPsPage;
