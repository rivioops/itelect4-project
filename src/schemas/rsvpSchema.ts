import { z } from "zod";

export const rsvpSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required.")
    .refine(
      (id) => id.startsWith("EVT-"),
      "Event ID must start with 'EVT-' (e.g., EVT-001)"
    ),
  guestName: z
    .string()
    .min(2, "Name must be at least 2 characters long."),
  guestCount: z
    .number()
    .min(1, "You must register at least 1 guest.")
    .max(10, "You can register a maximum of 10 guests."),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
