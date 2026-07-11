import { DashboardClient } from "@/components/admin/dashboard/dashboard-page";
import { prisma } from "@/lib/prisma";
import { CategoryCount, Review } from "@/lib/types";
import React from "react";
const CATEGORY_COLORS = [
  "var(--ink)",
  "var(--accent)",
  "#94a3b8",
  "#c4b5a0",
  "#7c9885",
];

export default async function DashboardPage() {
  const [designRows, reviewRows, contactSubmissionsCount] = await Promise.all([
    prisma.design.findMany({
      include: { category: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactSubmission.count(),
  ]);

  const reviews: Review[] = reviewRows.map((r) => ({
    id: r.id,
    name: r.clientName,
    rating: Number(r.rating),
    featured: r.featured,
    comment: r.comment,
    status: r.status as Review["status"],
    designId: r.designId,
    createdAt: r.createdAt,
  }));

  const totalDesigns = designRows.length;
  const featuredCount = designRows.filter((d) => d.isFeatured).length;

  const categoryMap = new Map<string, number>();
  for (const d of designRows) {
    const name = d.category?.name ?? "Uncategorized";
    categoryMap.set(name, (categoryMap.get(name) ?? 0) + 1);
  }
  const categoryCounts: CategoryCount[] = Array.from(categoryMap.entries()).map(
    ([category, count], i) => ({
      category,
      count,
      fill: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }),
  );
  return (
    <div className="space-y-6 md:pt-10 pt-5">
      <div>
        <h1 className="font-display md:text-xl  font-bold text-ink">
          Dashboard
        </h1>
        <p className="mt-1 text-xs md:text-sm text-ink/60">
          What's happening with K-Graphics right now.
        </p>
      </div>

      <DashboardClient
        initialReviews={reviews}
        totalDesigns={totalDesigns}
        featuredCount={featuredCount}
        categoryCounts={categoryCounts}
        contactSubmissionsCount={contactSubmissionsCount}
      />
    </div>
  );
}
