// app/(admin)/userReviews/page.tsx
import { prisma } from "@/lib/prisma";
import { ReviewsView } from "@/components/admin/reviews/reviews-view";
import type { Review } from "@/lib/types";

// Server Component — fetches directly from Supabase via Prisma.
export default async function UserReviewsPage() {
  const rows = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const reviews: Review[] = rows.map((row) => ({
    id: row.id,
    name: row.clientName,
    rating: Number(row.rating),
    comment: row.comment,
    status: row.status as Review["status"],
    featured: row.featured,
    designId: row.designId,
    createdAt: row.createdAt,
  }));

  return (
    <div className="space-y-6 md:pt-10 pt-5">
      <div>
        <h1 className="font-display md:text-xl  font-bold text-ink">
          User Reviews
        </h1>
        <p className="mt-1 text-xs md:text-sm text-ink/60">
          Manage and moderate client feedback.
        </p>
      </div>

      <ReviewsView initialReviews={reviews} />
    </div>
  );
}
