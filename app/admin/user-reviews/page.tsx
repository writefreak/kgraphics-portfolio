// app/(admin)/userReviews/page.tsx
"use client";

import { useState } from "react";
import { Star, Check, X, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { REVIEWS as INITIAL_REVIEWS, type Review } from "@/lib/mock-data";

const statusStyles: Record<Review["status"], string> = {
  approved: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
};

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const updateStatus = (id: string, status: Review["status"]) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const removeReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">
          User Reviews
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Manage and moderate client feedback.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="max-w-xs">Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-mist text-xs text-ink">
                          {review.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-ink">
                        {review.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-ink/20"
                          }
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-ink/70">
                    {review.comment}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusStyles[review.status]}>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-ink/50">
                    {review.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {review.status !== "approved" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateStatus(review.id, "approved")}
                          aria-label="Approve"
                        >
                          <Check size={16} className="text-emerald-600" />
                        </Button>
                      )}
                      {review.status !== "rejected" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateStatus(review.id, "rejected")}
                          aria-label="Reject"
                        >
                          <X size={16} className="text-red-600" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeReview(review.id)}
                        aria-label="Delete"
                      >
                        <Trash2 size={16} className="text-ink/40" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {reviews.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-sm text-ink/40"
                  >
                    No reviews to show.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
