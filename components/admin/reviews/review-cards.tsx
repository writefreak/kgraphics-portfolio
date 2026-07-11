// components/admin/ReviewCards.tsx — mobile only
"use client";

import { Check, X, Trash2, Bookmark, BookmarkX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmActionButton } from "@/components/ui/confirm-action";
import { Review } from "@/lib/types";

const statusStyles: Record<Review["status"], string> = {
  approved: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
};

const statusDot: Record<Review["status"], string> = {
  approved: "bg-emerald-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
};

interface ReviewCardsProps {
  reviews: Review[];
  onSelect: (review: Review) => void;
  onUpdateStatus: (id: string, status: Review["status"]) => void;
  onToggleFeatured: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ReviewCards({
  reviews,
  onSelect,
  onUpdateStatus,
  onToggleFeatured,
  onRemove,
}: ReviewCardsProps) {
  return (
    <div className="space-y-3 md:hidden">
      {reviews.map((review) => (
        <Card
          key={review.id}
          onClick={() => onSelect(review)}
          className="cursor-pointer rounded-3xl border-none p-4 shadow-md shadow-ink/5"
        >
          {/* Row 1: identity + status, one line */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-ink text-sm font-semibold text-paper">
                  {review.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-sm font-semibold text-ink">
                {review.name}
              </span>
            </div>
            <Badge
              className={`shrink-0 gap-1.5 rounded-full px-2.5 py-1 ${statusStyles[review.status]}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusDot[review.status]}`}
              />
              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
            </Badge>
          </div>

          {/* Row 2: comment, the only other content */}
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/60">
            {review.comment}
          </p>

          {/* Row 3: date + actions, no divider, no extra padding zone */}
          {/* Row 3: date + actions, no divider, no extra padding zone */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-ink/40">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <div
              className="flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {review.status !== "approved" && (
                <ConfirmActionButton
                  onConfirm={() => onUpdateStatus(review.id, "approved")}
                  title="Approve this review?"
                  description={`This will mark ${review.name}'s review as approved and visible where reviews are shown.`}
                  confirmLabel="Approve"
                  icon={<Check size={14} className="text-emerald-600" />}
                  ariaLabel="Approve"
                  className="h-8 w-8 rounded-lg bg-mist hover:bg-emerald-50"
                />
              )}
              {review.status !== "rejected" && (
                <ConfirmActionButton
                  onConfirm={() => onUpdateStatus(review.id, "rejected")}
                  title="Reject this review?"
                  description={`This will mark ${review.name}'s review as rejected and hide it from public view.`}
                  confirmLabel="Reject"
                  icon={<X size={14} className="text-ink/50" />}
                  ariaLabel="Reject"
                  className="h-8 w-8 rounded-lg bg-mist hover:bg-red-50"
                />
              )}
              <ConfirmActionButton
                onConfirm={() => onToggleFeatured(review.id)}
                title={
                  review.featured
                    ? "Unfeature this review?"
                    : "Feature this review?"
                }
                description={
                  review.featured
                    ? `This will remove ${review.name}'s review from the featured section.`
                    : `This will highlight ${review.name}'s review in the featured section.`
                }
                confirmLabel={review.featured ? "Unfeature" : "Feature"}
                icon={
                  review.featured ? (
                    <BookmarkX size={14} className="text-ink/50" />
                  ) : (
                    <Bookmark size={14} className="text-ink/50" />
                  )
                }
                ariaLabel={review.featured ? "Unfeature" : "Feature"}
                className="h-8 w-8 rounded-lg bg-mist"
              />
              <ConfirmActionButton
                onConfirm={() => onRemove(review.id)}
                title="Delete this review?"
                description={`This will permanently remove ${review.name}'s review. This can't be undone.`}
                confirmLabel="Delete"
                destructive
                icon={<Trash2 size={14} className="text-red-500" />}
                ariaLabel="Delete"
                className="h-8 w-8 rounded-lg bg-red-50 hover:bg-red-100"
              />
            </div>
          </div>
        </Card>
      ))}

      {reviews.length === 0 && (
        <p className="py-10 text-center text-sm text-ink/40">
          No reviews to show.
        </p>
      )}
    </div>
  );
}
