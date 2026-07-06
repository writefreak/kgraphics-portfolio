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
import type { Review } from "@/lib/mock-data";
import { ReviewsTable } from "./reviews-table";
import { ReviewCards } from "./review-cards";
import { ReviewDetailDialog } from "./reviews-detail-dialog";

const PAGE_SIZE = 10;

export function ReviewsView({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const paginatedReviews = useMemo(
    () => reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [reviews, page],
  );

  const updateStatus = (id: string, status: Review["status"]) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelectedReview((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const toggleFeatured = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r)),
    );
    setSelectedReview((prev) =>
      prev?.id === id ? { ...prev, featured: !prev.featured } : prev,
    );
  };

  const removeReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setSelectedReview((prev) => (prev?.id === id ? null : prev));
    // If deleting the last item on a page pushes page count down, step back
    setPage((p) =>
      Math.min(p, Math.max(1, Math.ceil((reviews.length - 1) / PAGE_SIZE))),
    );
  };

  return (
    <>
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
