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
      userId: 1,
      eventId: values.eventId,
      guestName: values.guestName,
      guestCount: values.guestCount,
      status: "pending",
      timestamp: new Date().toISOString(),
    });
  };

  if (isPending) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-border bg-muted h-24" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        Could not load RSVPs — is json-server running?
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Manage</p>
        <h2 className="text-2xl font-bold text-foreground">My RSVPs</h2>
      </div>

      {/* Add RSVP form card */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm max-w-md">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Register a New RSVP</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="eventId" className="text-foreground">
              Event ID
            </Label>
            <Input
              id="eventId"
              {...register("eventId")}
              aria-invalid={errors.eventId ? true : undefined}
              placeholder="EVT-001"
            />
            {errors.eventId && (
              <p className="text-xs text-destructive">{errors.eventId.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="guestName" className="text-foreground">
              Guest Name
            </Label>
            <Input
              id="guestName"
              {...register("guestName")}
              aria-invalid={errors.guestName ? true : undefined}
              placeholder="Juan dela Cruz"
            />
            {errors.guestName && (
              <p className="text-xs text-destructive">{errors.guestName.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="guestCount" className="text-foreground">
              Guest Count
            </Label>
            <Input
              type="number"
              id="guestCount"
              {...register("guestCount", { valueAsNumber: true })}
              aria-invalid={errors.guestCount ? true : undefined}
              placeholder="1"
            />
            {errors.guestCount && (
              <p className="text-xs text-destructive">{errors.guestCount.message}</p>
            )}
          </div>

          <Button type="submit" disabled={addRSVP.isPending}>
            {addRSVP.isPending ? "Saving..." : "Add RSVP"}
          </Button>
        </form>

        {addRSVP.isError && (
          <p className="mt-2 text-xs text-destructive">{addRSVP.error.message}</p>
        )}
      </div>

      {/* RSVP list */}
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No RSVPs yet. Add one above.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((r) => (
            <RSVPBadge key={r.id} rsvp={r} />
          ))}
        </div>
      )}
    </div>
  );
}
export default RSVPsPage;
