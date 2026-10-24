import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { askAi } from "../api/client";
import type { AiReview as AiReviewResult } from "../types/index";
import {
  reviewFormSchema,
  type ReviewFormValues,
} from "../schemas/reviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Record: one entry for every value readiness can have. Add a fourth
// value to AiReview and this object stops compiling until it has one.
const BADGE: Record<AiReviewResult["readiness"], { label: string; className: string }> = {
  ready: {
    label: "Ready",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  almost: {
    label: "Almost there",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  "not-yet": {
    label: "Not yet",
    className:
      "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
  },
};

function AiReview() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    // No mode: "onBlur" -- the default checks on submit, then on every
    // keystroke, so the button doesn't jump under the cursor mid-click.
    defaultValues: { prompt: "" },
  });

  // A mutation, not a query: it runs only when the button is pressed.
  // Every press is a new request and a new spend from the Gemini quota.
  const review = useMutation({
    mutationFn: (values: ReviewFormValues) => askAi(values.prompt),
  });

  const onSubmit = (values: ReviewFormValues): void => {
    review.mutate(values);
  };

  return (
    <div className="max-w-2xl">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Assistant</p>
        <h2 className="text-2xl font-bold text-foreground">AI Review</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe your event or RSVP and get feedback before you publish it.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="prompt" className="text-foreground">
              Describe your event or RSVP
            </Label>
            <textarea
              id="prompt"
              rows={6}
              {...register("prompt")}
              aria-invalid={errors.prompt ? true : undefined}
              placeholder="What the event is, who it's for, when and where it runs..."
              className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
            />
            {errors.prompt && (
              <p role="alert" className="text-xs text-destructive">
                {errors.prompt.message}
              </p>
            )}
          </div>

          <Button
            id="ai-review-submit"
            type="submit"
            disabled={review.isPending}
            className="justify-self-start"
          >
            {review.isPending ? "Reviewing..." : "Review my event"}
          </Button>
        </form>

        {/* The API's own sentence (rate limit, quota, 502) -- never Google's raw error. */}
        {review.isError && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
          >
            {review.error.message}
          </p>
        )}
      </div>

      {/* The review: rendered as plain text only, never as HTML. */}
      {review.data && (
        <section
          aria-live="polite"
          className="mt-6 grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <span
            data-readiness={review.data.readiness}
            className={`justify-self-start rounded-full px-3 py-1 text-xs font-semibold ${
              BADGE[review.data.readiness]?.className ?? "bg-muted text-foreground"
            }`}
          >
            {BADGE[review.data.readiness]?.label ?? review.data.readiness}
          </span>

          <p className="text-foreground">{review.data.summary}</p>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">Highlights</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {review.data.highlights.map((h, i) => (
                <li key={`${i}-${h}`}>{h}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">Suggestions</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {review.data.suggestions.map((s, i) => (
                <li key={`${i}-${s}`}>{s}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default AiReview;
