// app/(admin)/userReviews/page.tsx
import { ReviewsView } from "@/components/admin/reviews/reviews-view";
import { REVIEWS } from "@/lib/mock-data";

// Server Component — fetches data directly. Swap this for a Supabase/DB
// query later (e.g. `await supabase.from("reviews").select("*")`) with
// no other changes needed downstream.
export default async function UserReviewsPage() {
  const reviews = REVIEWS;

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

      <ReviewsView initialReviews={REVIEWS} />
    </div>
  );
}
