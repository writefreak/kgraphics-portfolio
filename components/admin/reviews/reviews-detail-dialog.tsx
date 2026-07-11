// components/admin/ReviewDetailDialog.tsx
"use client";

import { Star, Check, X, Trash2, BookmarkX, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Review } from "@/lib/types";

const statusStyles: Record<Review["status"], string> = {
  approved: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
};

interface ReviewDetailDialogProps {
  review: Review | null;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: string, status: Review["status"]) => void;
  onToggleFeatured: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ReviewDetailDialog({
  review,
  onOpenChange,
  onUpdateStatus,
  onToggleFeatured,
  onRemove,
}: ReviewDetailDialogProps) {
  return (
    <Dialog open={review !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {review && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-mist text-sm text-ink">
                    {review.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle>{review.name}</DialogTitle>
                  <DialogDescription>
                    {review.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-ink/20"
                  }
                />
              ))}
            </div>

            <p className="text-sm leading-relaxed text-ink/80">
              {review.comment}
            </p>

            <div className="flex items-center gap-2">
              <Badge className={`${statusStyles[review.status]} w-fit`}>
                {review.status}
              </Badge>
              {review.featured && (
                <Badge className="w-fit bg-ink/10 text-ink hover:bg-ink/10">
                  Featured
                </Badge>
              )}
            </div>

            <div className="mt-2 flex flex-wrap justify-end gap-2">
              {review.status !== "approved" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(review.id, "approved")}
                  className="gap-1"
                >
                  <Check size={14} className="text-emerald-600" />
                  Approve
                </Button>
              )}
              {review.status !== "rejected" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(review.id, "rejected")}
                  className="gap-1"
                >
                  <X size={14} className="text-red-600" />
                  Reject
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleFeatured(review.id)}
                className="gap-1"
              >
                {review.featured ? (
                  <>
                    <BookmarkX size={14} className="text-ink/50" />
                    Unfeature
                  </>
                ) : (
                  <>
                    <Bookmark size={14} className="text-ink/50" />
                    Feature
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemove(review.id)}
                className="gap-1"
              >
                <Trash2 size={14} className="text-ink/50" />
                Delete
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
