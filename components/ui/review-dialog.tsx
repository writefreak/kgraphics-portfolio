"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";

type ReviewFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    role: string;
    quote: string;
    rating: number;
  }) => void;
};

export default function ReviewFormDialog({
  open,
  onClose,
  onSubmit,
}: ReviewFormDialogProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleClose() {
    onClose();
    // Reset after the exit animation has time to play
    setTimeout(() => {
      setName("");
      setRole("");
      setQuote("");
      setRating(5);
      setSubmitting(false);
      setSubmitted(false);
    }, 250);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !quote) return;
    setSubmitting(true);
    await onSubmit?.({ name, role, quote, rating });
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="review-form-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              key="review-form-dialog"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg rounded-2xl border border-paper/15 bg-ink/90 p-8 shadow-lg shadow-black/20 backdrop-blur-xl"
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-2xl text-paper/60 transition-colors duration-200 hover:bg-paper/10 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="py-6 text-center">
                  <p className="font-display text-lg font-semibold text-paper">
                    Thanks for the review!
                  </p>
                  <p className="mt-2 text-sm text-paper/70">
                    We appreciate you taking the time to share your experience.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-paper/15 bg-paper/10 px-5 py-2.5 text-sm font-medium text-paper backdrop-blur-md transition-colors duration-200 hover:border-paper/30 hover:bg-paper/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <p className="font-display text-lg font-semibold text-paper">
                      Share your unique experience.
                    </p>
                    <p className="mt-1 text-sm text-paper/60">
                      Tell us what you love about our services.
                    </p>
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const starValue = idx + 1;
                      const filled = starValue <= (hoverRating || rating);
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                          className="p-0.5"
                        >
                          <Star
                            className={`h-5 w-5 transition-colors ${
                              filled ? "text-yellow-400" : "text-paper/25"
                            }`}
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-paper/15 bg-paper/10 px-4 py-3 text-sm text-paper placeholder:text-paper/40 backdrop-blur-md transition-colors focus:border-paper/30 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Role or company (optional)"
                      className="w-full rounded-xl border border-paper/15 bg-paper/10 px-4 py-3 text-sm text-paper placeholder:text-paper/40 backdrop-blur-md transition-colors focus:border-paper/30 focus:outline-none"
                    />
                    <textarea
                      required
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="Your review"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-paper/15 bg-paper/10 px-4 py-3 text-sm text-paper placeholder:text-paper/40 backdrop-blur-md transition-colors focus:border-paper/30 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
