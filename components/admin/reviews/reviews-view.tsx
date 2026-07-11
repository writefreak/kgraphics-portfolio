// components/admin/ReviewsView.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ReviewsTable } from "./reviews-table";
import { ReviewCards } from "./review-cards";
import { ReviewDetailDialog } from "./reviews-detail-dialog";
import { Review } from "@/lib/types";
import {
  updateReviewStatus,
  toggleReviewFeatured,
  deleteReview,
} from "@/app/(admin)/user-reviews/actions";

const PAGE_SIZE = 10;

export function ReviewsView({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const paginatedReviews = useMemo(
    () => reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [reviews, page],
  );

  const updateStatus = async (id: string, status: Review["status"]) => {
    const prevReviews = reviews;
    const prevSelected = selectedReview;

    setError(null);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelectedReview((prev) => (prev?.id === id ? { ...prev, status } : prev));

    const result = await updateReviewStatus(id, status);
    if (!result.success) {
      setReviews(prevReviews);
      setSelectedReview(prevSelected);
      setError(result.error ?? "Could not update review status.");
    }
  };

  const toggleFeatured = async (id: string) => {
    const target = reviews.find((r) => r.id === id);
    if (!target) return;
    const nextFeatured = !target.featured;

    const prevReviews = reviews;
    const prevSelected = selectedReview;

    setError(null);
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, featured: nextFeatured } : r)),
    );
    setSelectedReview((prev) =>
      prev?.id === id ? { ...prev, featured: nextFeatured } : prev,
    );

    const result = await toggleReviewFeatured(id, nextFeatured);
    if (!result.success) {
      setReviews(prevReviews);
      setSelectedReview(prevSelected);
      setError(result.error ?? "Could not update featured status.");
    }
  };

  const removeReview = async (id: string) => {
    const prevReviews = reviews;
    const prevSelected = selectedReview;

    setError(null);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setSelectedReview((prev) => (prev?.id === id ? null : prev));
    setPage((p) =>
      Math.min(p, Math.max(1, Math.ceil((reviews.length - 1) / PAGE_SIZE))),
    );

    const result = await deleteReview(id);
    if (!result.success) {
      setReviews(prevReviews);
      setSelectedReview(prevSelected);
      setError(result.error ?? "Could not delete review.");
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {error}
        </div>
      )}

      <ReviewsTable
        reviews={paginatedReviews}
        onSelect={setSelectedReview}
        onUpdateStatus={updateStatus}
        onToggleFeatured={toggleFeatured}
        onRemove={removeReview}
      />
      <ReviewCards
        reviews={paginatedReviews}
        onSelect={setSelectedReview}
        onUpdateStatus={updateStatus}
        onToggleFeatured={toggleFeatured}
        onRemove={removeReview}
      />

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={
                  page === 1
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <ReviewDetailDialog
        review={selectedReview}
        onOpenChange={(open) => {
          if (!open) setSelectedReview(null);
        }}
        onUpdateStatus={updateStatus}
        onToggleFeatured={toggleFeatured}
        onRemove={removeReview}
      />
    </>
  );
}
