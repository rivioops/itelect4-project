// ===== SESSION 12: a NEW file =========================================
// Test 1 of 3: a component render. The test sits beside the file it
// tests and has the same name with .test in front of .tsx.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RSVPBadge from "./RSVPBadge";
import type { ApiRSVP } from "../types/index";

// One RSVP shaped exactly like a row from GET /api/rsvps.
const confirmedRsvp: ApiRSVP = {
  id: "665f1c2ab4e8d3a1f0c9e101",
  eventId: "EVT-001",
  userId: "665f1c2ab4e8d3a1f0c9e001",
  guestName: "Juan dela Cruz",
  guestCount: 2,
  status: "confirmed",
  timestamp: "2026-10-17T02:15:00.000Z",
};

describe("RSVPBadge", () => {
  it("shows event details, guest info, and status", () => {
    render(<RSVPBadge rsvp={confirmedRsvp} />);

    expect(screen.getByText("Event EVT-001")).toBeInTheDocument();
    expect(screen.getByText("Juan dela Cruz")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("confirmed")).toBeInTheDocument();
  });

  it("changes the status text when status is pending", () => {
    const pendingRsvp: ApiRSVP = { ...confirmedRsvp, status: "pending" };

    render(<RSVPBadge rsvp={pendingRsvp} />);

    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("renders optional children when provided", () => {
    render(
      <RSVPBadge rsvp={confirmedRsvp}>
        <span>Notes: Dietary restrictions</span>
      </RSVPBadge>,
    );

    expect(screen.getByText("Notes: Dietary restrictions")).toBeInTheDocument();
  });
});
