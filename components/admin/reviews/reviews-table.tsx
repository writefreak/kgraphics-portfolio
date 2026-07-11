// components/admin/ReviewsTable.tsx — desktop only
"use client";

import { Star, Check, X, Trash2, BookmarkX, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Review } from "@/lib/types";

const statusStyles: Record<Review["status"], string> = {
  approved: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
};

interface ReviewsTableProps {
  reviews: Review[];
  onSelect: (review: Review) => void;
  onUpdateStatus: (id: string, status: Review["status"]) => void;
  onToggleFeatured: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ReviewsTable({
  reviews,
  onSelect,
  onUpdateStatus,
  onToggleFeatured,
  onRemove,
}: ReviewsTableProps) {
  return (
    <Card className="hidden divide-y divide-line p-2 md:block">
      {reviews.map((review) => (
        <div
          key={review.id}
          onClick={() => onSelect(review)}
          className="grid cursor-pointer grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_72px_100px_144px] items-center gap-4 rounded-xl p-3 transition-colors hover:bg-mist/60"
        >
          {/* Column 1: identity — fixed proportion, truncates internally */}
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-mist text-sm text-ink">
                {review.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-ink">
                  {review.name}
                </span>
                {review.featured && (
                  <Bookmark size={12} className="shrink-0 fill-ink text-ink" />
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-ink/50">
                {review.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Column 2: comment preview — the thing you actually preview by */}
          <p className="min-w-0 truncate text-sm text-ink/60">
            "{review.comment}"
          </p>

          {/* Column 3: rating — fixed width, never shifts */}
          <div className="flex items-center gap-1 text-sm font-medium text-ink">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {review.rating.toFixed(1)}
          </div>

          {/* Column 4: status — fixed width */}
          <Badge className={`w-fit ${statusStyles[review.status]}`}>
            {review.status}
          </Badge>

          {/* Column 5: actions — fixed width, right-aligned within its column */}
          <div
            className="flex items-center justify-end gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {review.status !== "approved" && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-emerald-50"
                onClick={() => onUpdateStatus(review.id, "approved")}
                aria-label="Approve"
              >
                <Check size={16} className="text-emerald-600" />
              </Button>
            )}
            {review.status !== "rejected" && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-red-50"
                onClick={() => onUpdateStatus(review.id, "rejected")}
                aria-label="Reject"
              >
                <X size={16} className="text-red-600" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => onToggleFeatured(review.id)}
              aria-label={review.featured ? "Unfeature" : "Feature"}
            >
              {review.featured ? (
                <BookmarkX size={16} className="text-ink/50" />
              ) : (
                <Bookmark size={16} className="text-ink/50" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => onRemove(review.id)}
              aria-label="Delete"
            >
              <Trash2 size={16} className="text-ink/40" />
            </Button>
          </div>
        </div>
      ))}

      {reviews.length === 0 && (
        <p className="py-10 text-center text-sm text-ink/40">
          No reviews to show.
        </p>
      )}
    </Card>
  );
}
