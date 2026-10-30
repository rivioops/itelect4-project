// ===== SESSION 12: a NEW file =========================================
// Test 3 of 3: form validation. The test types into the real form and
// presses the real button, the way a user would.
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AiReview from "./AiReview";

function renderAiReview() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AiReview />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AiReview", () => {
  it("shows schema validation message when submitted empty", async () => {
    const user = userEvent.setup();
    renderAiReview();

    await user.click(screen.getByRole("button", { name: "Review my event" }));

    expect(
      await screen.findByText(
        "Describe your event or RSVP in at least 20 characters.",
      ),
    ).toBeInTheDocument();
  });

  it("sends nothing to the API while the form is invalid", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderAiReview();

    await user.type(
      screen.getByLabelText("Describe your event or RSVP"),
      "Too short",
    );
    await user.click(screen.getByRole("button", { name: "Review my event" }));

    expect(
      await screen.findByText(
        "Describe your event or RSVP in at least 20 characters.",
      ),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
